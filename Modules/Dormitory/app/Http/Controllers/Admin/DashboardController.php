<?php

namespace Modules\Dormitory\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Dormitory\Models\DormAssignment;
use Modules\Dormitory\Services\DormitoryService;

class DashboardController extends Controller
{
    public function __construct(private DormitoryService $service) {}
    public function index()
    {
        $stats = $this->service->getStats();
        $stats['occupancy_rate'] = $this->service->getOccupancyRate();
        $recentCheckins = DormAssignment::with('bed.room.hall', 'student')
            ->latest()->take(10)->get();
        return inertia('dormitory/admin/dashboard', compact('stats', 'recentCheckins'));
    }
}