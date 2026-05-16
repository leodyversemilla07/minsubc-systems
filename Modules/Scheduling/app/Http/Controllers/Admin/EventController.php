<?php

namespace Modules\Scheduling\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Scheduling\Models\CalendarEvent;

class EventController extends Controller
{
    public function index()
    {
        $events = CalendarEvent::with('organizer', 'bookings')
            ->latest()->paginate(10);
        return inertia('scheduling/admin/events/index', compact('events'));
    }

    public function create()
    {
        return inertia('scheduling/admin/events/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_type' => 'required|string|max:50',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',
            'all_day' => 'boolean',
            'location' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:7',
            'is_public' => 'boolean',
            'max_participants' => 'nullable|integer|min:1',
        ]);
        $validated['organizer_id'] = auth()->id();
        $validated['status'] = 'scheduled';
        CalendarEvent::create($validated);
        return redirect()->route('scheduling.admin.events.index')
            ->with('success', 'Event created.');
    }

    public function show(CalendarEvent $event)
    {
        $event->load('organizer', 'bookings.user');
        return inertia('scheduling/admin/events/show', compact('event'));
    }

    public function edit(CalendarEvent $event)
    {
        return inertia('scheduling/admin/events/edit', compact('event'));
    }

    public function update(Request $request, CalendarEvent $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_type' => 'required|string|max:50',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',
            'all_day' => 'boolean',
            'location' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:7',
            'is_public' => 'boolean',
            'status' => 'required|string|max:50',
            'max_participants' => 'nullable|integer|min:1',
        ]);
        $event->update($validated);
        return redirect()->route('scheduling.admin.events.index')
            ->with('success', 'Event updated.');
    }

    public function destroy(CalendarEvent $event)
    {
        $event->delete();
        return redirect()->route('scheduling.admin.events.index')
            ->with('success', 'Event deleted.');
    }
}