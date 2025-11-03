<?php

namespace Modules\SAS\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\SAS\Models\SASActivity;

class ActivityService
{
    /**
     * Get all activities with optional filters and pagination.
     */
    public function getActivities(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = SASActivity::query()->with('organization');

        if (isset($filters['activity_type'])) {
            $query->where('category', $filters['activity_type']);
        }

        if (isset($filters['status'])) {
            $query->where('activity_status', $filters['status']);
        }

        if (isset($filters['organization_id'])) {
            $query->where('organization_id', $filters['organization_id']);
        }

        if (isset($filters['activity_date'])) {
            $query->whereDate('start_date', '>=', $filters['activity_date']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('activity_title', 'like', "%{$filters['search']}%")
                    ->orWhere('description', 'like', "%{$filters['search']}%")
                    ->orWhere('location', 'like', "%{$filters['search']}%")
                    ->orWhere('organizer', 'like', "%{$filters['search']}%");
            });
        }

        return $query->orderBy('start_date', 'desc')->paginate($perPage);
    }

    /**
     * Get activities within a specific date range (for calendar view).
     */
    public function getActivitiesByDateRange(string $startDate, string $endDate): Collection
    {
        return SASActivity::with('organization')
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween('start_date', [$startDate, $endDate])
                    ->orWhereBetween('end_date', [$startDate, $endDate])
                    ->orWhere(function ($q) use ($startDate, $endDate) {
                        $q->where('start_date', '<=', $startDate)
                            ->where('end_date', '>=', $endDate);
                    });
            })
            ->orderBy('start_date')
            ->get();
    }

    /**
     * Get a single activity by ID.
     */
    public function getActivityById(int $id): SASActivity
    {
        return SASActivity::with('organization')->findOrFail($id);
    }

    /**
     * Create a new activity.
     */
    public function createActivity(array $data): SASActivity
    {
        return SASActivity::create($data);
    }

    /**
     * Update an existing activity.
     */
    public function updateActivity(SASActivity $activity, array $data): SASActivity
    {
        $activity->update($data);

        return $activity->fresh();
    }

    /**
     * Delete an activity.
     */
    public function deleteActivity(SASActivity $activity): bool
    {
        return $activity->delete();
    }

    /**
     * Get upcoming activities.
     */
    public function getUpcomingActivities(int $limit = 10): Collection
    {
        return SASActivity::with('organization')
            ->where('start_date', '>=', now())
            ->where('activity_status', 'upcoming')
            ->orderBy('start_date')
            ->limit($limit)
            ->get();
    }

    /**
     * Get activity statistics.
     */
    public function getActivityStatistics(): array
    {
        return [
            'total_activities' => SASActivity::count(),
            'upcoming_activities' => SASActivity::where('activity_status', 'upcoming')->count(),
            'ongoing_activities' => SASActivity::where('activity_status', 'ongoing')->count(),
            'completed_activities' => SASActivity::where('activity_status', 'completed')->count(),
            'cancelled_activities' => SASActivity::where('activity_status', 'cancelled')->count(),
            'total_target_participants' => SASActivity::sum('target_participants'),
            'total_actual_participants' => SASActivity::sum('actual_participants'),
            'by_category' => SASActivity::selectRaw('category, COUNT(*) as count')
                ->whereNotNull('category')
                ->groupBy('category')
                ->pluck('count', 'category'),
        ];
    }
}
