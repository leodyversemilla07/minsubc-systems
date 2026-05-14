<?php

namespace Modules\Clinic\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Clinic\Models\DentalRecord;

class DentalRecordController extends Controller
{
    public function index()
    {
        $records = DentalRecord::with('medicalRecord')->orderBy('dental_date', 'desc')->paginate(15);
        return Inertia::render('clinic/admin/dental-records/index', ['records' => $records]);
    }

    public function create()
    {
        $patients = \Modules\Clinic\Models\MedicalRecord::select('id', 'first_name', 'last_name')->orderBy('last_name')->get();
        return Inertia::render('clinic/admin/dental-records/create', ['patients' => $patients]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'medical_record_id' => 'required|exists:cls_medical_records,id',
            'procedure' => 'nullable|string',
            'findings' => 'nullable|string',
            'treatment' => 'nullable|string',
            'dentist' => 'nullable|string',
            'dental_date' => 'required|date',
        ]);
        DentalRecord::create($validated);
        return redirect()->route('clinic.admin.dental-records.index')->with('success', 'Dental record created.');
    }

    public function destroy(DentalRecord $dentalRecord)
    {
        $dentalRecord->delete();
        return redirect()->route('clinic.admin.dental-records.index')->with('success', 'Dental record deleted.');
    }
}