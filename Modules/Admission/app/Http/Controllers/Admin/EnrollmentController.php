<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Services\EnrollmentService;

class EnrollmentController extends Controller
{
    public function __construct(private EnrollmentService $enrollmentService) {}

    public function index(Request $request): Response
    {
        $query = Enrollment::with(['applicant.program.course', 'user']);

        if ($request->filled('status')) $query->where('status', $request->status);

        $enrollments = $query->latest()->paginate(20)->through(fn($e) => [
            'id' => $e->id,
            'application_number' => $e->applicant?->application_number,
            'applicant_name' => $e->applicant?->full_name ?? 'N/A',
            'student_id' => $e->student_id,
            'program' => $e->applicant?->program?->course?->code ?? 'N/A',
            'academic_year' => $e->academic_year,
            'semester' => $e->semester,
            'status' => $e->status,
            'enrolled_at' => $e->enrolled_at?->format('M d, Y'),
        ]);

        $acceptedApplicants = Applicant::with(['program.course'])
            ->byStatus(\Modules\Admission\Enums\ApplicantStatus::Accepted)
            ->get()
            ->map(fn($a) => [
                'id' => $a->id,
                'application_number' => $a->application_number,
                'name' => $a->full_name,
                'program' => $a->program?->course?->code ?? 'N/A',
                'program_name' => $a->program?->name ?? 'N/A',
            ]);

        return Inertia::render('admission/admin/enrollments/index', [
            'enrollments' => $enrollments,
            'acceptedApplicants' => $acceptedApplicants,
            'filters' => $request->only(['status']),
        ]);
    }

    public function confirm(Request $request)
    {
        $validated = $request->validate([
            'applicant_id' => ['required', 'exists:admission_applicants,id'],
            'student_id' => ['nullable', 'string', 'max:20'],
            'academic_year' => ['required', 'string', 'max:20'],
            'semester' => ['required', 'in:1st,2nd,Summer'],
            'year_level' => ['required', 'string', 'max:10'],
            'course' => ['nullable', 'string', 'max:100'],
            'campus' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $applicant = Applicant::findOrFail($validated['applicant_id']);

        try {
            $this->enrollmentService->confirmEnrollment($applicant, $validated);
            return redirect()->route('admission.admin.enrollments.index')
                ->with('success', 'Enrollment confirmed successfully.');
        } catch (\RuntimeException $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
