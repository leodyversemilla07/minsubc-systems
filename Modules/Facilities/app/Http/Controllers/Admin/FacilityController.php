<?php

namespace Modules\Facilities\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Facilities\Models\Facility;

class FacilityController extends Controller
{
    public function index()
    {
        $facilities = Facility::withCount('reservations')->latest()->paginate(10);
        return inertia('facilities/admin/facilities/index', compact('facilities'));
    }

    public function create()
    {
        return inertia('facilities/admin/facilities/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:fac_facilities,code',
            'type' => 'required|string|max:50',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'capacity' => 'nullable|integer|min:1',
            'building' => 'nullable|string|max:255',
            'floor' => 'nullable|string|max:50',
            'amenities' => 'nullable|array',
            'rules' => 'nullable|string',
            'operating_hours' => 'nullable|string|max:255',
            'is_available' => 'boolean',
        ]);
        Facility::create($validated);
        return redirect()->route('facilities.admin.facilities.index')
            ->with('success', 'Facility created.');
    }

    public function show(Facility $facility)
    {
        $facility->load(['reservations.user', 'equipment']);
        return inertia('facilities/admin/facilities/show', compact('facility'));
    }

    public function edit(Facility $facility)
    {
        return inertia('facilities/admin/facilities/edit', compact('facility'));
    }

    public function update(Request $request, Facility $facility)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:fac_facilities,code,' . $facility->id,
            'type' => 'required|string|max:50',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'capacity' => 'nullable|integer|min:1',
            'building' => 'nullable|string|max:255',
            'floor' => 'nullable|string|max:50',
            'amenities' => 'nullable|array',
            'rules' => 'nullable|string',
            'operating_hours' => 'nullable|string|max:255',
            'is_available' => 'boolean',
        ]);
        $facility->update($validated);
        return redirect()->route('facilities.admin.facilities.index')
            ->with('success', 'Facility updated.');
    }

    public function destroy(Facility $facility)
    {
        $facility->delete();
        return redirect()->route('facilities.admin.facilities.index')
            ->with('success', 'Facility deleted.');
    }
}