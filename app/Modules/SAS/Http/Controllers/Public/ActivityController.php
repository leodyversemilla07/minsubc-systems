<?php

namespace App\Modules\SAS\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Modules\SAS\Services\ActivityService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    public function __construct(
        protected ActivityService $activityService
    ) {}

    /**
     * Display a list view of activities.
     */
    public function index(Request $request): Response
    {
        $filters = [
            'activity_type' => $request->input('type'),
            'status' => $request->input('status'),
            'search' => $request->input('search'),
        ];

        $activities = $this->activityService->getActivities(
            $filters,
            $request->input('per_page', 24)
        );

        return Inertia::render('SAS/public/activities/index', [
            'activities' => [
                'data' => $activities->items(),
                'links' => [
                    'first' => $activities->url(1),
                    'last' => $activities->url($activities->lastPage()),
                    'prev' => $activities->previousPageUrl(),
                    'next' => $activities->nextPageUrl(),
                ],
                'meta' => [
                    'current_page' => $activities->currentPage(),
                    'from' => $activities->firstItem(),
                    'last_page' => $activities->lastPage(),
                    'path' => $activities->path(),
                    'per_page' => $activities->perPage(),
                    'to' => $activities->lastItem(),
                    'total' => $activities->total(),
                ],
            ],
            'filters' => $request->only(['type', 'status', 'search']),
        ]);
    }

    /**
     * Display the calendar view of activities.
     */
    public function calendar(Request $request): Response
    {
        $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', now()->endOfMonth()->toDateString());

        $activities = $this->activityService->getActivitiesByDateRange($startDate, $endDate);

        return Inertia::render('SAS/public/activities/calendar', [
            'activities' => $activities,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }

    /**
     * Display the specified activity details.
     */
    public function show(string $slug): Response
    {
        $activity = \App\Modules\SAS\Models\SASActivity::where('slug', $slug)
            ->with('organization')
            ->firstOrFail();

        return Inertia::render('SAS/public/activities/show', [
            'activity' => $activity,
        ]);
    }
}
