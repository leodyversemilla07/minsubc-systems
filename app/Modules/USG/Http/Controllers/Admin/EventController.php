<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Modules\USG\Models\Event;
use App\Modules\USG\Services\EventService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    public function __construct(private EventService $eventService) {}

    public function index(Request $request)
    {
        $search = $request->get('search');
        $category = $request->get('category');
        $status = $request->get('status');
        $month = $request->get('month');

        $query = Event::with('creator');

        // Apply filters
        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('organizer', 'like', "%{$search}%");
            });
        }

        if (! empty($category)) {
            $query->where('category', $category);
        }

        if (! empty($status)) {
            // Map frontend status to backend status
            $statusMapping = [
                'scheduled' => 'published',
                'ongoing' => 'published', // We'll handle this in frontend logic
                'completed' => 'published', // We'll handle this in frontend logic
                'cancelled' => 'cancelled',
            ];
            if (isset($statusMapping[$status])) {
                $query->where('status', $statusMapping[$status]);
            }
        }

        if (! empty($month)) {
            [$year, $monthNum] = explode('-', $month);
            $query->whereYear('start_date', $year)
                ->whereMonth('start_date', $monthNum);
        }

        $events = $query->latest('created_at')->paginate(15);

        // Transform events for frontend
        $transformedEvents = $events->getCollection()->map(function ($event) {
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
        });

        // Create new paginator with transformed data
        $transformedPaginator = new \Illuminate\Pagination\LengthAwarePaginator(
            $transformedEvents,
            $events->total(),
            $events->perPage(),
            $events->currentPage(),
            ['path' => $events->path(), 'pageName' => $events->getPageName()]
        );

        $categories = $this->eventService->getCategories();

        return Inertia::render('usg/admin/events/index', [
            'events' => $transformedPaginator,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $category,
                'status' => $status,
                'month' => $month,
            ],
            'canManage' => true, // Add permission check if needed
        ]);
    }

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

    public function create()
    {
        $categories = $this->eventService->getCategories();

        return Inertia::render('usg/admin/events/create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $event = $this->eventService->create(
            $request->validated(),
            Auth::id()
        );

        return redirect()
            ->route('usg.admin.events.index')
            ->with('success', 'Event created successfully.');
    }

    public function show(int $id)
    {
        $event = $this->eventService->getById($id);

        return Inertia::render('usg/admin/events/show', [
            'event' => $event,
        ]);
    }

    public function edit(int $id)
    {
        $event = $this->eventService->getById($id);
        $categories = $this->eventService->getCategories();

        return Inertia::render('usg/admin/events/edit', [
            'event' => $event,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, int $id)
    {
        $event = $this->eventService->getById($id);

        $this->eventService->update(
            $event,
            $request->validated()
        );

        return redirect()
            ->route('usg.admin.events.index')
            ->with('success', 'Event updated successfully.');
    }

    public function destroy(int $id)
    {
        $event = $this->eventService->getById($id);
        $this->eventService->delete($event);

        return redirect()
            ->route('usg.admin.events.index')
            ->with('success', 'Event deleted successfully.');
    }

    public function publish(int $id)
    {
        $event = $this->eventService->getById($id);
        $this->eventService->publish($event);

        return back()->with('success', 'Event published successfully.');
    }

    public function cancel(int $id)
    {
        $event = $this->eventService->getById($id);
        $this->eventService->cancel($event);

        return back()->with('success', 'Event cancelled successfully.');
    }

    public function archive(int $id)
    {
        $event = $this->eventService->getById($id);
        $this->eventService->archive($event);

        return back()->with('success', 'Event archived successfully.');
    }
}
