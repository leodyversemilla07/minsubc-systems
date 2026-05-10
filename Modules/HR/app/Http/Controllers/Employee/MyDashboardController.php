<?php

namespace Modules\HR\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\HR\Models\Attendance;
use Modules\HR\Models\Employee;
use Modules\HR\Models\LeaveRequest;
use Modules\HR\Models\LeaveType;
use Modules\HR\Models\Evaluation;

class MyDashboardController extends Controller
{
    public function index(): InertiaResponse
    {
        $employee = Employee::where('user_id', auth()->id())->with(['department', 'position'])->firstOrFail();
        $todayAttendance = Attendance::where('employee_id', $employee->id)->whereDate('date', today())->first();
        $recentLeaves = LeaveRequest::where('employee_id', $employee->id)->latest()->take(5)->get();
        $recentEvaluations = Evaluation::where('employee_id', $employee->id)->latest()->take(5)->get();

        $attendanceStats = [
            'present' => Attendance::where('employee_id', $employee->id)->where('status', 'present')->count(),
            'late' => Attendance::where('employee_id', $employee->id)->where('status', 'late')->count(),
            'absent' => Attendance::where('employee_id', $employee->id)->where('status', 'absent')->count(),
        ];

        return inertia('hr/employee/dashboard', compact('employee', 'todayAttendance', 'recentLeaves', 'recentEvaluations', 'attendanceStats'));
    }

    public function attendance(): InertiaResponse
    {
        $employee = Employee::where('user_id', auth()->id())->firstOrFail();
        $attendance = Attendance::where('employee_id', $employee->id)
            ->latest('date')
            ->paginate(30);
        return inertia('hr/employee/attendance', compact('employee', 'attendance'));
    }

    public function timeIn(Request $request): RedirectResponse
    {
        $employee = Employee::where('user_id', auth()->id())->firstOrFail();
        $existing = Attendance::where('employee_id', $employee->id)->whereDate('date', today())->first();

        if ($existing) {
            return redirect()->back()->with('error', 'Already timed in today.');
        }

        Attendance::create([
            'employee_id' => $employee->id,
            'date' => today(),
            'time_in' => now(),
            'status' => now()->format('H:i') > '08:15' ? 'late' : 'present',
        ]);

        return redirect()->back()->with('success', 'Timed in successfully.');
    }

    public function timeOut(Request $request): RedirectResponse
    {
        $employee = Employee::where('user_id', auth()->id())->firstOrFail();
        $attendance = Attendance::where('employee_id', $employee->id)->whereDate('date', today())->first();

        if (!$attendance) {
            return redirect()->back()->with('error', 'No time-in record found for today.');
        }

        if ($attendance->time_out) {
            return redirect()->back()->with('error', 'Already timed out today.');
        }

        $attendance->update(['time_out' => now()]);

        return redirect()->back()->with('success', 'Timed out successfully.');
    }

    public function leaveRequests(): InertiaResponse
    {
        $employee = Employee::where('user_id', auth()->id())->firstOrFail();
        $leaveTypes = LeaveType::where('is_active', true)->get();
        $leaves = LeaveRequest::where('employee_id', $employee->id)->with('leaveType')->latest()->paginate(10);
        return inertia('hr/employee/leave', compact('employee', 'leaveTypes', 'leaves'));
    }

    public function submitLeave(Request $request): RedirectResponse
    {
        $employee = Employee::where('user_id', auth()->id())->firstOrFail();
        $validated = $request->validate([
            'leave_type_id' => 'required|exists:hr_leave_types,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string|max:1000',
        ]);

        $validated['employee_id'] = $employee->id;
        $validated['total_days'] = now()->parse($validated['start_date'])->diffInDays(now()->parse($validated['end_date'])) + 1;
        $validated['leave_code'] = 'LV-' . now()->format('Y') . '-' . str_pad(LeaveRequest::max('id') ?? 0 + 1, 5, '0', STR_PAD_LEFT);
        $validated['status'] = 'pending';

        LeaveRequest::create($validated);

        return redirect()->route('hr.my.leave.requests')
            ->with('success', 'Leave request submitted.');
    }

    public function evaluations(): InertiaResponse
    {
        $employee = Employee::where('user_id', auth()->id())->firstOrFail();
        $evaluations = Evaluation::where('employee_id', $employee->id)->with('evaluator')->latest()->paginate(10);
        return inertia('hr/employee/evaluations', compact('employee', 'evaluations'));
    }
}