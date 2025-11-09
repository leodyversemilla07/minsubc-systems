<?php

namespace Modules\VotingSystem\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Models\VoterFeedback;

class FeedbackController extends Controller
{
    /**
     * Show the feedback form.
     */
    public function create(): Response
    {
        $voter = Auth::guard('voter')->user();

        // Check if voter has already submitted feedback
        $existingFeedback = VoterFeedback::where('voter_id', $voter->id)
            ->where('election_id', $voter->election_id)
            ->first();

        return Inertia::render('voting/feedback', [
            'election' => $voter->election,
            'hasSubmittedFeedback' => (bool) $existingFeedback,
        ]);
    }

    /**
     * Store voter feedback.
     */
    public function store(Request $request): RedirectResponse
    {
        $voter = Auth::guard('voter')->user();

        // Check if voter has already submitted feedback
        $existingFeedback = VoterFeedback::where('voter_id', $voter->id)
            ->where('election_id', $voter->election_id)
            ->first();

        if ($existingFeedback) {
            return redirect()->route('voting.feedback.create')
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
            'election_id' => $voter->election_id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
            'experience' => $validated['experience'] ?? null,
            'would_recommend' => $validated['would_recommend'] ?? null,
            'improvements' => $validated['improvements'] ?? null,
        ]);

        return redirect()->route('voting.feedback.create')
            ->with('success', 'Thank you for your feedback!');
    }
}
