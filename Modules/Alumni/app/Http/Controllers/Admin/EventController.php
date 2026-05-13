<?php

namespace Modules\Alumni\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Alumni\Models\AlumniEvent;
use Modules\Alumni\Models\EventParticipant;

class EventController extends Controller
{
    public function index()
    {
        $events = AlumniEvent::withCount('participants')->orderBy('event_date', 'desc')->paginate(15);
        return Inertia::render('alumni/admin/events/index', ['events' => $events]);
    }

    public function create()
    {
        return Inertia::render('alumni/admin/events/create');
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:alm_events,slug',
            'description' => 'nullable|string',
            'event_type' => 'required|string',
            'event_date' => 'required|date',
            'location' => 'nullable|string',
            'max_participants' => 'nullable|integer|min:1',
            'registration_fee' => 'nullable|numeric|min:0',
        ]);
        AlumniEvent::create($validated);
        return redirect()->route('alumni.admin.events.index')->with('success', 'Event created.');
    }

    public function show(AlumniEvent $event)
    {
        $event->load('participants.alumnus');
        return Inertia::render('alumni/admin/events/show', ['event' => $event]);
    }

    public function edit(AlumniEvent $event)
    {
        return Inertia::render('alumni/admin/events/edit', ['event' => $event]);
    }

    public function update(\Illuminate\Http\Request $request, AlumniEvent $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_type' => 'required|string',
            'event_date' => 'required|date',
            'location' => 'nullable|string',
            'max_participants' => 'nullable|integer|min:1',
            'status' => 'required|string',
        ]);
        $event->update($validated);
        return redirect()->route('alumni.admin.events.index')->with('success', 'Event updated.');
    }

    public function destroy(AlumniEvent $event)
    {
        $event->delete();
        return redirect()->route('alumni.admin.events.index')->with('success', 'Event deleted.');
    }
}