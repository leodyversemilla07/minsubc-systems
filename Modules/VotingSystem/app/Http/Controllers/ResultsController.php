<?php

namespace Modules\VotingSystem\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Position;
use Modules\VotingSystem\Models\VoterActivityLog;

class ResultsController extends Controller
{
    /**
     * Display election results.
     */
    public function index(Request $request): Response
    {
        // Get all elections for selection
        $elections = Election::orderBy('created_at', 'desc')
            ->get(['id', 'name', 'election_code', 'status', 'end_time']);

        // Get selected election or the most recent one
        $selectedElectionId = $request->input('election_id', $elections->first()?->id);

        $election = Election::with([
            'positions' => function ($query) {
                $query->orderBy('priority');
            },
            'positions.candidates.partylist',
            'voters',
        ])->find($selectedElectionId);

        if (! $election) {
            return Inertia::render('voting/results', [
                'elections' => $elections,
                'election' => null,
                'results' => [],
                'statistics' => null,
            ]);
        }

        // Calculate results for each position
        $results = $election->positions->map(function ($position) {
            $candidates = $position->candidates->map(function ($candidate) {
                $voteCount = $candidate->voteCount();

                return [
                    'id' => $candidate->id,
                    'fullname' => $candidate->fullname,
                    'photo' => $candidate->photo,
                    'platform' => $candidate->platform,
                    'partylist' => $candidate->partylist?->name,
                    'votes' => $voteCount,
                ];
            })->sortByDesc('votes')->values();

            // Calculate total votes for this position
            $totalVotesForPosition = $candidates->sum('votes');

            return [
                'position_id' => $position->position_id,
                'description' => $position->description,
                'max_vote' => $position->max_vote,
                'total_votes' => $totalVotesForPosition,
                'candidates' => $candidates,
            ];
        });

        // Calculate statistics
        $totalVoters = $election->voters()->count();
        $votedCount = $election->voters()->where('has_voted', true)->count();
        $totalVotes = $election->votes()->count();

        // Log results viewing if user is a voter
        $user = Auth::user();
        if ($user) {
            $voter = \Modules\VotingSystem\Models\Voter::where('user_id', $user->id)
                ->where('election_id', $election->id)
                ->first();

            if ($voter) {
                VoterActivityLog::log(
                    voterId: $voter->id,
                    electionId: $election->id,
                    action: 'results_viewed'
                );
            }
        }

        return Inertia::render('voting/results', [
            'elections' => $elections,
            'election' => $election,
            'results' => $results,
            'statistics' => [
                'total_voters' => $totalVoters,
                'voted_count' => $votedCount,
                'not_voted_count' => $totalVoters - $votedCount,
                'total_votes' => $totalVotes,
                'turnout_percentage' => $totalVoters > 0 ? round(($votedCount / $totalVoters) * 100, 2) : 0,
            ],
        ]);
    }
}
