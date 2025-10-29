<?php

namespace App\Modules\SAS\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Modules\SAS\Services\OrganizationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    public function __construct(
        protected OrganizationService $organizationService
    ) {}

    /**
     * Display a listing of all active organizations.
     */
    public function index(Request $request): Response
    {
        $organizations = $this->organizationService->getOrganizations([
            'organization_type' => $request->input('organization_type'),
            'status' => 'Active',
            'search' => $request->input('search'),
        ], $request->input('per_page', 24));

        return Inertia::render('sas/public/organizations/index', [
            'organizations' => $organizations,
            'filters' => $request->only(['organization_type', 'search']),
        ]);
    }

    /**
     * Display the specified organization profile.
     */
    public function show(string $code): Response
    {
        $organization = \App\Modules\SAS\Models\Organization::where('organization_code', $code)
            ->where('status', 'Active')
            ->with(['adviser', 'currentOfficers.student'])
            ->firstOrFail();

        return Inertia::render('sas/public/organizations/show', [
            'organization' => $organization,
        ]);
    }
}
