<?php

namespace Modules\Alumni\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Alumni\Models\EmploymentRecord;

class EmploymentRecordController extends Controller
{
    public function index()
    {
        $records = EmploymentRecord::with('alumnus')->orderBy('start_date', 'desc')->paginate(15);
        return Inertia::render('alumni/admin/employment-records/index', ['records' => $records]);
    }

    public function create()
    {
        $alumni = \Modules\Alumni\Models\Alumnus::select('id', 'first_name', 'last_name')->orderBy('last_name')->get();
        return Inertia::render('alumni/admin/employment-records/create', ['alumni' => $alumni]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'alumnus_id' => 'required|exists:alm_alumni,id',
            'company_name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'industry' => 'nullable|string',
            'employment_type' => 'nullable|string',
            'monthly_income' => 'nullable|numeric|min:0',
            'start_date' => 'nullable|date',
            'is_current' => 'boolean',
        ]);
        EmploymentRecord::create($validated);
        return redirect()->route('alumni.admin.employment-records.index')->with('success', 'Record added.');
    }

    public function edit(EmploymentRecord $employmentRecord)
    {
        $employmentRecord->load('alumnus');
        return Inertia::render('alumni/admin/employment-records/edit', ['record' => $employmentRecord]);
    }

    public function update(\Illuminate\Http\Request $request, EmploymentRecord $employmentRecord)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'industry' => 'nullable|string',
            'is_current' => 'boolean',
            'end_date' => 'nullable|date|after:start_date',
        ]);
        $employmentRecord->update($validated);
        return redirect()->route('alumni.admin.employment-records.index')->with('success', 'Record updated.');
    }

    public function destroy(EmploymentRecord $employmentRecord)
    {
        $employmentRecord->delete();
        return redirect()->route('alumni.admin.employment-records.index')->with('success', 'Record deleted.');
    }
}