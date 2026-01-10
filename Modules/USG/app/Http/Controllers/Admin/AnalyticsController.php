<?php

namespace Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\USG\Models\Announcement;
use Modules\USG\Models\Event;
use Modules\USG\Models\Officer;
use Modules\USG\Models\Resolution;
use Modules\USG\Models\EventRegistration;
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

        return inertia('usg/admin/analytics/index', [
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

        $pdf = Pdf::loadView('usg::analytics.export', [
            'period' => $period,
            'stats' => $stats,
            'trends' => $trends,
            'generatedAt' => now()->format('Y-m-d H:i:s'),
        ]);

        return $pdf->download("usg-analytics-report-{$period}-" . now()->format('Y-m-d') . '.pdf');
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
        return [
            'total_announcements' => Announcement::count(),
            'published_announcements' => Announcement::where('status', 'published')->count(),
            'draft_announcements' => Announcement::where('status', 'draft')->count(),
            'announcements_in_period' => Announcement::where('created_at', '>=', $startDate)->count(),
            
            'total_events' => Event::count(),
            'upcoming_events' => Event::where('start_date', '>=', now())->count(),
            'past_events' => Event::where('start_date', '<', now())->count(),
            'events_in_period' => Event::where('created_at', '>=', $startDate)->count(),
            'total_registrations' => EventRegistration::count(),
            
            'total_officers' => Officer::count(),
            'active_officers' => Officer::where('status', 'active')->count(),
            
            'total_resolutions' => Resolution::count(),
            'published_resolutions' => Resolution::where('status', 'published')->count(),
        ];
    }

    /**
     * Get trend data for charts.
     */
    protected function getTrends($startDate): array
    {
        return [
            'announcements_by_category' => Announcement::query()
                ->select('category', \Illuminate\Support\Facades\DB::raw('count(*) as count'))
                ->where('created_at', '>=', $startDate)
                ->groupBy('category')
                ->get(),
            
            'events_by_month' => Event::query()
                ->select(
                    \Illuminate\Support\Facades\DB::raw('MONTH(start_date) as month'),
                    \Illuminate\Support\Facades\DB::raw('YEAR(start_date) as year'),
                    \Illuminate\Support\Facades\DB::raw('count(*) as count')
                )
                ->where('start_date', '>=', $startDate)
                ->groupBy('month', 'year')
                ->orderBy('year')
                ->orderBy('month')
                ->get(),
            
            'announcement_trends' => $this->getDailyTrends(Announcement::class, $startDate),
            'event_trends' => $this->getDailyTrends(Event::class, $startDate),
        ];
    }

    /**
     * Get daily trends for a model.
     */
    protected function getDailyTrends(string $model, $startDate): array
    {
        $days = now()->diffInDays($startDate) + 1;
        
        return collect(range(0, $days - 1))->map(function (int $offset) use ($startDate, $model): array {
            $date = $startDate->copy()->addDays($offset)->format('Y-m-d');
            $count = $model::whereDate('created_at', $date)->count();

            return [
                'date' => $date,
                'count' => $count,
            ];
        });
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
