<?php

namespace Modules\USG\Services;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Modules\USG\Models\Event;

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
     * Get all upcoming published events (for iCal export)
     */
    public function getUpcomingPublishedEvents(): Collection
    {
        return Event::upcoming()
            ->published()
            ->orderBy('start_date')
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

        return $event;
    }

    /**
     * Publish event
     */
    public function publish(Event $event): Event
    {
        $event->update(['status' => 'published']);

        return $event;
    }

    /**
     * Cancel event
     */
    public function cancel(Event $event): Event
    {
        $event->update(['status' => 'cancelled']);

        return $event;
    }

    /**
     * Archive event
     */
    public function archive(Event $event): Event
    {
        $event->update(['status' => 'archived']);

        return $event;
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
     *
     * @return array<int, array{
     *     id: int,
     *     title: string,
     *     start: string,
     *     end: string,
     *     allDay: bool,
     *     color: string,
     *     url: string,
     *     description: string|null,
     *     location: string|null
     * }>
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

    /**
     * Get paginated events with filters for admin
     */
    public function getPaginatedWithFilters(array $filters = []): LengthAwarePaginator
    {
        $query = Event::with('creator');

        // Apply search filter
        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('organizer', 'like', "%{$search}%");
            });
        }

        // Apply category filter
        if (! empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        // Apply status filter
        if (! empty($filters['status'])) {
            $statusMapping = [
                'scheduled' => 'published',
                'ongoing' => 'published',
                'completed' => 'published',
                'cancelled' => 'cancelled',
            ];
            if (isset($statusMapping[$filters['status']])) {
                $query->where('status', $statusMapping[$filters['status']]);
            }
        }

        // Apply month filter
        if (! empty($filters['month'])) {
            [$year, $monthNum] = explode('-', $filters['month']);
            $query->whereYear('start_date', $year)
                ->whereMonth('start_date', $monthNum);
        }

        return $query->latest('created_at')->paginate(15);
    }

    /**
     * Transform event for frontend display
     *
     * @return array{
     *     id: int,
     *     title: string,
     *     description: string|null,
     *     date: string,
     *     time: string|null,
     *     end_time: string|null,
     *     location: string|null,
     *     category: string|null,
     *     max_attendees: int|null,
     *     registration_required: bool,
     *     registration_deadline: string|null,
     *     status: string,
     *     organizer: string|null,
     *     created_at: string,
     *     updated_at: string,
     *     attendees_count: int
     * }
     */
    public function transformEventForFrontend(Event $event): array
    {
        return [
            'id' => $event->id,
            'title' => $event->title,
            'description' => $event->description,
            'date' => $event->start_date->toDateString(),
            'time' => $event->all_day ? null : $event->start_date->format('H:i:s'),
            'end_time' => $event->all_day ? null : ($event->end_date ? $event->end_date->format('H:i:s') : null),
            'location' => $event->location,
            'category' => $event->category,
            'max_attendees' => null, // Not implemented yet
            'registration_required' => false, // Not implemented yet
            'registration_deadline' => null, // Not implemented yet
            'status' => $this->mapBackendStatusToFrontend($event),
            'organizer' => $event->organizer,
            'created_at' => $event->created_at->toISOString(),
            'updated_at' => $event->updated_at->toISOString(),
            'attendees_count' => 0, // Not implemented yet
        ];
    }

    /**
     * Map backend status to frontend status
     */
    private function mapBackendStatusToFrontend(Event $event): string
    {
        switch ($event->status) {
            case 'published':
                // Check if event is upcoming, ongoing, or completed
                if ($event->start_date->isFuture()) {
                    return 'scheduled';
                } elseif ($event->start_date->isPast() && ($event->end_date ? $event->end_date->isFuture() : true)) {
                    return 'ongoing';
                } else {
                    return 'completed';
                }
            case 'cancelled':
                return 'cancelled';
            case 'draft':
                return 'scheduled'; // Draft events are considered scheduled
            case 'archived':
                return 'completed'; // Archived events are considered completed
            default:
                return 'scheduled';
        }
    }
}
