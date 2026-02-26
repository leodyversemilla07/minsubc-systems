<?php

namespace Modules\VotingSystem\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\VotingSystem\Models\Candidate;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Partylist;
use Modules\VotingSystem\Models\Position;
use Modules\VotingSystem\Models\Vote;
use Modules\VotingSystem\Models\Voter;
use Modules\VotingSystem\Models\VoterFeedback;
use Symfony\Component\HttpFoundation\Response;

class AnalyticsController extends Controller
{
    /**
     * Display analytics dashboard.
     */
    public function index(Request $request): InertiaResponse
    {
        $period = $request->get('period', '30days');
        $startDate = $this->getStartDate($period);

        $stats = $this->getAnalyticsStats($startDate);
        $trends = $this->getTrends($startDate);

        return inertia('voting/admin/analytics/index', [
            'stats' => $stats,
            'trends' => $trends,
            'period' => $period,
        ]);
    }

    /**
     * Export analytics report as PDF.
     */
    public function exportPdf(Request $request): Response
    {
        $period = $request->get('period', '30days');
        $startDate = $this->getStartDate($period);

        $stats = $this->getAnalyticsStats($startDate);
        $trends = $this->getTrends($startDate);

        $pdf = Pdf::loadView('voting::analytics.export', [
            'period' => $period,
            'stats' => $stats,
            'trends' => $trends,
            'generatedAt' => now()->format('Y-m-d H:i:s'),
        ]);

        return $pdf->download("voting-analytics-report-{$period}-".now()->format('Y-m-d').'.pdf');
    }

    /**
     * Export analytics report as Excel (JSON format for now).
     */
    public function exportExcel(Request $request)
    {
        $period = $request->get('period', '30days');
        $startDate = $this->getStartDate($period);

        $stats = $this->getAnalyticsStats($startDate);
        $trends = $this->getTrends($startDate);

        return response()->json([
            'period' => $period,
            'stats' => $stats,
            'trends' => $trends,
            'exportedAt' => now()->toIso8601String(),
        ]);
    }

    /**
     * Get comprehensive analytics statistics.
     */
    protected function getAnalyticsStats($startDate): array
    {
        $totalVoters = Voter::count();
        $votedVoters = Voter::where('has_voted', true)->count();
        $voterTurnout = $totalVoters > 0 ? round(($votedVoters / $totalVoters) * 100, 1) : 0;

        return [
            'total_elections' => Election::count(),
            'active_elections' => Election::where('status', true)->count(),
            'completed_elections' => Election::where('status', false)->count(),

            'total_voters' => $totalVoters,
            'voters_who_voted' => $votedVoters,
            'voters_in_period' => Voter::where('created_at', '>=', $startDate)->count(),
            'voter_turnout' => $voterTurnout,

            'total_candidates' => Candidate::count(),
            'total_positions' => Position::count(),
            'total_partylists' => Partylist::count(),

            'total_votes' => Vote::count(),
            'votes_in_period' => Vote::where('created_at', '>=', $startDate)->count(),

            'feedback_count' => VoterFeedback::count(),
            'avg_rating' => VoterFeedback::avg('rating') ?? 0,

            'active_election' => Election::where('status', true)->first(),
        ];
    }

    /**
     * Get trend data for charts.
     */
    protected function getTrends($startDate): array
    {
        return [
            'votes_by_election' => Election::withCount('votes')->get()
                ->map(fn ($e) => ['name' => $e->title, 'count' => $e->votes_count]),

            'candidates_by_position' => Position::withCount('candidates')->get()
                ->map(fn ($p) => ['name' => $p->name, 'count' => $p->candidates_count]),

            'voter_turnout_trend' => $this->getVoterTurnoutTrend(),

            'votes_by_hour' => $this->getVotesByHour(),

            'feedback_distribution' => VoterFeedback::query()
                ->select('rating', \Illuminate\Support\Facades\DB::raw('count(*) as count'))
                ->groupBy('rating')
                ->orderBy('rating')
                ->get(),
        ];
    }

    /**
     * Get voter turnout trend.
     */
    protected function getVoterTurnoutTrend(): array
    {
        $elections = Election::where('status', false)->with('voters')->get();

        return $elections->map(function ($election) {
            $total = $election->voters()->count();
            $voted = $election->voters()->where('has_voted', true)->count();

            return [
                'name' => $election->title,
                'total' => $total,
                'voted' => $voted,
                'turnout' => $total > 0 ? round(($voted / $total) * 100, 1) : 0,
            ];
        })->toArray();
    }

    /**
     * Get votes distribution by hour.
     */
    protected function getVotesByHour(): array
    {
        return collect(range(0, 23))->map(function ($hour) {
            $count = Vote::whereHour('created_at', $hour)->count();

            return [
                'hour' => sprintf('%02d:00', $hour),
                'count' => $count,
            ];
        })->toArray();
    }

    /**
     * Get start date based on period.
     */
    protected function getStartDate(string $period): \Carbon\Carbon
    {
        return match ($period) {
            '7days' => now()->subDays(7),
            '30days' => now()->subDays(30),
            '90days' => now()->subDays(90),
            'year' => now()->subYear(),
            'all' => \Carbon\Carbon::parse('2000-01-01'),
            default => now()->subDays(30),
        };
    }
}
