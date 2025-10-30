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
        $filters = [
            'organization_type' => $request->input('type'),
            'status' => $request->input('status') ?: 'Active',
            'category' => $request->input('category'),
            'search' => $request->input('search'),
        ];

        $organizations = $this->organizationService->getOrganizations(
            $filters,
            $request->input('per_page', 24)
        );

        return Inertia::render('SAS/public/organizations/index', [
            'organizations' => [
                'data' => $organizations->items(),
                'links' => [
                    'first' => $organizations->url(1),
                    'last' => $organizations->url($organizations->lastPage()),
                    'prev' => $organizations->previousPageUrl(),
                    'next' => $organizations->nextPageUrl(),
                ],
                'meta' => [
                    'current_page' => $organizations->currentPage(),
                    'from' => $organizations->firstItem(),
                    'last_page' => $organizations->lastPage(),
                    'path' => $organizations->path(),
                    'per_page' => $organizations->perPage(),
                    'to' => $organizations->lastItem(),
                    'total' => $organizations->total(),
                ],
            ],
            'filters' => $request->only(['type', 'status', 'category', 'search']),
        ]);
    }

    /**
     * Display the specified organization profile.
     */
    public function show(string $code): Response
    {
        $organization = \App\Modules\SAS\Models\Organization::where('organization_code', $code)
            ->where('status', 'Active')
            ->with([
                'adviser',
                'officers' => function ($query) {
                    $query->orderByDesc('is_current')->orderBy('position');
                },
                'members' => function ($query) {
                    $query->where('status', 'Active')->orderBy('member_name');
                },
                'activities' => function ($query) {
                    $query->latest('start_date')->limit(10);
                },
            ])
            ->withCount(['officers', 'members', 'activities'])
            ->firstOrFail();

        return Inertia::render('SAS/public/organizations/show', [
            'organization' => $organization,
        ]);
    }
}
