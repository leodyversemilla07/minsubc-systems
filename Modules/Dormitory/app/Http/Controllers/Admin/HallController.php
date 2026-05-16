<?php

namespace Modules\Dormitory\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Dormitory\Models\DormHall;
use Illuminate\Http\Request;

class HallController extends Controller
{
    public function index()
    {
        $halls = DormHall::withCount('rooms')->latest()->paginate(10);
        return inertia('dormitory/admin/halls/index', compact('halls'));
    }
    public function store(Request $request)
    {
        DormHall::create($request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:drm_halls',
            'address' => 'nullable|string',
            'floors' => 'integer|min:1',
            'gender' => 'required|in:male,female,coed',
            'warden_name' => 'nullable|string',
            'warden_phone' => 'nullable|string',
        ]));
        return redirect()->route('dormitory.admin.halls.index');
    }
    public function update(Request $request, DormHall $hall)
    {
        $hall->update($request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:drm_halls,code,' . $hall->id,
            'address' => 'nullable|string',
            'floors' => 'integer|min:1',
            'gender' => 'required|in:male,female,coed',
            'warden_name' => 'nullable|string',
            'warden_phone' => 'nullable|string',
            'is_active' => 'boolean',
        ]));
        return redirect()->route('dormitory.admin.halls.index');
    }
    public function destroy(DormHall $hall)
    {
        $hall->delete();
        return redirect()->route('dormitory.admin.halls.index');
    }
}