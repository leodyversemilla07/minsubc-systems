<?php

namespace Modules\USG\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\USG\Models\Officer;
use Modules\USG\Models\TransparencyReport;
use Modules\USG\Services\AnnouncementService;
use Modules\USG\Services\EventService;
use Modules\USG\Services\ICalService;
use Modules\USG\Services\OfficerService;
use Modules\USG\Services\ResolutionService;
use Modules\USG\Services\VMGOService;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PageController extends Controller
{
    public function __construct(
        private VMGOService $vmgoService,
        private OfficerService $officerService,
        private AnnouncementService $announcementService,
        private EventService $eventService,
        private ResolutionService $resolutionService,
        private ICalService $iCalService,
    ) {}

    // ========================================
    // Homepage & VMGO
    // ========================================

    public function index(): Response
    {
        $vmgo = $this->vmgoService->getCurrent();

        // Get data for homepage
        $recentAnnouncements = $this->announcementService->getRecentAnnouncements(3);
        $upcomingEvents = $this->eventService->getUpcomingEvents(5);

        $stats = [
            'totalOfficers' => $this->officerService->getActiveOfficers()->count(),
            'totalResolutions' => $this->resolutionService->getStatistics()['published'] ?? 0,
            'upcomingEvents' => $this->eventService->getStatistics()['upcoming'] ?? 0,
            'recentAnnouncements' => $this->announcementService->getStatistics()['this_month'] ?? 0,
        ];

        // Get featured officers for homepage
        $featuredOfficers = Officer::active()
            ->with('user')
            ->select(['id', 'name', 'position', 'photo'])
            ->orderBy('order')
            ->limit(6)
            ->get();

        return Inertia::render('usg/home', [
            'vmgo' => $vmgo,
            'recentAnnouncements' => $recentAnnouncements,
            'upcomingEvents' => $upcomingEvents,
            'stats' => $stats,
            'featuredOfficers' => $featuredOfficers,
        ]);
    }

    public function vmgo(): Response
    {
        $vmgo = $this->vmgoService->getCurrent();

        return Inertia::render('usg/vmgo', [
            'vmgo' => $vmgo,
        ]);
    }

    // ========================================
    // Officers
    // ========================================

    public function officers(): Response
    {
        $officers = $this->officerService->getActiveOfficers();
        $departments = $this->officerService->getDepartments();

        $stats = [
            'total_officers' => $officers->count(),
            'active_officers' => $officers->where('is_active', true)->count(),
            'departments_count' => count($departments),
        ];

        return Inertia::render('usg/officers/index', [
            'officers' => $officers,
            'departments' => $departments,
            'stats' => $stats,
        ]);
    }

    public function officerShow(int $id): Response
    {
        $officer = $this->officerService->getById($id);

        if (! $officer) {
            abort(404, 'Officer not found');
        }

        return Inertia::render('usg/officers/show', [
            'officer' => $officer,
        ]);
    }

    // ========================================
    // Announcements
    // ========================================

    public function announcements(Request $request): Response
    {
        $search = $request->get('search');
        $category = $request->get('category');

        if ($search || $category) {
            $announcements = $this->announcementService->searchAnnouncements($search ?? '', [
                'category' => $category,
            ]);
        } else {
            $announcements = $this->announcementService->getPublishedAnnouncements(12);
        }

        $categories = $this->announcementService->getCategories();
        $featured = $this->announcementService->getFeaturedAnnouncements(3);

        return Inertia::render('usg/announcements/index', [
            'announcements' => $announcements,
            'categories' => $categories ?? [],
            'featured' => $featured,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }

    public function announcementShow(string $slug): Response
    {
        $announcement = $this->announcementService->getBySlug($slug);

        if (! $announcement) {
            abort(404, 'Announcement not found');
        }

        // Increment view count
        $this->announcementService->incrementViewsById($announcement->id);

        $related = $this->announcementService->getRelatedAnnouncements($announcement, 3);

        return Inertia::render('usg/announcements/show', [
            'announcement' => $announcement,
            'related' => $related,
        ]);
    }

    public function announcementCategory(string $category): Response
    {
        $announcements = $this->announcementService->searchAnnouncements('', [
            'category' => $category,
        ]);

        $categories = $this->announcementService->getCategories();
        $featured = $this->announcementService->getFeaturedAnnouncements(3);

        return Inertia::render('usg/announcements/index', [
            'announcements' => $announcements,
            'categories' => $categories,
            'featured' => $featured,
            'filters' => [
                'category' => $category,
            ],
        ]);
    }

    // ========================================
    // Events
    // ========================================

    public function events(Request $request): Response
    {
        $search = $request->get('search');

        if ($search) {
            $events = $this->eventService->searchEvents($search);
        } else {
            $events = $this->eventService->getUpcomingEvents(50);
        }

        $categories = $this->eventService->getCategories();
        $featuredEvents = $this->eventService->getUpcomingEvents(3);

        return Inertia::render('usg/events/index', [
            'events' => $events,
            'categories' => $categories,
            'featured_events' => $featuredEvents,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function eventsCalendar(Request $request): Response
    {
        $year = $request->get('year', now()->year);
        $month = $request->get('month', now()->month);

        $events = $this->eventService->getEventsByMonth($year, $month);
        $categories = $this->eventService->getCategories();

        return Inertia::render('usg/events/calendar', [
            'events' => $events,
            'categories' => $categories,
            'currentMonth' => $month,
            'currentYear' => $year,
        ]);
    }

    public function eventShow(string $slug): Response
    {
        $event = $this->eventService->getBySlug($slug);

        if (! $event) {
            abort(404, 'Event not found');
        }

        $relatedEvents = $this->eventService->getRelatedEvents($event, 4);

        return Inertia::render('usg/events/show', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
        ]);
    }

    public function eventsCalendarData(Request $request): JsonResponse
    {
        $year = $request->get('year', now()->year);
        $month = $request->get('month', now()->month);

        return response()->json(
            $this->eventService->getCalendarData($year, $month)
        );
    }

    /**
     * Export a single event as iCalendar file
     */
    public function eventExportICal(string $slug): \Symfony\Component\HttpFoundation\Response
    {
        $event = $this->eventService->getBySlug($slug);

        if (! $event) {
            abort(404, 'Event not found');
        }

        $icalContent = $this->iCalService->generateEventICalendar($event);
        $filename = $this->iCalService->generateFilename($event);

        return response($icalContent)
            ->header('Content-Type', 'text/calendar; charset=utf-8')
            ->header('Content-Disposition', 'attachment; filename="'.$filename.'"');
    }

    /**
     * Export all upcoming events as iCalendar file
     */
    public function eventsExportAllICal(): \Symfony\Component\HttpFoundation\Response
    {
        $events = $this->eventService->getUpcomingPublishedEvents();

        $icalContent = $this->iCalService->generateMultipleEventsICalendar($events);
        $filename = $this->iCalService->generateMultipleEventsFilename();

        return response($icalContent)
            ->header('Content-Type', 'text/calendar; charset=utf-8')
            ->header('Content-Disposition', 'attachment; filename="'.$filename.'"');
    }

    // ========================================
    // Resolutions
    // ========================================

    public function resolutions(Request $request): Response
    {
        $search = $request->get('search');
        $category = $request->get('category');
        $type = $request->get('type');
        $year = $request->get('year');

        $query = $this->resolutionService->getPublishedQuery();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('resolution_number', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%");
            });
        }

        if ($category) {
            $query->where('category', $category);
        }

        if ($type) {
            $query->where('type', $type);
        }

        if ($year) {
            $query->whereYear('resolution_date', $year);
        }

        $resolutions = $query->orderBy('resolution_date', 'desc')->paginate(12);

        $categories = $this->resolutionService->getCategories();
        $authors = $this->resolutionService->getAuthors();
        $statistics = $this->resolutionService->getStatistics();

        return Inertia::render('usg/resolutions/index', [
            'resolutions' => $resolutions,
            'categories' => $categories,
            'authors' => $authors,
        ]);
    }

    public function resolutionShow(string $id): Response
    {
        $resolution = $this->resolutionService->getById($id);

        if (! $resolution || $resolution->status !== 'published') {
            abort(404, 'Resolution not found');
        }

        $relatedResolutions = $this->resolutionService->getRelatedResolutions($resolution, 4);

        return Inertia::render('usg/resolutions/show', [
            'resolution' => $resolution,
            'relatedResolutions' => $relatedResolutions,
        ]);
    }

    public function resolutionDownload(string $id): BinaryFileResponse
    {
        $resolution = $this->resolutionService->getById($id);

        if (! $resolution || $resolution->status !== 'published') {
            abort(404, 'Resolution not found');
        }

        if (! $resolution->file_path || ! file_exists(storage_path('app/'.$resolution->file_path))) {
            abort(404, 'File not found');
        }

        return response()->download(
            storage_path('app/'.$resolution->file_path),
            $resolution->file_name ?: "resolution-{$resolution->resolution_number}.pdf"
        );
    }

    public function resolutionCategory(string $category): Response
    {
        $resolutions = $this->resolutionService->searchResolutions('', [
            'category' => $category,
        ]);

        $categories = $this->resolutionService->getCategories();
        $authors = $this->resolutionService->getAuthors();

        return Inertia::render('usg/resolutions/index', [
            'resolutions' => $resolutions,
            'categories' => $categories,
            'authors' => $authors,
            'filters' => [
                'category' => $category,
            ],
        ]);
    }

    // ========================================
    // Transparency Reports
    // ========================================

    public function transparency(Request $request): Response
    {
        $query = TransparencyReport::query()
            ->with('createdBy:id,first_name,last_name')
            ->published()
            ->orderBy('published_at', 'desc');

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter by year
        if ($request->filled('year')) {
            $year = (int) $request->year;
            $query->where(function ($q) use ($year) {
                $q->whereBetween('report_period_start', ["{$year}-01-01", "{$year}-12-31"])
                    ->orWhereBetween('report_period_end', ["{$year}-01-01", "{$year}-12-31"]);
            });
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        $reports = $query->paginate(12);

        // Get available filter options
        $types = TransparencyReport::published()
            ->distinct()
            ->pluck('type')
            ->sort()
            ->values();

        $years = TransparencyReport::published()
            ->selectRaw('YEAR(report_period_start) as year')
            ->union(
                TransparencyReport::published()
                    ->selectRaw('YEAR(report_period_end) as year')
            )
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        // Get statistics
        $stats = [
            'total_reports' => TransparencyReport::published()->count(),
            'financial_reports' => TransparencyReport::published()->ofType('financial')->count(),
            'meeting_minutes' => TransparencyReport::published()->ofType('meeting_minutes')->count(),
            'total_downloads' => TransparencyReport::published()->sum('download_count'),
        ];

        return Inertia::render('usg/transparency/index', [
            'reports' => $reports,
            'types' => $types,
            'years' => $years,
            'stats' => $stats,
            'filters' => $request->only(['type', 'year', 'search']),
        ]);
    }

    public function transparencyShow(TransparencyReport $transparencyReport): Response
    {
        abort_unless($transparencyReport->status === 'published', 404);

        $transparencyReport->load('createdBy:id,first_name,last_name');
        $transparencyReport->incrementViewCount();

        // Get related reports
        $relatedReports = TransparencyReport::published()
            ->where('id', '!=', $transparencyReport->id)
            ->where('type', $transparencyReport->type)
            ->limit(3)
            ->get(['id', 'title', 'slug', 'type', 'published_at']);

        return Inertia::render('usg/transparency/show', [
            'report' => $transparencyReport,
            'relatedReports' => $relatedReports,
        ]);
    }

    public function transparencyDownload(TransparencyReport $transparencyReport): BinaryFileResponse
    {
        abort_unless($transparencyReport->status === 'published', 404);
        abort_unless($transparencyReport->file_path && file_exists(storage_path('app/'.$transparencyReport->file_path)), 404);

        $transparencyReport->incrementDownloadCount();

        return response()->download(
            storage_path('app/'.$transparencyReport->file_path),
            $transparencyReport->file_name ?: 'transparency-report.pdf'
        );
    }

    // ========================================
    // Search
    // ========================================

    public function search(Request $request): Response
    {
        $query = $request->get('q', '');

        $announcements = $this->announcementService->searchAnnouncements($query, [
            'limit' => 20,
        ]);

        $categories = $this->announcementService->getCategories();

        return Inertia::render('usg/search', [
            'query' => $query,
            'announcements' => $announcements,
            'categories' => $categories,
        ]);
    }
}
