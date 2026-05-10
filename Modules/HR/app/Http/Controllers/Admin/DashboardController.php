<?php

namespace Modules\HR\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\HR\Models\Department;
use Modules\HR\Models\Employee;
use Modules\HR\Models\LeaveRequest;
use Modules\HR\Models\Evaluation;

class DashboardController extends Controller
{
    public function index(): InertiaResponse
    {
        $stats = [
            'total_employees' => Employee::count(),
            'active_employees' => Employee::where('employment_status', 'active')->count(),
            'total_departments' => Department::count(),
            'pending_leaves' => LeaveRequest::where('status', 'pending')->count(),
            'pending_evaluations' => Evaluation::where('status', 'pending')->count(),
            'today_attendance' => \Modules\HR\Models\Attendance::whereDate('date', today())->count(),
        ];

        $recentEmployees = Employee::with(['department', 'position'])
            ->latest()->take(5)->get();

        return inertia('hr/admin/dashboard/index', compact('stats', 'recentEmployees'));
    }
}