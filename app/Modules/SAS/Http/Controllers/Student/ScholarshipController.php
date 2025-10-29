<?php

namespace App\Modules\SAS\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Modules\SAS\Services\ScholarshipService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ScholarshipController extends Controller
{
    public function __construct(
        protected ScholarshipService $scholarshipService
    ) {}

    /**
     * Display a listing of the student's scholarships.
     */
    public function index(Request $request): Response
    {
        $studentId = $request->user()->id;

        $scholarships = $this->scholarshipService->getScholarshipRecipients($studentId, [
            'academic_year' => $request->input('academic_year'),
            'semester' => $request->input('semester'),
            'status' => $request->input('status'),
        ]);

        return Inertia::render('sas/student/scholarships/index', [
            'scholarships' => $scholarships,
            'filters' => $request->only(['academic_year', 'semester', 'status']),
        ]);
    }

    /**
     * Display the specified scholarship.
     */
    public function show(Request $request, int $id): Response
    {
        $studentId = $request->user()->id;

        $recipient = $this->scholarshipService->getRecipientById($id);

        // Ensure the scholarship belongs to the authenticated student
        if ($recipient->student_id !== $studentId) {
            abort(403, 'Unauthorized access to scholarship record.');
        }

        return Inertia::render('sas/student/scholarships/show', [
            'recipient' => $recipient->load(['scholarship', 'requirements']),
        ]);
    }

    /**
     * Upload a requirement document for a scholarship.
     */
    public function uploadRequirement(Request $request, int $id)
    {
        $request->validate([
            'requirement_id' => 'required|exists:scholarship_requirements,id',
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240',
        ]);

        $recipient = $this->scholarshipService->getRecipientById($id);

        // Ensure the scholarship belongs to the authenticated student
        if ($recipient->student_id !== $request->user()->id) {
            abort(403, 'Unauthorized access to scholarship record.');
        }

        $this->scholarshipService->uploadRequirement(
            $request->input('requirement_id'),
            $request->file('file')
        );

        return redirect()->back()->with('success', 'Requirement uploaded successfully.');
    }
}
