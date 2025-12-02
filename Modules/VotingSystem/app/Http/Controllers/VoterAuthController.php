<?php

namespace Modules\VotingSystem\Http\Controllers;

use App\Http\Controllers\Controller;
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
    public function showLogin(): Response
    {
        // Get active elections
        $activeElections = Election::where('status', true)
            ->where(function ($query) {
                $query->whereNull('end_time')
                    ->orWhere('end_time', '>', now());
            })
            ->get(['id', 'name', 'election_code']);

        return Inertia::render('voting/login', [
            'elections' => $activeElections,
        ]);
    }

    /**
     * Handle voter login attempt.
     */
    public function login(VoterLoginRequest $request): RedirectResponse
    {
        // Find the voter
        $voter = Voter::where('election_id', $request->election_id)
            ->where('school_id', $request->school_id)
            ->first();

        // Check if voter exists and password matches
        if (! $voter || ! Hash::check($request->password, $voter->password)) {
            return back()->withErrors([
                'school_id' => 'Invalid school ID or password.',
            ])->onlyInput('school_id', 'election_id');
        }

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

        // Log the voter in using the 'voter' guard
        Auth::guard('voter')->login($voter, $request->boolean('remember'));

        $request->session()->regenerate();

        // Log the login activity
        VoterActivityLog::log(
            voterId: $voter->id,
            electionId: $voter->election_id,
            action: 'login'
        );

        return redirect()->route('voting.ballot');
    }

    /**
     * Handle voter logout.
     */
    public function logout(Request $request): RedirectResponse
    {
        $voter = Auth::guard('voter')->user();

        // Log the logout activity before logging out
        if ($voter) {
            VoterActivityLog::log(
                voterId: $voter->id,
                electionId: $voter->election_id,
                action: 'logout'
            );
        }

        Auth::guard('voter')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('voting.login');
    }
}
