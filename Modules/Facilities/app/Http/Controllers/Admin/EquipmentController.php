<?php

namespace Modules\Facilities\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Facilities\Models\Equipment;

class EquipmentController extends Controller
{
    public function index()
    {
        $equipment = Equipment::with('facility')->latest()->paginate(10);
        return inertia('facilities/admin/equipment/index', compact('equipment'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'facility_id' => 'required|exists:fac_facilities,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:fac_equipment,code',
            'description' => 'nullable|string',
            'quantity' => 'required|integer|min:1',
            'condition' => 'required|string|max:50',
            'purchase_date' => 'nullable|date',
            'last_maintenance' => 'nullable|date',
        ]);
        $validated['available_quantity'] = $validated['quantity'];
        Equipment::create($validated);
        return redirect()->route('facilities.admin.equipment.index')
            ->with('success', 'Equipment added.');
    }

    public function update(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'facility_id' => 'required|exists:fac_facilities,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:fac_equipment,code,' . $equipment->id,
            'description' => 'nullable|string',
            'quantity' => 'required|integer|min:1',
            'available_quantity' => 'required|integer|min:0|lte:quantity',
            'condition' => 'required|string|max:50',
            'purchase_date' => 'nullable|date',
            'last_maintenance' => 'nullable|date',
            'status' => 'required|string|max:50',
        ]);
        $equipment->update($validated);
        return redirect()->route('facilities.admin.equipment.index')
            ->with('success', 'Equipment updated.');
    }

    public function destroy(Equipment $equipment)
    {
        $equipment->delete();
        return back()->with('success', 'Equipment deleted.');
    }
}