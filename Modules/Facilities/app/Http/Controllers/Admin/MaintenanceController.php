<?php

namespace Modules\Facilities\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Facilities\Models\MaintenanceRequest;

class MaintenanceController extends Controller
{
    public function index()
    {
        $requests = MaintenanceRequest::with('facility', 'equipment')
            ->latest()->paginate(10);
        return inertia('facilities/admin/maintenance/index', compact('requests'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'facility_id' => 'nullable|exists:fac_facilities,id',
            'equipment_id' => 'nullable|exists:fac_equipment,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high,critical',
        ]);
        $validated['requested_by'] = auth()->id();
        MaintenanceRequest::create($validated);
        return redirect()->route('facilities.admin.maintenance.index')
            ->with('success', 'Maintenance request created.');
    }

    public function update(Request $request, MaintenanceRequest $maintenance)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,in-progress,completed,cancelled',
            'assigned_to' => 'nullable|exists:users,id',
            'scheduled_date' => 'nullable|date',
            'completed_date' => 'nullable|date',
            'cost' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);
        $maintenance->update($validated);
        return back()->with('success', 'Maintenance request updated.');
    }
}