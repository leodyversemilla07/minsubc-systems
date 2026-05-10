<?php

namespace Modules\HR\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\HR\Models\Department;

class DepartmentController extends Controller
{
    public function index(): InertiaResponse
    {
        $departments = Department::with('head')->withCount('employees')->latest()->get();
        return inertia('hr/admin/departments/index', compact('departments'));
    }

    public function create(): InertiaResponse
    {
        $heads = \Modules\HR\Models\Employee::where('employment_status', 'active')->get(['id', 'first_name', 'last_name', 'employee_id']);
        return inertia('hr/admin/departments/create', compact('heads'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|max:20|unique:hr_departments,code',
            'name' => 'required|string|max:255',
            'type' => 'required|in:academic,administrative,office',
            'description' => 'nullable|string',
            'head_id' => 'nullable|exists:hr_employees,id',
        ]);

        Department::create($validated);

        return redirect()->route('hr.admin.departments.index')
            ->with('success', 'Department created.');
    }

    public function edit(Department $department): InertiaResponse
    {
        $heads = \Modules\HR\Models\Employee::where('employment_status', 'active')->get(['id', 'first_name', 'last_name', 'employee_id']);
        return inertia('hr/admin/departments/edit', compact('department', 'heads'));
    }

    public function update(Request $request, Department $department): RedirectResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|max:20|unique:hr_departments,code,' . $department->id,
            'name' => 'required|string|max:255',
            'type' => 'required|in:academic,administrative,office',
            'description' => 'nullable|string',
            'head_id' => 'nullable|exists:hr_employees,id',
            'is_active' => 'boolean',
        ]);

        $department->update($validated);

        return redirect()->route('hr.admin.departments.index')
            ->with('success', 'Department updated.');
    }

    public function destroy(Department $department): RedirectResponse
    {
        if ($department->employees()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete department with employees.');
        }
        $department->delete();
        return redirect()->route('hr.admin.departments.index')->with('success', 'Department deleted.');
    }

    public function list()
    {
        return response()->json(Department::where('is_active', true)->get(['id', 'name', 'code']));
    }
}