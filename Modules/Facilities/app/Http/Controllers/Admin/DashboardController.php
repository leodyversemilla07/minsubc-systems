<?php

namespace Modules\Facilities\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Facilities\Models\Facility;
use Modules\Facilities\Models\Reservation;
use Modules\Facilities\Models\Equipment;
use Modules\Facilities\Models\MaintenanceRequest;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_facilities' => Facility::count(),
            'available_facilities' => Facility::where('is_available', true)->count(),
            'pending_reservations' => Reservation::where('status', 'pending')->count(),
            'active_reservations' => Reservation::where('status', 'approved')->where('end_time', '>=', now())->count(),
            'equipment_count' => Equipment::sum('quantity'),
            'pending_maintenance' => MaintenanceRequest::where('status', 'pending')->count(),
        ];
        $recentReservations = Reservation::with('facility', 'user')
            ->latest()->take(5)->get();
        return inertia('facilities/admin/dashboard', compact('stats', 'recentReservations'));
    }
}