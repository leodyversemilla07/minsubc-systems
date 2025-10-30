<?php

namespace App\Modules\SAS\Http\Controllers\Adviser;

use App\Http\Controllers\Controller;
use App\Modules\SAS\Http\Requests\StoreOrganizationOfficerRequest;
use App\Modules\SAS\Http\Requests\UpdateOrganizationOfficerRequest;
use App\Modules\SAS\Http\Requests\UpdateOrganizationRequest;
use App\Modules\SAS\Models\Organization;
use App\Modules\SAS\Models\OrganizationOfficer;
use App\Modules\SAS\Services\OrganizationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    public function __construct(
        protected OrganizationService $organizationService
    ) {}

    /**
     * Display the adviser's organization dashboard.
     */
    public function dashboard(Request $request): Response
    {
        $adviserId = $request->user()->id;

        $organization = Organization::where('adviser_id', $adviserId)
            ->with(['currentOfficers.student', 'members'])
            ->firstOrFail();

        return Inertia::render('sas/adviser/organization/dashboard', [
            'organization' => $organization,
        ]);
    }

    /**
     * Show the form for editing the organization.
     */
    public function edit(Request $request): Response
    {
        $adviserId = $request->user()->id;

        $organization = Organization::where('adviser_id', $adviserId)->firstOrFail();

        return Inertia::render('sas/adviser/organization/edit', [
            'organization' => $organization,
        ]);
    }

    /**
     * Update the organization information.
     */
    public function update(UpdateOrganizationRequest $request): RedirectResponse
    {
        $adviserId = $request->user()->id;

        $organization = Organization::where('adviser_id', $adviserId)->firstOrFail();

        $this->organizationService->updateOrganization($organization, $request->validated());

        return redirect()->route('sas.adviser.organization.dashboard')
            ->with('success', 'Organization updated successfully.');
    }

    /**
     * Manage organization officers.
     */
    public function officers(Request $request): Response
    {
        $adviserId = $request->user()->id;

        $organization = Organization::where('adviser_id', $adviserId)->firstOrFail();

        $officers = $this->organizationService->getOrganizationOfficers($organization->id);

        return Inertia::render('sas/adviser/organization/officers', [
            'organization' => $organization,
            'officers' => $officers,
        ]);
    }

    /**
     * Store a new organization officer.
     */
    public function storeOfficer(StoreOrganizationOfficerRequest $request): RedirectResponse
    {
        $this->organizationService->createOfficer($request->validated());

        return redirect()->back()->with('success', 'Officer added successfully.');
    }

    /**
     * Update an organization officer.
     */
    public function updateOfficer(UpdateOrganizationOfficerRequest $request, int $id): RedirectResponse
    {
        $officer = OrganizationOfficer::findOrFail($id);

        $this->organizationService->updateOfficer($officer, $request->validated());

        return redirect()->back()->with('success', 'Officer updated successfully.');
    }

    /**
     * Upload a document for the organization.
     */
    public function uploadDocument(Request $request): RedirectResponse
    {
        $request->validate([
            'document_type' => 'required|string',
            'document_name' => 'required|string',
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:10240',
            'academic_year' => 'nullable|string',
        ]);

        $adviserId = $request->user()->id;
        $organization = Organization::where('adviser_id', $adviserId)->firstOrFail();

        $filePath = $request->file('file')->store('organizations/documents', 'public');

        \App\Modules\SAS\Models\OrganizationDocument::create([
            'organization_id' => $organization->id,
            'document_type' => $request->input('document_type'),
            'document_name' => $request->input('document_name'),
            'file_path' => $filePath,
            'file_size' => $request->file('file')->getSize(),
            'academic_year' => $request->input('academic_year'),
            'uploaded_by' => $request->user()->id,
            'uploaded_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Document uploaded successfully.');
    }
}
