<?php

namespace Modules\Alumni\Http\Controllers;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Alumni\Models\AlumniEvent;
use Modules\Alumni\Models\Alumnus;

class AlumniController extends Controller
{
    public function index()
    {
        return Inertia::render('alumni/index');
    }

    public function directory()
    {
        $alumni = Alumnus::where('is_verified', true)
            ->select('id', 'first_name', 'last_name', 'graduation_year', 'degree_program', 'college', 'is_employed', 'photo_url')
            ->orderBy('last_name')
            ->paginate(20);
        return Inertia::render('alumni/directory', ['alumni' => $alumni]);
    }

    public function events()
    {
        $events = AlumniEvent::where('is_public', true)
            ->where('status', 'upcoming')
            ->orderBy('event_date')
            ->paginate(12);
        return Inertia::render('alumni/events/index', ['events' => $events]);
    }

    public function eventShow(AlumniEvent $event)
    {
        return Inertia::render('alumni/events/show', ['event' => $event->loadCount('participants')]);
    }
}