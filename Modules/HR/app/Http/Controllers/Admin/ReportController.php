<?php

namespace Modules\HR\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\HR\Models\Employee;
use Modules\HR\Models\Department;
use Modules\HR\Models\Attendance;
use Modules\HR\Services\HRService;

class ReportController extends Controller
{
    public function __construct(
        protected HRService $hrService
    ) {}

    public function index(): InertiaResponse
    {
        $stats = $this->hrService->getDashboardStats();
        return inertia('hr/admin/reports/index', compact('stats'));
    }

    public function attendanceReport(): InertiaResponse
    {
        $report = $this->hrService->getAttendanceReport();
        return inertia('hr/admin/reports/attendance', compact('report'));
    }

    public function leaveReport(): InertiaResponse
    {
        $report = $this->hrService->getLeaveReport();
        return inertia('hr/admin/reports/leave', compact('report'));
    }
}