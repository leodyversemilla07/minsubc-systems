<?php

namespace Modules\Dormitory\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Dormitory\Models\DormRoom;
use Modules\Dormitory\Models\DormHall;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = DormRoom::with('hall')->withCount('beds')->latest()->paginate(15);
        $halls = DormHall::where('is_active', true)->get();
        return inertia('dormitory/admin/rooms/index', compact('rooms', 'halls'));
    }
    public function store(Request $request)
    {
        DormRoom::create($request->validate([
            'hall_id' => 'required|exists:drm_halls,id',
            'room_number' => 'required|string|max:20',
            'floor' => 'integer|min:1',
            'room_type' => 'required|string',
            'capacity' => 'integer|min:1',
            'beds_count' => 'integer|min:1',
        ]));
        return redirect()->route('dormitory.admin.rooms.index');
    }
}