<?php

namespace Modules\Clinic\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Clinic\Models\MedicalRecord;

class MedicalRecordController extends Controller
{
    public function index()
    {
        $records = MedicalRecord::orderBy('last_name')->paginate(15);
        return Inertia::render('clinic/admin/medical-records/index', ['records' => $records]);
    }

    public function create()
    {
        return Inertia::render('clinic/admin/medical-records/create');
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|string',
            'blood_type' => 'nullable|string',
        ]);
        MedicalRecord::create($validated);
        return redirect()->route('clinic.admin.medical-records.index')->with('success', 'Medical record created.');
    }

    public function show(MedicalRecord $medicalRecord)
    {
        $medicalRecord->load(['consultations', 'immunizations', 'dentalRecords', 'physicalExams']);
        return Inertia::render('clinic/admin/medical-records/show', ['record' => $medicalRecord]);
    }

    public function edit(MedicalRecord $medicalRecord)
    {
        return Inertia::render('clinic/admin/medical-records/edit', ['record' => $medicalRecord]);
    }

    public function update(\Illuminate\Http\Request $request, MedicalRecord $medicalRecord)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'blood_type' => 'nullable|string',
            'allergies' => 'nullable|array',
            'medical_conditions' => 'nullable|array',
        ]);
        $medicalRecord->update($validated);
        return redirect()->route('clinic.admin.medical-records.index')->with('success', 'Medical record updated.');
    }

    public function destroy(MedicalRecord $medicalRecord)
    {
        $medicalRecord->delete();
        return redirect()->route('clinic.admin.medical-records.index')->with('success', 'Medical record deleted.');
    }
}