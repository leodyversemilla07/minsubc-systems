<?php

namespace App\Modules\SAS\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Modules\SAS\Http\Requests\StoreOrganizationRequest;
use App\Modules\SAS\Http\Requests\UpdateOrganizationRequest;
use App\Modules\SAS\Models\Organization;
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
     * Display a listing of all organizations.
     */
    public function index(Request $request): Response
    {
        $organizations = $this->organizationService->getOrganizations([
            'organization_type' => $request->input('organization_type'),
            'status' => $request->input('status'),
            'search' => $request->input('search'),
        ], $request->input('per_page', 15));

        return Inertia::render('SAS/admin/organizations/index', [
            'organizations' => $organizations,
            'filters' => $request->only(['organization_type', 'status', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new organization.
     */
    public function create(): Response
    {
        $advisers = User::permission('advise organization')->get();

        return Inertia::render('SAS/admin/organizations/create', [
            'advisers' => $advisers,
        ]);
    }

    /**
     * Store a newly created organization.
     */
    public function store(StoreOrganizationRequest $request): RedirectResponse
    {
        $this->organizationService->createOrganization($request->validated());

        return redirect()->route('sas.admin.organizations.index')
            ->with('success', 'Organization created successfully.');
    }

    /**
     * Display the specified organization.
     */
    public function show(int $id): Response
    {
        $organization = $this->organizationService->getOrganizationById($id);

        return Inertia::render('SAS/admin/organizations/show', [
            'organization' => $organization,
        ]);
    }

    /**
     * Show the form for editing the specified organization.
     */
    public function edit(int $id): Response
    {
        $organization = $this->organizationService->getOrganizationById($id);
        $advisers = User::permission('advise organization')->get();

        return Inertia::render('SAS/admin/organizations/edit', [
            'organization' => $organization,
            'advisers' => $advisers,
        ]);
    }

    /**
     * Update the specified organization.
     */
    public function update(UpdateOrganizationRequest $request, int $id): RedirectResponse
    {
        $organization = Organization::findOrFail($id);

        $this->organizationService->updateOrganization($organization, $request->validated());

        return redirect()->route('sas.admin.organizations.index')
            ->with('success', 'Organization updated successfully.');
    }

    /**
     * Remove the specified organization.
     */
    public function destroy(int $id): RedirectResponse
    {
        $organization = Organization::findOrFail($id);

        $this->organizationService->deleteOrganization($organization);

        return redirect()->route('sas.admin.organizations.index')
            ->with('success', 'Organization deleted successfully.');
    }

    /**
     * View compliance status of all organizations.
     */
    public function compliance(): Response
    {
        $organizations = Organization::with(['adviser', 'currentOfficers'])
            ->where('status', 'Active')
            ->get();

        return Inertia::render('SAS/admin/organizations/compliance', [
            'organizations' => $organizations,
        ]);
    }
}
