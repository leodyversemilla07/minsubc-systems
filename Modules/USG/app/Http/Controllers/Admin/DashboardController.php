<?php

namespace Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Modules\USG\Models\Announcement;
use Modules\USG\Models\Event;
use Modules\USG\Models\Officer;
use Modules\USG\Models\Resolution;
use Modules\USG\Models\TransparencyReport;
use Modules\USG\Services\AnnouncementService;
use Modules\USG\Services\EventService;
use Modules\USG\Services\OfficerService;
use Modules\USG\Services\ResolutionService;
use Modules\USG\Services\TransparencyReportService;

class DashboardController extends Controller
{
    public function __construct(
        private AnnouncementService $announcementService,
        private EventService $eventService,
        private OfficerService $officerService,
        private ResolutionService $resolutionService,
        private TransparencyReportService $transparencyReportService
    ) {}

    public function index(): Response
    {
        // Comprehensive statistics
        $statistics = [
            'announcements' => [
                'total' => Announcement::count(),
                'published' => Announcement::published()->count(),
                'draft' => Announcement::draft()->count(),
                'pending' => Announcement::where('status', 'scheduled')->count(),
                'this_month' => Announcement::published()
                    ->whereMonth('publish_date', now()->month)
                    ->whereYear('publish_date', now()->year)
                    ->count(),
            ],
            'events' => [
                'total' => Event::count(),
                'published' => Event::published()->count(),
                'upcoming' => Event::upcoming()->published()->count(),
                'this_month' => Event::published()
                    ->whereMonth('start_date', now()->month)
                    ->whereYear('start_date', now()->year)
                    ->count(),
                'today' => Event::published()
                    ->whereDate('start_date', '<=', now())
                    ->whereDate('end_date', '>=', now())
                    ->count(),
            ],
            'resolutions' => [
                'total' => Resolution::count(),
                'published' => Resolution::published()->count(),
                'draft' => Resolution::where('status', 'draft')->count(),
                'pending' => Resolution::where('status', 'submitted')->count(),
                'this_year' => Resolution::published()
                    ->whereYear('resolution_date', now()->year)
                    ->count(),
            ],
            'officers' => [
                'total' => Officer::count(),
                'active' => Officer::active()->count(),
                'inactive' => Officer::where('is_active', false)->count(),
            ],
            'transparency' => [
                'total' => TransparencyReport::count(),
                'published' => TransparencyReport::where('status', 'published')->count(),
                'draft' => TransparencyReport::where('status', 'draft')->count(),
            ],
        ];

        // Recent items across all content types
        $recentAnnouncements = Announcement::with('author')
            ->latest('created_at')
            ->take(5)
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'type' => 'announcement',
                'status' => $item->status,
                'created_at' => $item->created_at->toISOString(),
                'author' => $item->author?->first_name.' '.$item->author?->last_name,
            ]);

        $recentEvents = Event::with('creator')
            ->latest('created_at')
            ->take(5)
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'type' => 'event',
                'status' => $item->status,
                'created_at' => $item->created_at->toISOString(),
                'author' => $item->creator?->first_name.' '.$item->creator?->last_name,
                'start_date' => $item->start_date?->toISOString(),
            ]);

        $recentResolutions = Resolution::with('submittedBy')
            ->latest('created_at')
            ->take(5)
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'type' => 'resolution',
                'status' => $item->status,
                'created_at' => $item->created_at->toISOString(),
                'author' => $item->submittedBy?->first_name.' '.$item->submittedBy?->last_name,
                'resolution_number' => $item->resolution_number,
            ]);

        // Merge and sort by created_at
        $recentItems = $recentAnnouncements
            ->concat($recentEvents)
            ->concat($recentResolutions)
            ->sortByDesc('created_at')
            ->take(10)
            ->values()
            ->all();

        // Pending tasks that need attention
        $pendingTasks = [];

        // Pending announcements
        $pendingAnnouncements = Announcement::where('status', 'scheduled')
            ->where('publish_date', '<=', now())
            ->count();
        if ($pendingAnnouncements > 0) {
            $pendingTasks[] = [
                'id' => 1,
                'type' => 'announcement',
                'title' => "{$pendingAnnouncements} announcement(s) scheduled for publishing",
                'priority' => 'medium',
                'action_url' => '/usg/admin/announcements?status=scheduled',
            ];
        }

        // Draft announcements
        $draftAnnouncements = Announcement::draft()->count();
        if ($draftAnnouncements > 0) {
            $pendingTasks[] = [
                'id' => 2,
                'type' => 'announcement',
                'title' => "{$draftAnnouncements} draft announcement(s) awaiting completion",
                'priority' => 'low',
                'action_url' => '/usg/admin/announcements?status=draft',
            ];
        }

        // Pending resolutions (submitted for approval)
        $pendingResolutions = Resolution::where('status', 'submitted')->count();
        if ($pendingResolutions > 0) {
            $pendingTasks[] = [
                'id' => 3,
                'type' => 'resolution',
                'title' => "{$pendingResolutions} resolution(s) pending approval",
                'priority' => 'high',
                'action_url' => '/usg/admin/resolutions/pending',
            ];
        }

        // Draft resolutions
        $draftResolutions = Resolution::where('status', 'draft')->count();
        if ($draftResolutions > 0) {
            $pendingTasks[] = [
                'id' => 4,
                'type' => 'resolution',
                'title' => "{$draftResolutions} draft resolution(s) awaiting completion",
                'priority' => 'low',
                'action_url' => '/usg/admin/resolutions?status=draft',
            ];
        }

        // Upcoming events this week
        $upcomingEventsThisWeek = Event::published()
            ->whereBetween('start_date', [now(), now()->addWeek()])
            ->count();
        if ($upcomingEventsThisWeek > 0) {
            $pendingTasks[] = [
                'id' => 5,
                'type' => 'event',
                'title' => "{$upcomingEventsThisWeek} event(s) scheduled this week",
                'priority' => 'medium',
                'action_url' => '/usg/admin/events?filter=upcoming',
            ];
        }

        // Draft transparency reports
        $draftReports = TransparencyReport::where('status', 'draft')->count();
        if ($draftReports > 0) {
            $pendingTasks[] = [
                'id' => 6,
                'type' => 'transparency',
                'title' => "{$draftReports} transparency report(s) in draft",
                'priority' => 'low',
                'action_url' => '/usg/admin/transparency?status=draft',
            ];
        }

        return Inertia::render('usg/admin/dashboard', [
            'statistics' => $statistics,
            'recentItems' => $recentItems,
            'pendingTasks' => $pendingTasks,
        ]);
    }
}
