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
        $activities = $this->activityService->getActivities([
            'category' => $request->input('category'),
            'status' => $request->input('status'),
            'search' => $request->input('search'),
        ], $request->input('per_page', 15));

        return Inertia::render('sas/public/activities/index', [
            'activities' => $activities,
            'filters' => $request->only(['category', 'status', 'search']),
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

        return Inertia::render('sas/public/activities/calendar', [
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

        return Inertia::render('sas/public/activities/show', [
            'activity' => $activity,
        ]);
    }
}
