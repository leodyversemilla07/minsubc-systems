<?php

namespace App\Modules\USG\Services;

use App\Models\Modules\USG\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class EventService
{
    /**
     * Get upcoming events
     */
    public function getUpcomingEvents(int $limit = 10): Collection
    {
        return Event::upcoming()
            ->published()
            ->with('creator')
            ->orderBy('start_date')
            ->limit($limit)
            ->get();
    }

    /**
     * Get events by month for calendar
     */
    public function getEventsByMonth(int $year, int $month): Collection
    {
        $startOfMonth = Carbon::create($year, $month, 1)->startOfMonth();
        $endOfMonth = Carbon::create($year, $month, 1)->endOfMonth();

        return Event::published()
            ->whereBetween('start_date', [$startOfMonth, $endOfMonth])
            ->orderBy('start_date')
            ->get();
    }

    /**
     * Get events by date range
     */
    public function getEventsByDateRange(Carbon $startDate, Carbon $endDate): Collection
    {
        return Event::published()
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
     * Search events with filters
     */
    public function searchEvents(string $query = '', array $filters = []): LengthAwarePaginator
    {
        $events = Event::published();

        if (! empty($query)) {
            $events->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%")
                    ->orWhere('location', 'like', "%{$query}%")
                    ->orWhere('organizer', 'like', "%{$query}%");
            });
        }

        if (isset($filters['category']) && ! empty($filters['category'])) {
            $events->where('category', $filters['category']);
        }

        if (isset($filters['date_from']) && ! empty($filters['date_from'])) {
            $events->where('start_date', '>=', $filters['date_from']);
        }

        if (isset($filters['date_to']) && ! empty($filters['date_to'])) {
            $events->where('end_date', '<=', $filters['date_to']);
        }

        if (isset($filters['location']) && ! empty($filters['location'])) {
            $events->where('location', 'like', "%{$filters['location']}%");
        }

        return $events->orderBy('start_date')->paginate(15);
    }

    /**
     * Create new event
     */
    public function create(array $data, int $createdBy): Event
    {
        $data['slug'] = $this->generateUniqueSlug($data['title']);
        $data['created_by'] = $createdBy;

        // Set end_date to start_date if not provided
        if (! isset($data['end_date']) || empty($data['end_date'])) {
            $data['end_date'] = $data['start_date'];
        }

        // Set default color if not provided
        if (! isset($data['color']) || empty($data['color'])) {
            $data['color'] = '#3b82f6'; // Default blue color
        }

        return Event::create($data);
    }

    /**
     * Update existing event
     */
    public function update(Event $event, array $data): Event
    {
        if (isset($data['title']) && $data['title'] !== $event->title) {
            $data['slug'] = $this->generateUniqueSlug($data['title'], $event->id);
        }

        // Set end_date to start_date if not provided
        if (! isset($data['end_date']) || empty($data['end_date'])) {
            $data['end_date'] = $data['start_date'];
        }

        $event->update($data);

        return $event->fresh();
    }

    /**
     * Publish event
     */
    public function publish(Event $event): Event
    {
        $event->update(['status' => 'published']);

        return $event->fresh();
    }

    /**
     * Cancel event
     */
    public function cancel(Event $event): Event
    {
        $event->update(['status' => 'cancelled']);

        return $event->fresh();
    }

    /**
     * Archive event
     */
    public function archive(Event $event): Event
    {
        $event->update(['status' => 'archived']);

        return $event->fresh();
    }

    /**
     * Delete event
     */
    public function delete(Event $event): bool
    {
        return $event->delete();
    }

    /**
     * Get past events
     */
    public function getPastEvents(int $perPage = 15): LengthAwarePaginator
    {
        return Event::past()
            ->published()
            ->with('creator')
            ->latest('start_date')
            ->paginate($perPage);
    }

    /**
     * Get events for today
     */
    public function getTodaysEvents(): Collection
    {
        $today = now()->startOfDay();
        $endOfDay = now()->endOfDay();

        return Event::published()
            ->where(function ($query) use ($today, $endOfDay) {
                $query->whereBetween('start_date', [$today, $endOfDay])
                    ->orWhere(function ($q) use ($today, $endOfDay) {
                        $q->where('start_date', '<=', $today)
                            ->where('end_date', '>=', $endOfDay);
                    });
            })
            ->orderBy('start_date')
            ->get();
    }

    /**
     * Get event categories
     */
    public function getCategories(): array
    {
        return Event::distinct('category')
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->pluck('category')
            ->sort()
            ->values()
            ->toArray();
    }

    /**
     * Get calendar data for frontend
     */
    public function getCalendarData(int $year, int $month): array
    {
        $events = $this->getEventsByMonth($year, $month);

        return $events->map(function ($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'start' => $event->start_date->toISOString(),
                'end' => $event->end_date->toISOString(),
                'allDay' => $event->all_day,
                'color' => $event->color,
                'url' => route('usg.events.show', $event->slug),
                'description' => $event->description,
                'location' => $event->location,
            ];
        })->toArray();
    }

    /**
     * Get event statistics
     */
    public function getStatistics(): array
    {
        return [
            'total' => Event::count(),
            'published' => Event::published()->count(),
            'upcoming' => Event::upcoming()->published()->count(),
            'this_month' => Event::published()
                ->whereMonth('start_date', now()->month)
                ->whereYear('start_date', now()->year)
                ->count(),
            'today' => $this->getTodaysEvents()->count(),
        ];
    }

    /**
     * Auto-archive past events
     */
    public function archivePastEvents(): int
    {
        $pastEvents = Event::where('end_date', '<', now()->subDays(30))
            ->where('status', 'published')
            ->get();

        foreach ($pastEvents as $event) {
            $event->update(['status' => 'archived']);
        }

        return $pastEvents->count();
    }

    /**
     * Generate unique slug
     */
    private function generateUniqueSlug(string $title, ?int $excludeId = null): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;

        while ($this->slugExists($slug, $excludeId)) {
            $slug = $originalSlug.'-'.$counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Check if slug exists
     */
    private function slugExists(string $slug, ?int $excludeId = null): bool
    {
        $query = Event::where('slug', $slug);

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->exists();
    }

    /**
     * Get events by organizer
     */
    public function getEventsByOrganizer(string $organizer): Collection
    {
        return Event::published()
            ->where('organizer', $organizer)
            ->orderBy('start_date', 'desc')
            ->get();
    }

    /**
     * Get recurring events
     */
    public function getRecurringEvents(): Collection
    {
        return Event::where('is_recurring', true)
            ->published()
            ->orderBy('start_date')
            ->get();
    }

    /**
     * Get events for calendar (alias for getEventsByDateRange)
     */
    public function getEventsForCalendar(Carbon $startDate, Carbon $endDate): Collection
    {
        return $this->getEventsByDateRange($startDate, $endDate);
    }

    /**
     * Get event by slug
     */
    public function getBySlug(string $slug): ?Event
    {
        return Event::published()
            ->with('creator')
            ->where('slug', $slug)
            ->first();
    }

    /**
     * Get related events
     */
    public function getRelatedEvents(Event $event, int $limit = 3): Collection
    {
        return Event::published()
            ->where('id', '!=', $event->id)
            ->where('category', $event->category)
            ->with('creator')
            ->orderBy('start_date')
            ->limit($limit)
            ->get();
    }

    /**
     * Get pending events (draft status)
     */
    public function getPendingEvents(int $limit = 10): Collection
    {
        return Event::where('status', 'draft')
            ->with('creator')
            ->latest('created_at')
            ->limit($limit)
            ->get();
    }

    /**
     * Find event by slug
     */
    public function findBySlug(string $slug): ?Event
    {
        return Event::where('slug', $slug)
            ->with('creator')
            ->first();
    }

    /**
     * Get all events paginated (for admin)
     */
    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Event::with('creator')
            ->latest('created_at')
            ->paginate($perPage);
    }

    /**
     * Get event by ID
     */
    public function getById(int $id): ?Event
    {
        return Event::with('creator')
            ->find($id);
    }
}
