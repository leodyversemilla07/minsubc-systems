<?php

namespace Modules\Clinic\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Clinic\Models\Consultation;

class ConsultationController extends Controller
{
    public function index()
    {
        $consultations = Consultation::with('medicalRecord')->orderBy('consultation_date', 'desc')->paginate(15);
        return Inertia::render('clinic/admin/consultations/index', ['consultations' => $consultations]);
    }

    public function create()
    {
        $patients = \Modules\Clinic\Models\MedicalRecord::select('id', 'first_name', 'last_name')->orderBy('last_name')->get();
        return Inertia::render('clinic/admin/consultations/create', ['patients' => $patients]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'medical_record_id' => 'required|exists:cls_medical_records,id',
            'complaint' => 'nullable|string',
            'diagnosis' => 'nullable|string',
            'treatment' => 'nullable|string',
            'prescription' => 'nullable|string',
            'consultation_date' => 'required|date',
            'follow_up_date' => 'nullable|date',
        ]);
        Consultation::create($validated);
        return redirect()->route('clinic.admin.consultations.index')->with('success', 'Consultation recorded.');
    }

    public function show(Consultation $consultation)
    {
        $consultation->load('medicalRecord');
        return Inertia::render('clinic/admin/consultations/show', ['consultation' => $consultation]);
    }

    public function edit(Consultation $consultation)
    {
        $consultation->load('medicalRecord');
        return Inertia::render('clinic/admin/consultations/edit', ['consultation' => $consultation]);
    }

    public function update(\Illuminate\Http\Request $request, Consultation $consultation)
    {
        $validated = $request->validate([
            'diagnosis' => 'nullable|string',
            'treatment' => 'nullable|string',
            'prescription' => 'nullable|string',
            'follow_up_date' => 'nullable|date',
            'status' => 'required|string',
        ]);
        $consultation->update($validated);
        return redirect()->route('clinic.admin.consultations.index')->with('success', 'Consultation updated.');
    }

    public function destroy(Consultation $consultation)
    {
        $consultation->delete();
        return redirect()->route('clinic.admin.consultations.index')->with('success', 'Consultation deleted.');
    }
}