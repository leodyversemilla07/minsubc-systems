<?php

namespace Modules\Dormitory\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Dormitory\Models\DormMaintenanceRequest;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    public function index()
    {
        $requests = DormMaintenanceRequest::with('room.hall', 'reporter', 'assignee')->latest()->paginate(15);
        return inertia('dormitory/admin/maintenance/index', compact('requests'));
    }
    public function store(Request $request)
    {
        DormMaintenanceRequest::create(array_merge($request->validate([
            'room_id' => 'required|exists:drm_rooms,id',
            'issue_type' => 'required|string',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high,urgent',
        ]), ['reported_by' => auth()->id()]));
        return redirect()->route('dormitory.admin.maintenance.index');
    }
    public function resolve(DormMaintenanceRequest $req)
    {
        $req->update(['status' => 'resolved', 'resolved_at' => now(), 'assigned_to' => auth()->id()]);
        return back();
    }
}