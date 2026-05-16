<?php

namespace Modules\Dormitory\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Dormitory\Models\DormHall;
use Modules\Dormitory\Models\DormRoom;

class ReportController extends Controller
{
    public function index()
    {
        $halls = DormHall::withCount('rooms')->get();
        $occupancy = DormRoom::selectRaw('hall_id, sum(capacity) as total_capacity,
            (select count(*) from drm_assignments a join drm_beds b on a.bed_id = b.id
             where b.room_id = drm_rooms.id and a.checkout_date is null) as occupied')
            ->groupBy('hall_id')->get();
        return inertia('dormitory/admin/reports/index', compact('halls', 'occupancy'));
    }
}