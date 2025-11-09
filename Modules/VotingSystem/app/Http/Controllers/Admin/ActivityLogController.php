<?php

namespace Modules\VotingSystem\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\VoterActivityLog;

class ActivityLogController extends Controller
{
    /**
     * Display a listing of voter activity logs.
     */
    public function index(Request $request): Response
    {
        $query = VoterActivityLog::with(['voter', 'election'])
            ->latest();

        // Filter by election
        if ($request->filled('election_id')) {
            $query->forElection($request->election_id);
        }

        // Filter by action
        if ($request->filled('action')) {
            $query->action($request->action);
        }

        // Filter by date range
        if ($request->filled('from') && $request->filled('to')) {
            $query->dateRange($request->from, $request->to);
        }

        // Filter by voter ID
        if ($request->filled('voter_id')) {
            $query->forVoter($request->voter_id);
        }

        $activityLogs = $query->paginate(50)->withQueryString();

        $elections = Election::select('id', 'name')->get();

        // Get available actions for filter
        $actions = [
            'login' => 'Login',
            'vote_cast' => 'Vote Cast',
            'results_viewed' => 'Results Viewed',
            'ballot_accessed' => 'Ballot Accessed',
            'logout' => 'Logout',
        ];

        return Inertia::render('voting/admin/activity-logs/index', [
            'activityLogs' => $activityLogs,
            'elections' => $elections,
            'actions' => $actions,
            'filters' => $request->only(['election_id', 'action', 'from', 'to', 'voter_id']),
        ]);
    }

    /**
     * Display the specified activity log.
     */
    public function show(VoterActivityLog $activityLog): Response
    {
        $activityLog->load(['voter', 'election']);

        return Inertia::render('voting/admin/activity-logs/show', [
            'activityLog' => $activityLog,
        ]);
    }
}
