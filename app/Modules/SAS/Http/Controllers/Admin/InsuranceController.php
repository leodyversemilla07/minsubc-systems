<?php

namespace App\Modules\SAS\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\SAS\Http\Requests\UpdateInsuranceRequest;
use App\Modules\SAS\Models\InsuranceRecord;
use App\Modules\SAS\Services\InsuranceService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InsuranceController extends Controller
{
    public function __construct(
        protected InsuranceService $insuranceService
    ) {}

    /**
     * Display a listing of insurance submissions.
     */
    public function index(Request $request): Response
    {
        $insuranceRecords = $this->insuranceService->getInsuranceRecords([
            'status' => $request->input('status'),
            'policy_type' => $request->input('policy_type'),
            'search' => $request->input('search'),
        ], $request->input('per_page', 15));

        return Inertia::render('sas/admin/insurance/index', [
            'insuranceRecords' => $insuranceRecords,
            'filters' => $request->only(['status', 'policy_type', 'search']),
        ]);
    }

    /**
     * Display the specified insurance record.
     */
    public function show(int $id): Response
    {
        $insurance = $this->insuranceService->getInsuranceById($id);

        return Inertia::render('sas/admin/insurance/show', [
            'insurance' => $insurance,
        ]);
    }

    /**
     * Show the form for editing the specified insurance record.
     */
    public function edit(int $id): Response
    {
        $insurance = $this->insuranceService->getInsuranceById($id);

        return Inertia::render('sas/admin/insurance/edit', [
            'insurance' => $insurance,
        ]);
    }

    /**
     * Update the specified insurance record.
     */
    public function update(UpdateInsuranceRequest $request, int $id): RedirectResponse
    {
        $insurance = InsuranceRecord::findOrFail($id);

        $this->insuranceService->updateInsurance($insurance, $request->validated());

        return redirect()->route('sas.admin.insurance.index')
            ->with('success', 'Insurance record updated successfully.');
    }

    /**
     * Approve an insurance record.
     */
    public function approve(Request $request, int $id): RedirectResponse
    {
        $insurance = InsuranceRecord::findOrFail($id);

        $this->insuranceService->updateInsurance($insurance, [
            'status' => 'Approved',
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Insurance record approved.');
    }

    /**
     * Reject an insurance record.
     */
    public function reject(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'review_notes' => 'required|string',
        ]);

        $insurance = InsuranceRecord::findOrFail($id);

        $this->insuranceService->updateInsurance($insurance, [
            'status' => 'Rejected',
            'review_notes' => $request->input('review_notes'),
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Insurance record rejected.');
    }

    /**
     * Remove the specified insurance record.
     */
    public function destroy(int $id): RedirectResponse
    {
        $insurance = InsuranceRecord::findOrFail($id);

        $this->insuranceService->deleteInsurance($insurance);

        return redirect()->route('sas.admin.insurance.index')
            ->with('success', 'Insurance record deleted successfully.');
    }
}
