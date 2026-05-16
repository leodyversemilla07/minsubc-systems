<?php

namespace Modules\Scheduling\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Scheduling\Models\CalendarEvent;
use Modules\Scheduling\Models\Booking;
use Modules\Scheduling\Models\AcademicSchedule;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'upcoming_events' => CalendarEvent::where('start_datetime', '>=', now())->count(),
            'today_events' => CalendarEvent::whereDate('start_datetime', today())->count(),
            'total_bookings' => Booking::count(),
            'confirmed_bookings' => Booking::where('status', 'confirmed')->count(),
        ];
        $upcomingEvents = CalendarEvent::with('organizer')
            ->where('start_datetime', '>=', now())
            ->latest('start_datetime')->take(10)->get();
        $academicSchedules = AcademicSchedule::where('start_date', '>=', now())
            ->orWhere('end_date', '>=', now())
            ->orderBy('start_date')->take(5)->get();
        return inertia('scheduling/admin/dashboard', compact('stats', 'upcomingEvents', 'academicSchedules'));
    }
}