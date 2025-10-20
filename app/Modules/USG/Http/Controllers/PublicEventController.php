<?php

namespace App\Modules\USG\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\USG\Services\EventService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicEventController extends Controller
{
    public function __construct(private EventService $eventService) {}

    public function index(Request $request)
    {
        $view = $request->get('view', 'calendar'); // calendar or list

        if ($view === 'list') {
            $events = $this->eventService->getUpcomingEvents(12);
        } else {
            $start = Carbon::parse($request->get('start', now()->startOfMonth()));
            $end = Carbon::parse($request->get('end', now()->endOfMonth()));
            $events = $this->eventService->getEventsForCalendar($start, $end);
        }

        $categories = $this->eventService->getCategories();

        return Inertia::render('usg/public/events/index', [
            'events' => $events,
            'categories' => $categories,
            'view' => $view,
        ]);
    }

    public function calendar()
    {
        return $this->index(request()->merge(['view' => 'calendar']));
    }

    public function show(string $slug)
    {
        $event = $this->eventService->getBySlug($slug);

        if (! $event) {
            abort(404, 'Event not found');
        }

        $related = $this->eventService->getRelatedEvents($event, 3);

        return Inertia::render('usg/public/events/show', [
            'event' => $event,
            'related' => $related,
        ]);
    }
}
