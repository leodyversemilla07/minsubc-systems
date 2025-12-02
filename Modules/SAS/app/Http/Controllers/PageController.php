<?php

namespace Modules\SAS\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\SAS\Models\Organization;
use Modules\SAS\Models\SASActivity;
use Modules\SAS\Services\ActivityService;
use Modules\SAS\Services\CalendarService;
use Modules\SAS\Services\OrganizationService;
use Modules\USG\Models\Event;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class PageController extends Controller
{
    public function __construct(
        private OrganizationService $organizationService,
        private ActivityService $activityService,
        private CalendarService $calendarService,
    ) {}

    // ========================================
    // Homepage
    // ========================================

    /**
     * Display the SAS homepage.
     */
    public function index(): Response
    {
        // Get featured content for homepage
        $featuredOrganizations = Organization::where('status', 'Active')
            ->with('adviser')
            ->withCount(['members', 'officers'])
            ->orderBy('organization_name')
            ->limit(6)
            ->get();

        $upcomingActivities = SASActivity::where('status', 'Scheduled')
            ->where('start_date', '>=', now())
            ->with(['organization', 'createdBy'])
            ->orderBy('start_date')
            ->limit(6)
            ->get(['id', 'activity_title', 'slug', 'start_date', 'end_date', 'location', 'category', 'organization_id', 'created_by']);

        $stats = [
            'total_organizations' => Organization::where('status', 'Active')->count(),
            'upcoming_activities' => SASActivity::where('status', 'Scheduled')
                ->where('start_date', '>=', now())
                ->count(),
            'total_members' => \DB::table('organization_members')
                ->where('status', 'Active')
                ->count(),
            'active_scholarships' => \DB::table('scholarships')
                ->where('is_active', 1)
                ->count(),
        ];

        return Inertia::render('sas/index', [
            'featuredOrganizations' => $featuredOrganizations,
            'upcomingActivities' => $upcomingActivities,
            'stats' => $stats,
        ]);
    }

    // ========================================
    // Organizations
    // ========================================

    /**
     * Display a listing of all active organizations.
     */
    public function organizations(Request $request): Response
    {
        $filters = [
            'organization_type' => $request->input('type'),
            'status' => $request->input('status') ?: 'Active',
            'category' => $request->input('category'),
            'search' => $request->input('search'),
        ];

        $organizations = $this->organizationService->getOrganizations(
            $filters,
            $request->input('per_page', 24)
        );

        return Inertia::render('sas/organizations/index', [
            'organizations' => [
                'data' => $organizations->items(),
                'links' => [
                    'first' => $organizations->url(1),
                    'last' => $organizations->url($organizations->lastPage()),
                    'prev' => $organizations->previousPageUrl(),
                    'next' => $organizations->nextPageUrl(),
                ],
                'meta' => [
                    'current_page' => $organizations->currentPage(),
                    'from' => $organizations->firstItem(),
                    'last_page' => $organizations->lastPage(),
                    'path' => $organizations->path(),
                    'per_page' => $organizations->perPage(),
                    'to' => $organizations->lastItem(),
                    'total' => $organizations->total(),
                ],
            ],
            'filters' => $request->only(['type', 'status', 'category', 'search']),
        ]);
    }

    /**
     * Display the specified organization profile.
     */
    public function organizationShow(string $code): Response
    {
        $organization = Organization::where('organization_code', $code)
            ->where('status', 'Active')
            ->with([
                'adviser',
                'officers' => function ($query) {
                    $query->with('student:id,first_name,last_name,email')
                        ->orderByDesc('is_current')
                        ->orderBy('position');
                },
                'members' => function ($query) {
                    $query->where('status', 'Active')
                        ->with('student:id,first_name,middle_name,last_name,email')
                        ->join('users', 'organization_members.student_id', '=', 'users.id')
                        ->orderBy('users.last_name')
                        ->orderBy('users.first_name')
                        ->select('organization_members.*');
                },
                'activities' => function ($query) {
                    $query->latest('activity_date')
                        ->limit(10)
                        ->select(['id', 'activity_name', 'activity_date', 'description', 'venue']);
                },
            ])
            ->withCount(['officers', 'members', 'activities'])
            ->firstOrFail();

        return Inertia::render('sas/organizations/show', [
            'organization' => $organization,
        ]);
    }

    // ========================================
    // Activities
    // ========================================

    /**
     * Display a listing of activities.
     */
    public function activities(Request $request): Response
    {
        $filters = [
            'category' => $request->input('category'),
            'status' => $request->input('status') ?: 'Scheduled',
            'organization_id' => $request->input('organization'),
            'search' => $request->input('search'),
            'date_from' => $request->input('date_from'),
            'date_to' => $request->input('date_to'),
        ];

        $activities = $this->activityService->getActivities(
            $filters,
            $request->input('per_page', 12)
        );

        $categories = SASActivity::distinct()
            ->whereNotNull('category')
            ->pluck('category')
            ->sort()
            ->values();

        $organizations = Organization::where('status', 'Active')
            ->orderBy('organization_name')
            ->get(['id', 'organization_name', 'organization_code']);

        return Inertia::render('sas/activities/index', [
            'activities' => $activities,
            'categories' => $categories,
            'organizations' => $organizations,
            'filters' => $request->only(['category', 'status', 'organization', 'search', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Display the activity calendar view.
     */
    public function activitiesCalendar(Request $request): Response
    {
        $year = $request->get('year', now()->year);
        $month = $request->get('month', now()->month);

        $activities = SASActivity::whereYear('start_date', $year)
            ->whereMonth('start_date', $month)
            ->whereIn('status', ['Scheduled', 'Ongoing'])
            ->with(['organization', 'createdBy'])
            ->orderBy('start_date')
            ->get();

        $categories = SASActivity::distinct()
            ->whereNotNull('category')
            ->pluck('category')
            ->sort()
            ->values();

        return Inertia::render('sas/activities/calendar', [
            'activities' => $activities,
            'categories' => $categories,
            'currentMonth' => $month,
            'currentYear' => $year,
        ]);
    }

    /**
     * Display the yearly timeline of USG events and activities.
     */
    public function yearlyTimeline(Request $request): Response
    {
        $year = $request->get('year', now()->year);
        $category = $request->get('category');

        // Fetch USG events for the entire year
        $eventsQuery = Event::whereYear('start_date', $year)
            ->published()
            ->orderBy('start_date');

        if ($category) {
            $eventsQuery->where('category', $category);
        }

        $events = $eventsQuery->get();

        // Get event categories for filtering
        $categories = Event::distinct()
            ->whereNotNull('category')
            ->pluck('category')
            ->sort()
            ->values();

        // Group events by month
        $eventsByMonth = $events->groupBy(function ($event) {
            return $event->start_date->format('n'); // Month number (1-12)
        });

        // Create a structure for all 12 months
        $yearlyData = [];
        for ($month = 1; $month <= 12; $month++) {
            $monthEvents = $eventsByMonth->get($month, collect());
            $yearlyData[$month] = [
                'month' => $month,
                'month_name' => \Carbon\Carbon::create($year, $month, 1)->format('F'),
                'month_short' => \Carbon\Carbon::create($year, $month, 1)->format('M'),
                'events' => $monthEvents->values()->toArray(),
                'event_count' => $monthEvents->count(),
            ];
        }

        return Inertia::render('sas/activities/yearly-timeline', [
            'yearlyData' => array_values($yearlyData),
            'categories' => $categories,
            'currentYear' => (int) $year,
            'filters' => [
                'year' => (int) $year,
                'category' => $category,
            ],
        ]);
    }

    /**
     * Display the specified activity.
     */
    public function activityShow(string $slug): Response
    {
        $activity = SASActivity::where('slug', $slug)
            ->whereIn('status', ['Scheduled', 'Ongoing', 'Completed'])
            ->with([
                'organization',
                'createdBy',
                'documents' => function ($query) {
                    $query->orderBy('uploaded_at', 'desc');
                },
            ])
            ->firstOrFail();

        // Get related activities from the same organization
        $relatedActivities = SASActivity::where('organization_id', $activity->organization_id)
            ->where('id', '!=', $activity->id)
            ->whereIn('status', ['Scheduled', 'Ongoing'])
            ->orderBy('start_date', 'desc')
            ->limit(4)
            ->get(['id', 'activity_title', 'slug', 'start_date', 'end_date', 'location', 'category', 'organization_id']);

        return Inertia::render('sas/activities/show', [
            'activity' => $activity,
            'relatedActivities' => $relatedActivities,
        ]);
    }

    /**
     * Export a single activity as .ics file.
     */
    public function exportActivity(string $slug): HttpResponse
    {
        $activity = SASActivity::where('slug', $slug)
            ->whereIn('status', ['Scheduled', 'Ongoing'])
            ->with('organization')
            ->firstOrFail();

        return $this->calendarService->exportActivity($activity);
    }

    /**
     * Export multiple activities as .ics file based on filters.
     */
    public function exportCalendar(Request $request): HttpResponse
    {
        $query = SASActivity::query();

        // Apply filters
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('organization')) {
            $query->where('organization_id', $request->organization);
        }

        if ($request->filled('date_from')) {
            $query->where('start_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->where('start_date', '<=', $request->date_to);
        }

        if ($request->filled('month') && $request->filled('year')) {
            $query->whereYear('start_date', $request->year)
                ->whereMonth('start_date', $request->month);
        }

        // Only export scheduled and ongoing activities
        $query->whereIn('status', ['Scheduled', 'Ongoing'])
            ->with('organization')
            ->orderBy('start_date');

        $activities = $query->get();

        // Generate filename based on filters
        $filename = 'sas-activities';
        if ($request->filled('category')) {
            $filename .= '-'.$request->category;
        }
        if ($request->filled('month') && $request->filled('year')) {
            $filename .= '-'.$request->year.'-'.str_pad($request->month, 2, '0', STR_PAD_LEFT);
        }

        return $this->calendarService->exportActivities($activities, $filename);
    }

    // ========================================
    // Scholarships (Public View)
    // ========================================

    /**
     * Display available scholarships (public view).
     */
    public function scholarships(Request $request): Response
    {
        $query = \Modules\SAS\Models\Scholarship::active();

        // Filter by type
        if ($request->filled('type')) {
            $query->where('scholarship_type', $request->type);
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('scholarship_name', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%")
                    ->orWhere('provider', 'LIKE', "%{$search}%");
            });
        }

        $scholarships = $query->orderBy('scholarship_name')->paginate(12);

        $types = \Modules\SAS\Models\Scholarship::active()
            ->distinct()
            ->pluck('scholarship_type')
            ->filter()
            ->sort()
            ->values();

        return Inertia::render('sas/scholarships/index', [
            'scholarships' => $scholarships,
            'types' => $types,
            'filters' => $request->only(['type', 'search']),
        ]);
    }

    /**
     * Display scholarship details (public view).
     */
    public function scholarshipShow(int $id): Response
    {
        $scholarship = \Modules\SAS\Models\Scholarship::active()
            ->findOrFail($id);

        // Get related scholarships
        $relatedScholarships = \Modules\SAS\Models\Scholarship::active()
            ->where('id', '!=', $id)
            ->where('scholarship_type', $scholarship->scholarship_type)
            ->limit(3)
            ->get(['id', 'scholarship_name', 'scholarship_type', 'provider']);

        return Inertia::render('sas/scholarships/show', [
            'scholarship' => $scholarship,
            'relatedScholarships' => $relatedScholarships,
        ]);
    }
}
