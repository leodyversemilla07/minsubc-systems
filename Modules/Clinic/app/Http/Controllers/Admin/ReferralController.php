<?php

namespace Modules\Clinic\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Modules\Clinic\Models\Referral;

class ReferralController extends Controller
{
    public function index()
    {
        $referrals = Referral::with('medicalRecord')->orderBy('referral_date', 'desc')->paginate(15);
        return Inertia::render('clinic/admin/referrals/index', ['referrals' => $referrals]);
    }

    public function create()
    {
        $patients = \Modules\Clinic\Models\MedicalRecord::select('id', 'first_name', 'last_name')->orderBy('last_name')->get();
        return Inertia::render('clinic/admin/referrals/create', ['patients' => $patients]);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'medical_record_id' => 'required|exists:cls_medical_records,id',
            'referred_to' => 'required|string',
            'reason' => 'nullable|string',
            'referral_date' => 'required|date',
        ]);
        Referral::create($validated);
        return redirect()->route('clinic.admin.referrals.index')->with('success', 'Referral created.');
    }

    public function show(Referral $referral)
    {
        $referral->load('medicalRecord');
        return Inertia::render('clinic/admin/referrals/show', ['referral' => $referral]);
    }

    public function edit(Referral $referral)
    {
        $referral->load('medicalRecord');
        return Inertia::render('clinic/admin/referrals/edit', ['referral' => $referral]);
    }

    public function update(\Illuminate\Http\Request $request, Referral $referral)
    {
        $validated = $request->validate([
            'status' => 'required|string',
            'follow_up_notes' => 'nullable|string',
        ]);
        $referral->update($validated);
        return redirect()->route('clinic.admin.referrals.index')->with('success', 'Referral updated.');
    }

    public function destroy(Referral $referral)
    {
        $referral->delete();
        return redirect()->route('clinic.admin.referrals.index')->with('success', 'Referral deleted.');
    }
}