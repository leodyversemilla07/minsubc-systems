<?php

namespace App\Modules\SAS\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\SAS\Http\Requests\StoreScholarshipRequest;
use App\Modules\SAS\Http\Requests\UpdateScholarshipRequest;
use App\Modules\SAS\Models\Scholarship;
use App\Modules\SAS\Services\ScholarshipService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ScholarshipController extends Controller
{
    public function __construct(
        protected ScholarshipService $scholarshipService
    ) {}

    /**
     * Display a listing of scholarships.
     */
    public function index(Request $request): Response
    {
        $scholarships = $this->scholarshipService->getScholarships([
            'scholarship_type' => $request->input('scholarship_type'),
            'is_active' => $request->input('is_active'),
            'search' => $request->input('search'),
        ], $request->input('per_page', 15));

        return Inertia::render('sas/admin/scholarships/index', [
            'scholarships' => $scholarships,
            'filters' => $request->only(['scholarship_type', 'is_active', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new scholarship.
     */
    public function create(): Response
    {
        return Inertia::render('sas/admin/scholarships/create');
    }

    /**
     * Store a newly created scholarship.
     */
    public function store(StoreScholarshipRequest $request): RedirectResponse
    {
        $this->scholarshipService->createScholarship($request->validated());

        return redirect()->route('sas.admin.scholarships.index')
            ->with('success', 'Scholarship created successfully.');
    }

    /**
     * Display the specified scholarship.
     */
    public function show(int $id): Response
    {
        $scholarship = $this->scholarshipService->getScholarshipById($id);

        return Inertia::render('sas/admin/scholarships/show', [
            'scholarship' => $scholarship,
        ]);
    }

    /**
     * Show the form for editing the specified scholarship.
     */
    public function edit(int $id): Response
    {
        $scholarship = $this->scholarshipService->getScholarshipById($id);

        return Inertia::render('sas/admin/scholarships/edit', [
            'scholarship' => $scholarship,
        ]);
    }

    /**
     * Update the specified scholarship.
     */
    public function update(UpdateScholarshipRequest $request, int $id): RedirectResponse
    {
        $scholarship = Scholarship::findOrFail($id);

        $this->scholarshipService->updateScholarship($scholarship, $request->validated());

        return redirect()->route('sas.admin.scholarships.index')
            ->with('success', 'Scholarship updated successfully.');
    }

    /**
     * Remove the specified scholarship.
     */
    public function destroy(int $id): RedirectResponse
    {
        $scholarship = Scholarship::findOrFail($id);

        $this->scholarshipService->deleteScholarship($scholarship);

        return redirect()->route('sas.admin.scholarships.index')
            ->with('success', 'Scholarship deleted successfully.');
    }
}
