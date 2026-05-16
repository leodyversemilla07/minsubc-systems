<?php

namespace Modules\Dormitory\Services;

use Modules\Dormitory\Models\DormHall;
use Modules\Dormitory\Models\DormRoom;
use Modules\Dormitory\Models\DormAssignment;

class DormitoryService
{
    public function getStats(): array
    {
        return [
            'halls' => DormHall::count(),
            'rooms' => DormRoom::count(),
            'occupied_beds' => DormAssignment::whereNull('checkout_date')->count(),
            'total_capacity' => DormRoom::sum('capacity'),
            'pending_maintenance' => \Modules\Dormitory\Models\DormMaintenanceRequest::where('status', 'pending')->count(),
        ];
    }

    public function getOccupancyRate(): float
    {
        $total = DormRoom::sum('capacity');
        if ($total === 0) return 0;
        return round((DormAssignment::whereNull('checkout_date')->count() / $total) * 100, 1);
    }
}