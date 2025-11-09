<?php

namespace Modules\VotingSystem\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Models\Position;
use Modules\VotingSystem\Models\Vote;
use Modules\VotingSystem\Models\VoterActivityLog;

class BallotController extends Controller
{
    /**
     * Display the ballot for the authenticated voter.
     */
    public function show(): Response
    {
        $voter = Auth::guard('voter')->user();
        $election = $voter->election;

        // Log ballot access
        VoterActivityLog::log(
            voterId: $voter->id,
            electionId: $election->id,
            action: 'ballot_accessed'
        );

        // Get all positions with their candidates
        $positions = Position::where('election_id', $election->id)
            ->with(['candidates.partylist'])
            ->orderBy('priority')
            ->get();

        return Inertia::render('voting/ballot', [
            'election' => $election,
            'voter' => $voter,
            'positions' => $positions,
        ]);
    }

    /**
     * Show ballot preview before final submission.
     */
    public function preview(Request $request): Response
    {
        $voter = Auth::guard('voter')->user();
        $election = $voter->election;

        // Validate the votes
        $positions = Position::where('election_id', $election->id)->get();

        $rules = [];
        foreach ($positions as $position) {
            $rules["votes.{$position->position_id}"] = [
                'required',
                'array',
                "max:{$position->max_vote}",
            ];
            $rules["votes.{$position->position_id}.*"] = [
                'integer',
                'exists:candidates,id',
            ];
        }

        $validated = $request->validate($rules);

        // Get all selected candidates with their details
        $selections = [];
        foreach ($validated['votes'] as $positionId => $candidateIds) {
            $position = $positions->firstWhere('position_id', $positionId);
            $candidates = $position->candidates->whereIn('id', $candidateIds)->values();

            $selections[] = [
                'position' => [
                    'position_id' => $position->position_id,
                    'description' => $position->description,
                    'max_vote' => $position->max_vote,
                ],
                'candidates' => $candidates->map(fn ($candidate) => [
                    'id' => $candidate->id,
                    'fullname' => $candidate->fullname,
                    'photo' => $candidate->photo,
                    'partylist' => $candidate->partylist?->name,
                ]),
            ];
        }

        return Inertia::render('voting/preview', [
            'election' => $election,
            'selections' => $selections,
            'votes' => $validated['votes'], // Pass votes for submission
        ]);
    }

    /**
     * Submit the voter's ballot.
     */
    public function submit(Request $request): RedirectResponse
    {
        $voter = Auth::guard('voter')->user();
        $election = $voter->election;

        // Check if voter has already voted
        if ($voter->hasVoted()) {
            return redirect()->route('voting.confirmation')
                ->with('error', 'You have already voted.');
        }

        // Validate the votes
        $positions = Position::where('election_id', $election->id)->get();

        $rules = [];
        foreach ($positions as $position) {
            $rules["votes.{$position->position_id}"] = [
                'required',
                'array',
                "max:{$position->max_vote}",
            ];
            $rules["votes.{$position->position_id}.*"] = [
                'integer',
                'exists:candidates,id',
            ];
        }

        $validated = $request->validate($rules);

        DB::beginTransaction();
        try {
            $timestamp = now();
            $referenceId = 'REF-'.strtoupper(substr(md5($voter->id.$timestamp), 0, 8));

            // Save all votes
            foreach ($validated['votes'] as $positionId => $candidateIds) {
                foreach ($candidateIds as $candidateId) {
                    Vote::create([
                        'election_id' => $election->id,
                        'voters_id' => $voter->id,
                        'candidate_id' => $candidateId,
                        'position_id' => $positionId,
                        'timestamp' => $timestamp,
                    ]);
                }
            }

            // Mark voter as having voted
            $voter->markAsVoted();

            // Log the vote cast activity
            VoterActivityLog::log(
                voterId: $voter->id,
                electionId: $election->id,
                action: 'vote_cast',
                metadata: [
                    'positions_voted' => count($validated['votes']),
                    'total_candidates_selected' => array_sum(array_map('count', $validated['votes'])),
                ]
            );

            // Prepare vote summary for confirmation page
            $voteSummary = [];
            foreach ($validated['votes'] as $positionId => $candidateIds) {
                $position = $positions->firstWhere('position_id', $positionId);
                foreach ($candidateIds as $candidateId) {
                    $candidate = $position->candidates->firstWhere('id', $candidateId);
                    $voteSummary[] = [
                        'position' => $position->description,
                        'candidate' => $candidate->fullname,
                        'partylist' => $candidate->partylist?->name,
                    ];
                }
            }

            DB::commit();

            // Prepare vote data for confirmation page
            $confirmationKey = 'vote_confirmation_'.$referenceId;
            $feedbackToken = 'feedback_token_'.bin2hex(random_bytes(16));

            $confirmationData = [
                'votes' => $voteSummary,
                'election' => [
                    'id' => $election->id,
                    'name' => $election->name,
                ],
                'referenceId' => $referenceId,
                'timestamp' => $timestamp->toISOString(),
                'feedbackToken' => $feedbackToken,
            ];

            // Store in cache for 30 minutes (enough time to view confirmation and receipt)
            Cache::put($confirmationKey, $confirmationData, now()->addMinutes(30));

            // Store feedback token with voter ID for 30 minutes
            Cache::put($feedbackToken, [
                'voter_id' => $voter->id,
                'election_id' => $election->id,
            ], now()->addMinutes(30));

            // Log out the voter
            Auth::guard('voter')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('voting.confirmation', ['ref' => $referenceId])
                ->with('success', 'Your vote has been successfully recorded!');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'An error occurred while submitting your vote. Please try again.');
        }
    }

    /**
     * Show the confirmation page after voting.
     */
    public function confirmation(Request $request): Response
    {
        $referenceId = $request->query('ref');
        $confirmationData = [];

        if ($referenceId) {
            $confirmationKey = 'vote_confirmation_'.$referenceId;
            $confirmationData = Cache::get($confirmationKey, []);

            // Delete the cache entry after retrieving it (one-time use)
            if (! empty($confirmationData)) {
                Cache::forget($confirmationKey);
            }
        }

        return Inertia::render('voting/confirmation', [
            'votes' => $confirmationData['votes'] ?? [],
            'election' => $confirmationData['election'] ?? null,
            'referenceId' => $confirmationData['referenceId'] ?? null,
            'timestamp' => $confirmationData['timestamp'] ?? null,
            'feedbackToken' => $confirmationData['feedbackToken'] ?? null,
        ]);
    }

    /**
     * Show the printable receipt for the vote.
     */
    public function receipt(Request $request)
    {
        $referenceId = $request->query('ref');

        if (! $referenceId) {
            return redirect()->route('voting.index')
                ->with('error', 'Invalid receipt reference.');
        }

        $confirmationKey = 'vote_confirmation_'.$referenceId;
        $confirmationData = Cache::get($confirmationKey);

        if (! $confirmationData) {
            return redirect()->route('voting.index')
                ->with('error', 'Receipt has expired or does not exist.');
        }

        return view('VotingSystem::receipt', [
            'votes' => $confirmationData['votes'] ?? [],
            'election' => (object) ($confirmationData['election'] ?? []),
            'referenceId' => $confirmationData['referenceId'] ?? $referenceId,
            'timestamp' => $confirmationData['timestamp'] ?? now()->toISOString(),
        ]);
    }
}
