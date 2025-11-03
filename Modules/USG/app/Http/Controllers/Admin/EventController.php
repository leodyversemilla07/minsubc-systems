<?php

namespace Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Inertia\Response;
use Modules\USG\Http\Requests\StoreEventRequest;
use Modules\USG\Http\Requests\UpdateEventRequest;
use Modules\USG\Services\EventService;

class EventController extends Controller
{
    public function __construct(private EventService $eventService) {}

    public function index(Request $request): Response
    {
        $filters = [
            'search' => $request->get('search'),
            'category' => $request->get('category'),
            'status' => $request->get('status'),
            'month' => $request->get('month'),
        ];

        $events = $this->eventService->getPaginatedWithFilters($filters);

        // Transform events for frontend
        $transformedEvents = $events->getCollection()->map(function ($event) {
            return $this->eventService->transformEventForFrontend($event);
        });

        // Create new paginator with transformed data
        $transformedPaginator = new LengthAwarePaginator(
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
            'filters' => $filters,
            'canManage' => $request->user()->hasAnyRole(['usg-officer', 'usg-admin', 'super-admin']),
        ]);
    }

    public function create(): Response
    {
        $categories = $this->eventService->getCategories();

        return Inertia::render('usg/admin/events/create', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreEventRequest $request): RedirectResponse
    {
        $event = $this->eventService->create(
            $request->validated(),
            $request->user()->id
        );

        return redirect()
            ->route('usg.admin.events.index')
            ->with('success', 'Event created successfully.');
    }

    public function show(int $id): Response
    {
        $event = $this->eventService->getById($id);

        return Inertia::render('usg/admin/events/show', [
            'event' => $event,
        ]);
    }

    public function edit(int $id): Response
    {
        $event = $this->eventService->getById($id);
        $categories = $this->eventService->getCategories();

        return Inertia::render('usg/admin/events/edit', [
            'event' => $event,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateEventRequest $request, int $id): RedirectResponse
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

    public function destroy(int $id): RedirectResponse
    {
        $event = $this->eventService->getById($id);
        $this->eventService->delete($event);

        return redirect()
            ->route('usg.admin.events.index')
            ->with('success', 'Event deleted successfully.');
    }

    public function publish(int $id): RedirectResponse
    {
        $event = $this->eventService->getById($id);
        $this->eventService->publish($event);

        return back()->with('success', 'Event published successfully.');
    }

    public function cancel(int $id): RedirectResponse
    {
        $event = $this->eventService->getById($id);
        $this->eventService->cancel($event);

        return back()->with('success', 'Event cancelled successfully.');
    }

    public function archive(int $id): RedirectResponse
    {
        $event = $this->eventService->getById($id);
        $this->eventService->archive($event);

        return back()->with('success', 'Event archived successfully.');
    }
}
