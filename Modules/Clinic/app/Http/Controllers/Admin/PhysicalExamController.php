<?php

namespace Modules\Clinic\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Clinic\Models\PhysicalExam;

class PhysicalExamController extends Controller
{
    public function index()
    {
        $exams = PhysicalExam::with('medicalRecord')->orderBy('exam_date', 'desc')->paginate(15);
        return Inertia::render('clinic/admin/physical-exams/index', ['exams' => $exams]);
    }

    public function create()
    {
        $patients = \Modules\Clinic\Models\MedicalRecord::select('id', 'first_name', 'last_name')->orderBy('last_name')->get();
        return Inertia::render('clinic/admin/physical-exams/create', ['patients' => $patients]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'medical_record_id' => 'required|exists:cls_medical_records,id',
            'exam_date' => 'required|date',
            'height_cm' => 'nullable|numeric',
            'weight_kg' => 'nullable|numeric',
            'blood_pressure' => 'nullable|string',
            'heart_rate' => 'nullable|integer',
            'temperature' => 'nullable|numeric',
            'is_cleared' => 'boolean',
        ]);
        PhysicalExam::create($validated);
        return redirect()->route('clinic.admin.physical-exams.index')->with('success', 'Physical exam recorded.');
    }

    public function show(PhysicalExam $physicalExam)
    {
        $physicalExam->load('medicalRecord');
        return Inertia::render('clinic/admin/physical-exams/show', ['exam' => $physicalExam]);
    }

    public function destroy(PhysicalExam $physicalExam)
    {
        $physicalExam->delete();
        return redirect()->route('clinic.admin.physical-exams.index')->with('success', 'Physical exam deleted.');
    }
}