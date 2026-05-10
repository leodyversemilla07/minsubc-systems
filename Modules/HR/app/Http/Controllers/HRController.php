<?php

namespace Modules\HR\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\HR\Models\Department;
use Modules\HR\Models\Employee;

class HRController extends Controller
{
    public function index(): InertiaResponse
    {
        $stats = [
            'total_employees' => Employee::count(),
            'total_departments' => Department::count(),
            'active_faculty' => Employee::where('employment_status', 'active')->count(),
        ];
        $departments = Department::where('is_active', true)->get();

        return inertia('hr/index', compact('stats', 'departments'));
    }

    public function directory(): InertiaResponse
    {
        $employees = Employee::with(['department', 'position'])
            ->where('employment_status', 'active')
            ->when(request('search'), fn ($q, $s) => $q->where(function ($q) use ($s) {
                $q->where('first_name', 'like', "%{$s}%")
                  ->orWhere('last_name', 'like', "%{$s}%")
                  ->orWhere('employee_id', 'like', "%{$s}%");
            }))
            ->when(request('department'), fn ($q, $d) => $q->where('department_id', $d))
            ->paginate(20)
            ->withQueryString();

        $departments = Department::where('is_active', true)->get();

        return inertia('hr/directory', [
            'employees' => $employees,
            'departments' => $departments,
            'filters' => request()->only(['search', 'department']),
        ]);
    }

    public function show(Employee $employee): InertiaResponse
    {
        $employee->load(['department', 'position']);
        return inertia('hr/employees/show', compact('employee'));
    }
}