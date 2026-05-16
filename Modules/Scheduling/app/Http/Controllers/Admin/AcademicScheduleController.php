<?php

namespace Modules\Scheduling\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Scheduling\Models\AcademicSchedule;
use Illuminate\Http\Request;

class AcademicScheduleController extends Controller
{
    public function index()
    {
        $schedules = AcademicSchedule::orderBy('start_date')->paginate(12);
        return inertia('scheduling/admin/academic-schedules/index', compact('schedules'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'academic_year' => 'required|string|max:20',
            'term' => 'required|string|max:50',
            'event_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'is_holiday' => 'boolean',
            'description' => 'nullable|string',
        ]);
        AcademicSchedule::create($validated);
        return redirect()->route('scheduling.admin.academic-schedules.index')
            ->with('success', 'Academic schedule added.');
    }

    public function update(Request $request, AcademicSchedule $academicSchedule)
    {
        $validated = $request->validate([
            'academic_year' => 'required|string|max:20',
            'term' => 'required|string|max:50',
            'event_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'is_holiday' => 'boolean',
            'description' => 'nullable|string',
        ]);
        $academicSchedule->update($validated);
        return redirect()->route('scheduling.admin.academic-schedules.index')
            ->with('success', 'Academic schedule updated.');
    }

    public function destroy(AcademicSchedule $academicSchedule)
    {
        $academicSchedule->delete();
        return back()->with('success', 'Entry deleted.');
    }
}