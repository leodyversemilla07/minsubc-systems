<?php

namespace Modules\VotingSystem\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Voter;
use Modules\VotingSystem\Models\VoterFeedback;

class FeedbackController extends Controller
{
    /**
     * Show the feedback form.
     */
    public function create(Request $request): Response
    {
        $token = $request->query('token');
        $voter = null;
        $election = null;

        // Check for token-based access (after voting)
        if ($token) {
            $tokenData = Cache::get($token);

            if ($tokenData) {
                $voter = Voter::find($tokenData['voter_id']);
                $election = Election::find($tokenData['election_id']);
            }
        }

        // Fallback to authenticated voter
        if (! $voter && Auth::guard('voter')->check()) {
            $voter = Auth::guard('voter')->user();
            $election = $voter->election;
        }

        // If no voter found, redirect to home
        if (! $voter || ! $election) {
            return redirect()->route('voting.index')
                ->with('error', 'Feedback session expired. Please log in again to provide feedback.');
        }

        // Check if voter has already submitted feedback
        $existingFeedback = VoterFeedback::where('voter_id', $voter->id)
            ->where('election_id', $election->id)
            ->first();

        return Inertia::render('voting/feedback', [
            'election' => $election,
            'hasSubmittedFeedback' => (bool) $existingFeedback,
            'feedbackToken' => $token,
        ]);
    }

    /**
     * Store voter feedback.
     */
    public function store(Request $request): RedirectResponse
    {
        $token = $request->input('token');
        $voter = null;
        $electionId = null;

        // Check for token-based access (after voting)
        if ($token) {
            $tokenData = Cache::get($token);

            if ($tokenData) {
                $voter = Voter::find($tokenData['voter_id']);
                $electionId = $tokenData['election_id'];

                // Delete token after use
                Cache::forget($token);
            }
        }

        // Fallback to authenticated voter
        if (! $voter && Auth::guard('voter')->check()) {
            $voter = Auth::guard('voter')->user();
            $electionId = $voter->election_id;
        }

        // If no voter found, redirect to home
        if (! $voter || ! $electionId) {
            return redirect()->route('voting.index')
                ->with('error', 'Feedback session expired. Please log in again to provide feedback.');
        }

        // Check if voter has already submitted feedback
        $existingFeedback = VoterFeedback::where('voter_id', $voter->id)
            ->where('election_id', $electionId)
            ->first();

        if ($existingFeedback) {
            return redirect()->route('voting.feedback.create', $token ? ['token' => $token] : [])
                ->with('error', 'You have already submitted feedback for this election.');
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'experience' => 'nullable|in:excellent,good,average,poor',
            'would_recommend' => 'nullable|boolean',
            'improvements' => 'nullable|array',
            'improvements.*' => 'string',
        ]);

        VoterFeedback::create([
            'voter_id' => $voter->id,
            'election_id' => $electionId,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
            'experience' => $validated['experience'] ?? null,
            'would_recommend' => $validated['would_recommend'] ?? null,
            'improvements' => $validated['improvements'] ?? null,
        ]);

        return redirect()->route('voting.index')
            ->with('success', 'Thank you for your feedback!');
    }
}
