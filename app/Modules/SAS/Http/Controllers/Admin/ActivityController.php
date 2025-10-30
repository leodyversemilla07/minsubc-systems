<?php

namespace App\Modules\SAS\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\SAS\Http\Requests\StoreSASActivityRequest;
use App\Modules\SAS\Http\Requests\UpdateSASActivityRequest;
use App\Modules\SAS\Models\SASActivity;
use App\Modules\SAS\Services\ActivityService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    public function __construct(
        protected ActivityService $activityService
    ) {}

    /**
     * Display a listing of all activities.
     */
    public function index(Request $request): Response
    {
        $activities = $this->activityService->getActivities([
            'category' => $request->input('category'),
            'status' => $request->input('status'),
            'organization_id' => $request->input('organization_id'),
            'search' => $request->input('search'),
        ], $request->input('per_page', 15));

        return Inertia::render('SAS/admin/activities/index', [
            'activities' => $activities,
            'filters' => $request->only(['category', 'status', 'organization_id', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new activity.
     */
    public function create(): Response
    {
        $organizations = \App\Modules\SAS\Models\Organization::where('status', 'Active')->get();

        return Inertia::render('SAS/admin/activities/create', [
            'organizations' => $organizations,
        ]);
    }

    /**
     * Store a newly created activity.
     */
    public function store(StoreSASActivityRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['activity_title']).'-'.time();
        $data['created_by'] = $request->user()->id;
        $data['status'] = 'Scheduled';

        $this->activityService->createActivity($data);

        return redirect()->route('sas.admin.activities.index')
            ->with('success', 'Activity created successfully.');
    }

    /**
     * Display the specified activity.
     */
    public function show(int $id): Response
    {
        $activity = $this->activityService->getActivityById($id);

        return Inertia::render('SAS/admin/activities/show', [
            'activity' => $activity,
        ]);
    }

    /**
     * Show the form for editing the specified activity.
     */
    public function edit(int $id): Response
    {
        $activity = $this->activityService->getActivityById($id);
        $organizations = \App\Modules\SAS\Models\Organization::where('status', 'Active')->get();

        return Inertia::render('SAS/admin/activities/edit', [
            'activity' => $activity,
            'organizations' => $organizations,
        ]);
    }

    /**
     * Update the specified activity.
     */
    public function update(UpdateSASActivityRequest $request, int $id): RedirectResponse
    {
        $activity = SASActivity::findOrFail($id);

        $this->activityService->updateActivity($activity, $request->validated());

        return redirect()->route('sas.admin.activities.index')
            ->with('success', 'Activity updated successfully.');
    }

    /**
     * Remove the specified activity.
     */
    public function destroy(int $id): RedirectResponse
    {
        $activity = SASActivity::findOrFail($id);

        $this->activityService->deleteActivity($activity);

        return redirect()->route('sas.admin.activities.index')
            ->with('success', 'Activity deleted successfully.');
    }

    /**
     * Mark an activity as completed.
     */
    public function complete(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'actual_participants' => 'nullable|integer|min:0',
            'completion_report' => 'nullable|string',
        ]);

        $activity = SASActivity::findOrFail($id);

        $this->activityService->updateActivity($activity, [
            'status' => 'Completed',
            'actual_participants' => $request->input('actual_participants'),
            'completion_report' => $request->input('completion_report'),
        ]);

        return redirect()->back()->with('success', 'Activity marked as completed.');
    }

    /**
     * Cancel an activity.
     */
    public function cancel(Request $request, int $id): RedirectResponse
    {
        $activity = SASActivity::findOrFail($id);

        $this->activityService->updateActivity($activity, [
            'status' => 'Cancelled',
        ]);

        return redirect()->back()->with('success', 'Activity cancelled.');
    }
}
