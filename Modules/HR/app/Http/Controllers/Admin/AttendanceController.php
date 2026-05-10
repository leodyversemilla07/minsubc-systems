<?php

namespace Modules\HR\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\HR\Models\Attendance;
use Modules\HR\Models\Employee;
use Modules\HR\Models\Department;

class AttendanceController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $query = Attendance::with('employee:id,employee_id,first_name,last_name,department_id');

        if ($request->date) {
            $query->whereDate('date', $request->date);
        } else {
            $query->whereDate('date', today());
        }

        if ($request->department) {
            $query->whereHas('employee', fn ($q) => $q->where('department_id', $request->department));
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $attendance = $query->latest('date')->paginate(20)->withQueryString();

        $summary = [
            'present' => Attendance::whereDate('date', $request->date ?? today())->where('status', 'present')->count(),
            'late' => Attendance::whereDate('date', $request->date ?? today())->where('status', 'late')->count(),
            'absent' => Attendance::whereDate('date', $request->date ?? today())->where('status', 'absent')->count(),
            'on_leave' => Attendance::whereDate('date', $request->date ?? today())->where('status', 'leave')->count(),
        ];

        $departments = Department::where('is_active', true)->get(['id', 'name']);

        return inertia('hr/admin/attendance/index', [
            'attendance' => $attendance,
            'departments' => $departments,
            'summary' => $summary,
            'filters' => $request->only(['date', 'department', 'status']),
        ]);
    }

    public function employeeAttendance(Employee $employee, Request $request): InertiaResponse
    {
        $attendance = Attendance::where('employee_id', $employee->id)
            ->when($request->month, fn ($q, $m) => $q->whereMonth('date', Carbon::parse($m)->month)->whereYear('date', Carbon::parse($m)->year))
            ->latest('date')
            ->paginate(31)
            ->withQueryString();

        $employee->load('department');
        $stats = [
            'present' => Attendance::where('employee_id', $employee->id)->where('status', 'present')->count(),
            'late' => Attendance::where('employee_id', $employee->id)->where('status', 'late')->count(),
            'absent' => Attendance::where('employee_id', $employee->id)->where('status', 'absent')->count(),
        ];

        return inertia('hr/admin/attendance/employee', compact('employee', 'attendance', 'stats'));
    }

    public function bulkUpdate(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'records' => 'required|array',
            'records.*.employee_id' => 'required|exists:hr_employees,id',
            'records.*.date' => 'required|date',
            'records.*.status' => 'required|in:present,late,absent,half-day,holiday,leave',
            'records.*.time_in' => 'nullable|date_format:H:i',
            'records.*.time_out' => 'nullable|date_format:H:i',
            'records.*.remarks' => 'nullable|string',
        ]);

        foreach ($validated['records'] as $record) {
            Attendance::updateOrCreate(
                ['employee_id' => $record['employee_id'], 'date' => $record['date']],
                [
                    'status' => $record['status'],
                    'time_in' => $record['time_in'] ? now()->parse($record['time_in']) : null,
                    'time_out' => $record['time_out'] ? now()->parse($record['time_out']) : null,
                    'remarks' => $record['remarks'] ?? null,
                ]
            );
        }

        return redirect()->route('hr.admin.attendance.index')
            ->with('success', 'Attendance updated.');
    }

    public function report(Request $request): InertiaResponse
    {
        $month = $request->month ?? now()->format('Y-m');
        $departmentId = $request->department;

        $employees = Employee::with(['department', 'position'])
            ->when($departmentId, fn ($q) => $q->where('department_id', $departmentId))
            ->where('employment_status', 'active')
            ->get();

        $departments = Department::where('is_active', true)->get(['id', 'name']);

        $reportData = $employees->map(function ($employee) use ($month) {
            $attendance = Attendance::where('employee_id', $employee->id)
                ->whereMonth('date', Carbon::parse($month)->month)
                ->whereYear('date', Carbon::parse($month)->year)
                ->get();

            return [
                'employee' => $employee,
                'present' => $attendance->where('status', 'present')->count(),
                'late' => $attendance->where('status', 'late')->count(),
                'absent' => $attendance->where('status', 'absent')->count(),
                'on_leave' => $attendance->where('status', 'leave')->count(),
                'total' => $attendance->count(),
            ];
        });

        return inertia('hr/admin/attendance/report', [
            'reportData' => $reportData,
            'departments' => $departments,
            'month' => $month,
            'selectedDepartment' => $departmentId,
        ]);
    }
}