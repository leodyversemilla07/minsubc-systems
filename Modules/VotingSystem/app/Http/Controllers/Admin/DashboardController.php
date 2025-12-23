<?php

namespace Modules\VotingSystem\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\VotingSystem\Models\Candidate;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Feedback;
use Modules\VotingSystem\Models\Partylist;
use Modules\VotingSystem\Models\Position;
use Modules\VotingSystem\Models\Voter;

class DashboardController extends Controller
{
    /**
     * Display the voting system admin dashboard.
     */
    public function index(Request $request)
    {
        // Get statistics
        $statistics = [
            'elections' => [
                'total' => Election::count(),
                'active' => Election::where('status', true)
                    ->where(function ($query) {
                        $query->whereNull('end_time')
                            ->orWhere('end_time', '>', now());
                    })
                    ->count(),
                'ended' => Election::where('status', false)
                    ->orWhere('end_time', '<', now())
                    ->count(),
            ],
            'candidates' => [
                'total' => Candidate::count(),
            ],
            'voters' => [
                'total' => Voter::count(),
                'voted' => Voter::where('has_voted', true)->count(),
                'pending' => Voter::where('has_voted', false)->count(),
            ],
            'positions' => [
                'total' => Position::count(),
            ],
            'partylists' => [
                'total' => Partylist::count(),
            ],
            'feedback' => [
                'total' => Feedback::count(),
                'recent' => Feedback::where('created_at', '>=', now()->subDays(7))->count(),
            ],
        ];

        // Get active election if any
        $activeElection = Election::where('status', true)
            ->where(function ($query) {
                $query->whereNull('end_time')
                    ->orWhere('end_time', '>', now());
            })
            ->withCount(['positions', 'candidates', 'voters', 'votes'])
            ->first();

        // Get recent elections
        $recentElections = Election::latest()
            ->take(5)
            ->withCount(['positions', 'candidates', 'voters'])
            ->get()
            ->map(function ($election) {
                return [
                    'id' => $election->id,
                    'name' => $election->name,
                    'election_code' => $election->election_code,
                    'status' => $election->status,
                    'computed_status' => $election->status && ($election->end_time === null || $election->end_time > now())
                        ? 'active'
                        : 'ended',
                    'end_time' => $election->end_time,
                    'positions_count' => $election->positions_count,
                    'candidates_count' => $election->candidates_count,
                    'voters_count' => $election->voters_count,
                ];
            });

        return Inertia::render('voting/admin/dashboard', [
            'statistics' => $statistics,
            'activeElection' => $activeElection ? [
                'id' => $activeElection->id,
                'name' => $activeElection->name,
                'election_code' => $activeElection->election_code,
                'status' => $activeElection->status,
                'computed_status' => 'active',
                'end_time' => $activeElection->end_time,
                'positions_count' => $activeElection->positions_count,
                'candidates_count' => $activeElection->candidates_count,
                'voters_count' => $activeElection->voters_count,
                'votes_count' => $activeElection->votes_count,
            ] : null,
            'recentElections' => $recentElections,
        ]);
    }
}
