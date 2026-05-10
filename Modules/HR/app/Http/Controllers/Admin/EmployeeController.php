<?php

namespace Modules\HR\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\HR\Models\Employee;
use Modules\HR\Models\Department;
use Modules\HR\Models\Position;

class EmployeeController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $employees = Employee::with(['department', 'position'])
            ->when($request->search, fn ($q, $s) => $q->where(function ($q) use ($s) {
                $q->where('first_name', 'like', "%{$s}%")
                  ->orWhere('last_name', 'like', "%{$s}%")
                  ->orWhere('employee_id', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%");
            }))
            ->when($request->department, fn ($q, $d) => $q->where('department_id', $d))
            ->when($request->status, fn ($q, $s) => $q->where('employment_status', $s))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $departments = Department::where('is_active', true)->get(['id', 'name']);

        return inertia('hr/admin/employees/index', [
            'employees' => $employees,
            'departments' => $departments,
            'filters' => $request->only(['search', 'department', 'status']),
        ]);
    }

    public function create(): InertiaResponse
    {
        $departments = Department::where('is_active', true)->get(['id', 'name', 'code']);
        $positions = Position::where('is_active', true)->get(['id', 'title', 'category']);
        return inertia('hr/admin/employees/create', compact('departments', 'positions'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'employee_id' => 'required|string|max:20|unique:hr_employees,employee_id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:hr_employees,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|string|max:20',
            'civil_status' => 'nullable|string|max:20',
            'department_id' => 'nullable|exists:hr_departments,id',
            'position_id' => 'nullable|exists:hr_positions,id',
            'employment_status' => 'required|in:active,inactive,on-leave,resigned,terminated',
            'hire_date' => 'required|date',
            'regularization_date' => 'nullable|date|after_or_equal:hire_date',
            'education_level' => 'nullable|string|max:100',
            'specialization' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        Employee::create($validated);

        return redirect()->route('hr.admin.employees.index')
            ->with('success', 'Employee created.');
    }

    public function show(Employee $employee): InertiaResponse
    {
        $employee->load(['department', 'position', 'attendance' => function ($q) {
            $q->latest()->take(30);
        }]);
        return inertia('hr/admin/employees/show', compact('employee'));
    }

    public function edit(Employee $employee): InertiaResponse
    {
        $departments = Department::where('is_active', true)->get(['id', 'name', 'code']);
        $positions = Position::where('is_active', true)->get(['id', 'title', 'category']);
        return inertia('hr/admin/employees/edit', compact('employee', 'departments', 'positions'));
    }

    public function update(Request $request, Employee $employee): RedirectResponse
    {
        $validated = $request->validate([
            'employee_id' => 'required|string|max:20|unique:hr_employees,employee_id,' . $employee->id,
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:hr_employees,email,' . $employee->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|string|max:20',
            'civil_status' => 'nullable|string|max:20',
            'department_id' => 'nullable|exists:hr_departments,id',
            'position_id' => 'nullable|exists:hr_positions,id',
            'employment_status' => 'required|in:active,inactive,on-leave,resigned,terminated',
            'hire_date' => 'required|date',
            'regularization_date' => 'nullable|date',
            'resignation_date' => 'nullable|date',
            'education_level' => 'nullable|string|max:100',
            'specialization' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $employee->update($validated);

        return redirect()->route('hr.admin.employees.index')
            ->with('success', 'Employee updated.');
    }

    public function destroy(Employee $employee): RedirectResponse
    {
        $employee->delete();
        return redirect()->route('hr.admin.employees.index')
            ->with('success', 'Employee deleted.');
    }

    public function search(Request $request)
    {
        $employees = Employee::where(function ($q) use ($request) {
            $s = $request->q;
            $q->where('first_name', 'like', "%{$s}%")
              ->orWhere('last_name', 'like', "%{$s}%")
              ->orWhere('employee_id', 'like', "%{$s}%");
        })->take(10)->get(['id', 'employee_id', 'first_name', 'last_name']);

        return response()->json($employees);
    }

    public function uploadPhoto(Request $request, Employee $employee): RedirectResponse
    {
        $request->validate(['photo' => 'required|image|max:2048']);
        $path = $request->file('photo')->store('hr/photos', 'public');
        $employee->update(['profile_photo' => $path]);

        return redirect()->route('hr.admin.employees.show', $employee)
            ->with('success', 'Photo uploaded.');
    }
}