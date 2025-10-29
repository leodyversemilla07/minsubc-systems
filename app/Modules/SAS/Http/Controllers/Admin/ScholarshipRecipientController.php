<?php

namespace App\Modules\SAS\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\SAS\Http\Requests\StoreScholarshipRecipientRequest;
use App\Modules\SAS\Http\Requests\UpdateScholarshipRecipientRequest;
use App\Modules\SAS\Models\Scholarship;
use App\Modules\SAS\Models\ScholarshipRecipient;
use App\Modules\SAS\Services\ScholarshipService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ScholarshipRecipientController extends Controller
{
    public function __construct(
        protected ScholarshipService $scholarshipService
    ) {}

    /**
     * Display a listing of scholarship recipients.
     */
    public function index(Request $request): Response
    {
        $scholarshipId = $request->input('scholarship_id');

        $recipients = $scholarshipId
            ? $this->scholarshipService->getScholarshipRecipients($scholarshipId, [
                'academic_year' => $request->input('academic_year'),
                'semester' => $request->input('semester'),
                'status' => $request->input('status'),
            ])
            : collect();

        $scholarships = Scholarship::where('is_active', true)->get();

        return Inertia::render('sas/admin/scholarship-recipients/index', [
            'recipients' => $recipients,
            'scholarships' => $scholarships,
            'filters' => $request->only(['scholarship_id', 'academic_year', 'semester', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new recipient.
     */
    public function create(): Response
    {
        $scholarships = Scholarship::where('is_active', true)->get();

        return Inertia::render('sas/admin/scholarship-recipients/create', [
            'scholarships' => $scholarships,
        ]);
    }

    /**
     * Store a newly created recipient.
     */
    public function store(StoreScholarshipRecipientRequest $request): RedirectResponse
    {
        $this->scholarshipService->createRecipient($request->validated());

        return redirect()->route('sas.admin.scholarship-recipients.index')
            ->with('success', 'Scholarship recipient added successfully.');
    }

    /**
     * Display the specified recipient.
     */
    public function show(int $id): Response
    {
        $recipient = ScholarshipRecipient::with(['student', 'scholarship', 'requirements'])
            ->findOrFail($id);

        return Inertia::render('sas/admin/scholarship-recipients/show', [
            'recipient' => $recipient,
        ]);
    }

    /**
     * Show the form for editing the specified recipient.
     */
    public function edit(int $id): Response
    {
        $recipient = ScholarshipRecipient::with(['student', 'scholarship'])->findOrFail($id);
        $scholarships = Scholarship::where('is_active', true)->get();

        return Inertia::render('sas/admin/scholarship-recipients/edit', [
            'recipient' => $recipient,
            'scholarships' => $scholarships,
        ]);
    }

    /**
     * Update the specified recipient.
     */
    public function update(UpdateScholarshipRecipientRequest $request, int $id): RedirectResponse
    {
        $recipient = ScholarshipRecipient::findOrFail($id);

        $this->scholarshipService->updateRecipient($recipient, $request->validated());

        return redirect()->route('sas.admin.scholarship-recipients.index')
            ->with('success', 'Scholarship recipient updated successfully.');
    }

    /**
     * Remove the specified recipient.
     */
    public function destroy(int $id): RedirectResponse
    {
        $recipient = ScholarshipRecipient::findOrFail($id);

        $this->scholarshipService->deleteRecipient($recipient);

        return redirect()->route('sas.admin.scholarship-recipients.index')
            ->with('success', 'Scholarship recipient deleted successfully.');
    }
}
