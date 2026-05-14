<?php

namespace Modules\Clinic\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Clinic\Models\Immunization;

class ImmunizationController extends Controller
{
    public function index()
    {
        $immunizations = Immunization::with('medicalRecord')->orderBy('date_administered', 'desc')->paginate(15);
        return Inertia::render('clinic/admin/immunizations/index', ['immunizations' => $immunizations]);
    }

    public function create()
    {
        $patients = \Modules\Clinic\Models\MedicalRecord::select('id', 'first_name', 'last_name')->orderBy('last_name')->get();
        return Inertia::render('clinic/admin/immunizations/create', ['patients' => $patients]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'medical_record_id' => 'required|exists:cls_medical_records,id',
            'vaccine_name' => 'required|string',
            'dose_number' => 'nullable|integer',
            'date_administered' => 'required|date',
            'administered_by' => 'nullable|string',
            'next_due_date' => 'nullable|date',
        ]);
        Immunization::create($validated);
        return redirect()->route('clinic.admin.immunizations.index')->with('success', 'Immunization recorded.');
    }

    public function show(Immunization $immunization)
    {
        $immunization->load('medicalRecord');
        return Inertia::render('clinic/admin/immunizations/show', ['immunization' => $immunization]);
    }

    public function destroy(Immunization $immunization)
    {
        $immunization->delete();
        return redirect()->route('clinic.admin.immunizations.index')->with('success', 'Immunization deleted.');
    }
}