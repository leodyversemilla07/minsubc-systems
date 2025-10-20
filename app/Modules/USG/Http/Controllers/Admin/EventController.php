<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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

        if ($search || $category) {
            $events = $this->eventService->searchEvents($search ?? '', [
                'category' => $category,
            ]);
        } else {
            $events = $this->eventService->getAllPaginated(15);
        }

        $categories = $this->eventService->getCategories();
        $statistics = $this->eventService->getStatistics();

        return Inertia::render('usg/admin/events/index', [
            'events' => $events,
            'categories' => $categories,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
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
