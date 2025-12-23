<?php

namespace Modules\VotingSystem\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Http\Requests\VoterLoginRequest;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Voter;
use Modules\VotingSystem\Models\VoterActivityLog;

class VoterAuthController extends Controller
{
    /**
     * Show the voter login form.
     */
    public function showLogin(): Response|RedirectResponse
    {
        // Check if user is already authenticated with main system
        if (Auth::check()) {
            $user = Auth::user();

            // Check if user is a student
            if ($user->student) {
                // Get active elections
                $activeElections = Election::where('status', true)
                    ->where(function ($query) {
                        $query->whereNull('end_time')
                            ->orWhere('end_time', '>', now());
                    })
                    ->get();

                // If there's only one active election, auto-select it
                if ($activeElections->count() === 1) {
                    $election = $activeElections->first();

                    // Check if voter record exists for this student and election
                    $voter = Voter::where('election_id', $election->id)
                        ->where('school_id', $user->student->student_id)
                        ->first();

                    if ($voter && ! $voter->hasVoted()) {
                        // Auto-authenticate voter and redirect to ballot
                        return $this->authenticateIntegratedUser($user, $election, $voter);
                    }
                }

                // Multiple elections or other conditions - show selection
                return Inertia::render('voting/login', [
                    'elections' => $activeElections,
                    'authenticatedUser' => [
                        'name' => $user->first_name.' '.$user->last_name,
                        'student_id' => $user->student->student_id,
                        'email' => $user->email,
                    ],
                ]);
            }
        }

        // Not authenticated or not a student - show regular login
        $activeElections = Election::where('status', true)
            ->where(function ($query) {
                $query->whereNull('end_time')
                    ->orWhere('end_time', '>', now());
            })
            ->get(['id', 'name', 'election_code']);

        return Inertia::render('voting/login', [
            'elections' => $activeElections,
            'authenticatedUser' => null,
        ]);
    }

    /**
     * Handle voter login attempt.
     */
    public function login(VoterLoginRequest $request): RedirectResponse
    {
        // Check if user is already authenticated with main system
        if (Auth::check()) {
            return $this->handleIntegratedLogin($request);
        }

        // Regular voter login flow
        return $this->handleStandaloneLogin($request);
    }

    /**
     * Handle login for users already authenticated with main system.
     */
    protected function handleIntegratedLogin(VoterLoginRequest $request): RedirectResponse
    {
        $user = Auth::user();

        // Verify the user is a student
        if (! $user->student) {
            return back()->withErrors([
                'school_id' => 'Only students can participate in voting.',
            ]);
        }

        // Verify password matches the user's main account password
        if (! Hash::check($request->password, $user->password)) {
            return back()->withErrors([
                'password' => 'Invalid password.',
            ])->onlyInput('election_id');
        }

        // Find voter record
        $voter = Voter::where('election_id', $request->election_id)
            ->where('school_id', $user->student->student_id)
            ->first();

        if (! $voter) {
            return back()->withErrors([
                'election_id' => 'You are not registered for this election. Please contact the election administrator.',
            ]);
        }

        // Link voter to user if not already linked
        if (! $voter->user_id) {
            $voter->update(['user_id' => $user->id]);
        }

        // Check if voter has already voted
        if ($voter->hasVoted()) {
            return back()->withErrors([
                'school_id' => 'You have already cast your vote in this election.',
            ])->onlyInput('election_id');
        }

        // Check if election is still active
        $election = $voter->election;
        if (! $election->isActive() || $election->hasEnded()) {
            return back()->withErrors([
                'election_id' => 'This election is no longer active.',
            ])->onlyInput('election_id');
        }

        // Store voter ID in session (user is already authenticated)
        $request->session()->put('voting.voter_id', $voter->id);
        $request->session()->put('voting.election_id', $election->id);
        $request->session()->regenerate();

        // Log the login activity
        VoterActivityLog::log(
            voterId: $voter->id,
            electionId: $voter->election_id,
            action: 'login',
            metadata: ['integrated_auth' => true, 'user_id' => $user->id]
        );

        return redirect()->route('voting.ballot');
    }

    /**
     * Handle standalone voter login (without main system authentication).
     * Note: With the new architecture, voters must have a linked user account.
     */
    protected function handleStandaloneLogin(VoterLoginRequest $request): RedirectResponse
    {
        // Find the voter by school_id and election
        $voter = Voter::where('election_id', $request->election_id)
            ->where('school_id', $request->school_id)
            ->with('user')
            ->first();

        if (! $voter) {
            return back()->withErrors([
                'school_id' => 'Voter not found for this election.',
            ])->onlyInput('school_id', 'election_id');
        }

        // Voter must have a linked user account
        if (! $voter->user_id || ! $voter->user) {
            return back()->withErrors([
                'school_id' => 'Your voter account is not linked to a user account. Please contact the administrator.',
            ])->onlyInput('school_id', 'election_id');
        }

        $user = $voter->user;

        // Verify password matches the user's account password
        if (! Hash::check($request->password, $user->password)) {
            return back()->withErrors([
                'password' => 'Invalid password.',
            ])->onlyInput('school_id', 'election_id');
        }

        // Authenticate the user
        Auth::login($user, $request->boolean('remember'));

        // Check if voter has already voted
        if ($voter->hasVoted()) {
            return back()->withErrors([
                'school_id' => 'You have already cast your vote in this election.',
            ])->onlyInput('school_id', 'election_id');
        }

        // Check if election is still active
        $election = $voter->election;
        if (! $election->isActive() || $election->hasEnded()) {
            return back()->withErrors([
                'election_id' => 'This election is no longer active.',
            ])->onlyInput('school_id', 'election_id');
        }

        // Store voter ID in session
        $request->session()->put('voting.voter_id', $voter->id);
        $request->session()->put('voting.election_id', $election->id);
        $request->session()->regenerate();

        // Log the login activity
        VoterActivityLog::log(
            voterId: $voter->id,
            electionId: $voter->election_id,
            action: 'login',
            metadata: ['integrated_auth' => false, 'user_id' => $user->id]
        );

        return redirect()->route('voting.ballot');
    }

    /**
     * Auto-authenticate integrated user and redirect to ballot.
     */
    protected function authenticateIntegratedUser(User $user, Election $election, Voter $voter): RedirectResponse
    {
        // Check if election is still active
        if (! $election->isActive() || $election->hasEnded()) {
            return redirect()->route('voting.login')->withErrors([
                'election_id' => 'This election is no longer active.',
            ]);
        }

        // Link voter to user if not already linked
        if (! $voter->user_id) {
            $voter->update(['user_id' => $user->id]);
        }

        // Store voter ID in session (user is already authenticated)
        session()->put('voting.voter_id', $voter->id);
        session()->put('voting.election_id', $election->id);
        session()->regenerate();

        // Log the login activity
        VoterActivityLog::log(
            voterId: $voter->id,
            electionId: $voter->election_id,
            action: 'login',
            metadata: ['integrated_auth' => true, 'user_id' => $user->id, 'auto_authenticated' => true]
        );

        return redirect()->route('voting.ballot')->with('success', 'Welcome! You can now cast your vote.');
    }

    /**
     * Handle voter logout.
     */
    public function logout(Request $request): RedirectResponse
    {
        $voterId = $request->session()->get('voting.voter_id');

        if ($voterId) {
            $voter = Voter::find($voterId);

            // Log the logout activity before logging out
            if ($voter) {
                VoterActivityLog::log(
                    voterId: $voter->id,
                    electionId: $voter->election_id,
                    action: 'logout'
                );
            }
        }

        // Clear voting session
        $request->session()->forget(['voting.voter_id', 'voting.election_id']);

        // If main system user is still authenticated, redirect to voting index
        // Otherwise redirect to login
        if (Auth::check()) {
            return redirect()->route('voting.index')->with('success', 'You have been logged out of voting.');
        }

        return redirect()->route('voting.login');
    }
}
