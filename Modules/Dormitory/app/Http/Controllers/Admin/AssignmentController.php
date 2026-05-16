<?php

namespace Modules\Dormitory\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Dormitory\Models\DormAssignment;
use Modules\Dormitory\Models\DormBed;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function index()
    {
        $assignments = DormAssignment::with('bed.room.hall', 'student')->latest()->paginate(15);
        $beds = DormBed::with('room.hall')->where('is_occupied', false)->where('is_active', true)->get();
        return inertia('dormitory/admin/assignments/index', compact('assignments', 'beds'));
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'bed_id' => 'required|exists:drm_beds,id',
            'student_id' => 'required|exists:students,student_id',
            'checkin_date' => 'required|date',
            'fee_per_semester' => 'numeric|min:0',
        ]);
        $validated['status'] = 'active';
        DormAssignment::create($validated);
        DormBed::where('id', $validated['bed_id'])->update(['is_occupied' => true]);
        return redirect()->route('dormitory.admin.assignments.index');
    }
    public function checkout(DormAssignment $assignment)
    {
        $assignment->update(['checkout_date' => now(), 'status' => 'checked_out']);
        DormBed::where('id', $assignment->bed_id)->update(['is_occupied' => false]);
        return back();
    }
}