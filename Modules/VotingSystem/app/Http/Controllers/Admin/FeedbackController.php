<?php

namespace Modules\VotingSystem\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\VoterFeedback;

class FeedbackController extends Controller
{
    /**
     * Display a listing of voter feedback.
     */
    public function index(Request $request): Response
    {
        $query = VoterFeedback::with(['voter', 'election'])
            ->latest();

        // Filter by election
        if ($request->filled('election_id')) {
            $query->forElection($request->election_id);
        }

        // Filter by rating
        if ($request->filled('rating')) {
            $query->withRating($request->rating);
        }

        // Filter by experience
        if ($request->filled('experience')) {
            $query->withExperience($request->experience);
        }

        $feedback = $query->paginate(25)->withQueryString();

        $elections = Election::select('id', 'name')->get();

        // Get statistics for selected election or overall
        $selectedElectionId = $request->input('election_id');
        $statistics = $selectedElectionId
            ? VoterFeedback::statisticsForElection($selectedElectionId)
            : [
                'total' => VoterFeedback::count(),
                'average_rating' => round(VoterFeedback::avg('rating') ?? 0, 2),
            ];

        return Inertia::render('voting/admin/feedback/index', [
            'feedback' => $feedback,
            'elections' => $elections,
            'statistics' => $statistics,
            'filters' => $request->only(['election_id', 'rating', 'experience']),
        ]);
    }

    /**
     * Display the specified feedback.
     */
    public function show(VoterFeedback $feedback): Response
    {
        $feedback->load(['voter', 'election']);

        return Inertia::render('voting/admin/feedback/show', [
            'feedback' => $feedback,
        ]);
    }
}
