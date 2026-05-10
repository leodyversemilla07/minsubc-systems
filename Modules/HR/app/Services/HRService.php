<?php

namespace Modules\HR\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\HR\Models\Employee;
use Modules\HR\Models\Department;
use Modules\HR\Models\Attendance;
use Modules\HR\Models\LeaveRequest;
use Modules\HR\Models\Evaluation;

class HRService
{
    public function getDashboardStats(): array
    {
        return [
            'total_employees' => Employee::count(),
            'active_employees' => Employee::where('employment_status', 'active')->count(),
            'on_leave' => Employee::where('employment_status', 'on-leave')->count(),
            'departments' => Department::count(),
            'today_present' => Attendance::whereDate('date', today())->whereIn('status', ['present', 'late'])->count(),
            'pending_leaves' => LeaveRequest::where('status', 'pending')->count(),
            'pending_evaluations' => Evaluation::where('status', 'pending')->count(),
            'faculty_count' => Employee::whereHas('position', fn ($q) => $q->where('category', 'faculty'))->count(),
            'staff_count' => Employee::whereHas('position', fn ($q) => $q->where('category', 'staff'))->count(),
        ];
    }

    public function getAttendanceReport(): array
    {
        $month = request('month') ?? now()->format('Y-m');
        $start = Carbon::parse($month)->startOfMonth();
        $end = Carbon::parse($month)->endOfMonth();

        $departments = Department::withCount(['employees' => fn ($q) => $q->where('employment_status', 'active')])
            ->get()
            ->map(function ($dept) use ($start, $end) {
                $attendance = DB::table('hr_attendance')
                    ->join('hr_employees', 'hr_attendance.employee_id', '=', 'hr_employees.id')
                    ->where('hr_employees.department_id', $dept->id)
                    ->whereBetween('hr_attendance.date', [$start, $end])
                    ->selectRaw("
                        SUM(CASE WHEN hr_attendance.status = 'present' THEN 1 ELSE 0 END) as present,
                        SUM(CASE WHEN hr_attendance.status = 'late' THEN 1 ELSE 0 END) as late,
                        SUM(CASE WHEN hr_attendance.status = 'absent' THEN 1 ELSE 0 END) as absent
                    ")
                    ->first();

                return [
                    'department' => $dept->name,
                    'employee_count' => $dept->employees_count,
                    'present' => (int) ($attendance->present ?? 0),
                    'late' => (int) ($attendance->late ?? 0),
                    'absent' => (int) ($attendance->absent ?? 0),
                ];
            });

        return compact('month', 'departments');
    }

    public function getLeaveReport(): array
    {
        $year = request('year') ?? now()->year;
        $months = collect(range(1, 12))->map(function ($m) use ($year) {
            $date = Carbon::create($year, $m);
            $stats = DB::table('hr_leave_requests')
                ->whereYear('start_date', $year)
                ->whereMonth('start_date', $m)
                ->selectRaw("
                    SUM(CASE WHEN status = 'approved' THEN total_days ELSE 0 END) as approved_days,
                    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_requests,
                    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_requests
                ")
                ->first();

            return [
                'month' => $date->format('F'),
                'approved_days' => (int) ($stats->approved_days ?? 0),
                'pending_requests' => (int) ($stats->pending_requests ?? 0),
                'approved_requests' => (int) ($stats->approved_requests ?? 0),
            ];
        });

        return compact('year', 'months');
    }
}