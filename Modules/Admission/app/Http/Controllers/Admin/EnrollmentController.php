<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Enums\ApplicantStatus;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\Course;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentFee;
use Modules\Admission\Models\EnrollmentPayment;
use Modules\Admission\Models\EnrollmentSubject;
use Modules\Admission\Models\Section;
use Modules\Admission\Models\Subject;
use Modules\Admission\Services\EnrollmentService;
use Modules\Admission\Services\NotificationService;

class EnrollmentController extends Controller
{
    public function __construct(
        private EnrollmentService $enrollmentService,
        private NotificationService $notificationService
    ) {}

    public function index(Request $request): Response
    {
        $query = Enrollment::with(['applicant.program.course', 'user', 'section', 'academicTerm'])
            ->when($request->term_id, fn ($q, $id) => $q->where('academic_term_id', $id))
            ->when($request->academic_year, fn ($q, $ay) => $q->where('academic_year', $ay))
            ->when($request->semester, fn ($q, $sem) => $q->where('semester', $sem))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->year_level, fn ($q, $lvl) => $q->where('year_level', $lvl))
            ->when($request->search, function ($q, $s) {
                $q->whereHas('applicant', fn ($aq) => $aq->where('application_number', 'like', "%{$s}%")
                    ->orWhereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$s}%"]))
                    ->orWhereHas('user', fn ($uq) => $uq->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$s}%"]))
                    ->orWhere('student_id', 'like', "%{$s}%");
            });

        $enrollments = $query->latest()->paginate(15)->withQueryString();

        $terms = AcademicTerm::orderBy('academic_year', 'desc')->orderByRaw("CASE semester WHEN '1st' THEN 1 WHEN '2nd' THEN 2 WHEN 'Summer' THEN 3 END DESC")->get();
        $academicYears = Enrollment::distinct()->pluck('academic_year')->sort()->reverse();
        $statuses = ['pending', 'confirmed', 'enrolled', 'dropped', 'cancelled'];

        $stats = $this->enrollmentService->getStats($request->term_id);

        return Inertia::render('admission/admin/enrollments/index', [
            'enrollments' => $enrollments,
            'terms' => $terms,
            'academicYears' => $academicYears,
            'statuses' => $statuses,
            'stats' => $stats,
            'filters' => $request->only(['term_id', 'academic_year', 'semester', 'status', 'year_level', 'search']),
        ]);
    }

    /**
     * Show the enrollment form for an accepted applicant.
     */
    public function create(Request $request): Response
    {
        $acceptedApplicants = Applicant::accepted()
            ->with('program.course')
            ->whereDoesntHave('enrollment', fn ($q) => $q->whereIn('status', ['confirmed', 'enrolled']))
            ->get();

        $terms = AcademicTerm::orderBy('academic_year', 'desc')->orderByRaw("CASE semester WHEN '1st' THEN 1 WHEN '2nd' THEN 2 WHEN 'Summer' THEN 3 END DESC")->get();
        $courses = Course::orderBy('name')->get();

        $selectedApplicant = $request->applicant_id ? Applicant::with('program.course')->find($request->applicant_id) : null;

        return Inertia::render('admission/admin/enrollments/create', [
            'acceptedApplicants' => $acceptedApplicants,
            'terms' => $terms,
            'courses' => $courses,
            'selectedApplicant' => $selectedApplicant,
        ]);
    }

    /**
     * Store a newly created enrollment.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'applicant_id' => 'required|exists:admission_applicants,id',
            'academic_year' => 'required|string|max:20',
            'semester' => 'required|in:1st,2nd,Summer',
            'year_level' => 'nullable|string|max:10',
            'academic_term_id' => 'nullable|exists:academic_terms,id',
            'section_id' => 'nullable|exists:admission_sections,id',
            'student_id' => 'nullable|string|max:20',
            'notes' => 'nullable|string',
        ]);

        $applicant = Applicant::find($validated['applicant_id']);

        if ($applicant->status !== ApplicantStatus::Accepted) {
            return redirect()
                ->route('admission.admin.enrollments.create')
                ->with('error', 'Only accepted applicants can be enrolled.');
        }

        try {
            $enrollment = $this->enrollmentService->confirmEnrollment($applicant, $validated);

            $this->notificationService->sendEnrollmentConfirmation($enrollment);

            return redirect()
                ->route('admission.admin.enrollments.show', $enrollment)
                ->with('success', 'Enrollment confirmed successfully.');
        } catch (\RuntimeException $e) {
            return redirect()
                ->route('admission.admin.enrollments.create')
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified enrollment.
     */
    public function show(Enrollment $enrollment): Response
    {
        $enrollment->load([
            'applicant.program.course',
            'user',
            'section.course',
            'academicTerm',
            'subjects.subject',
            'subjects.section',
            'payments',
        ]);

        $feesBreakdown = $this->enrollmentService->calculateFees($enrollment);

        $availableSubjects = collect();
        if ($enrollment->section) {
            $semester = $enrollment->semester;
            $availableSubjects = Subject::where('course_id', $enrollment->section->course_id)
                ->where('year_level', $enrollment->section->year_level)
                ->where(function ($q) use ($semester) {
                    $q->where('semester', $semester)->orWhere('semester', 'All');
                })
                ->active()
                ->get();
        }

        return Inertia::render('admission/admin/enrollments/show', [
            'enrollment' => $enrollment,
            'feesBreakdown' => $feesBreakdown,
            'availableSubjects' => $availableSubjects,
        ]);
    }

    /**
     * Show the form for editing the specified enrollment.
     */
    public function edit(Enrollment $enrollment): Response
    {
        $terms = AcademicTerm::orderBy('academic_year', 'desc')->get();
        $sections = Section::where('course_id', $enrollment->section?->course_id)
            ->where('academic_term_id', $enrollment->academic_term_id)
            ->get();

        return Inertia::render('admission/admin/enrollments/edit', [
            'enrollment' => $enrollment,
            'terms' => $terms,
            'sections' => $sections,
        ]);
    }

    /**
     * Update the specified enrollment.
     */
    public function update(Request $request, Enrollment $enrollment): RedirectResponse
    {
        $validated = $request->validate([
            'section_id' => 'nullable|exists:admission_sections,id',
            'academic_term_id' => 'nullable|exists:academic_terms,id',
            'year_level' => 'nullable|string|max:10',
            'status' => 'nullable|in:pending,confirmed,enrolled,dropped,cancelled',
            'notes' => 'nullable|string',
        ]);

        if (isset($validated['section_id']) && $validated['section_id'] !== $enrollment->section_id) {
            try {
                $this->enrollmentService->assignSection($enrollment, $validated['section_id']);
            } catch (\RuntimeException $e) {
                return redirect()
                    ->route('admission.admin.enrollments.edit', $enrollment)
                    ->with('error', $e->getMessage());
            }
        }

        $enrollment->update(array_filter($validated, fn ($v) => !in_array($key = array_search($validated, $v, true), ['section_id', 'academic_term_id', 'year_level', 'status', 'notes']) || $key !== null, ARRAY_FILTER_USE_KEY));

        return redirect()
            ->route('admission.admin.enrollments.show', $enrollment)
            ->with('success', 'Enrollment updated successfully.');
    }

    /**
     * Remove the specified enrollment.
     */
    public function destroy(Enrollment $enrollment): RedirectResponse
    {
        if ($enrollment->status === 'enrolled') {
            return redirect()
                ->route('admission.admin.enrollments.show', $enrollment)
                ->with('error', 'Cannot delete an enrolled student. Cancel the enrollment instead.');
        }

        $enrollment->delete();

        return redirect()
            ->route('admission.admin.enrollments.index')
            ->with('success', 'Enrollment deleted successfully.');
    }

    /**
     * Assign subjects to an enrollment.
     */
    public function assignSubjects(Request $request, Enrollment $enrollment): RedirectResponse
    {
        $validated = $request->validate([
            'subject_ids' => 'required|array',
            'subject_ids.*' => 'exists:admission_subjects,id',
            'section_id' => 'nullable|exists:admission_sections,id',
        ]);

        $this->enrollmentService->assignSubjects(
            $enrollment,
            $validated['subject_ids'],
            $validated['section_id'] ?? null
        );

        return redirect()
            ->route('admission.admin.enrollments.show', $enrollment)
            ->with('success', 'Subjects assigned successfully.');
    }

    /**
     * Drop a subject from enrollment.
     */
    public function dropSubject(Request $request, Enrollment $enrollment, int $subjectId): RedirectResponse
    {
        $this->enrollmentService->dropSubject($enrollment, $subjectId, $request->reason ?? null);

        return redirect()
            ->route('admission.admin.enrollments.show', $enrollment)
            ->with('success', 'Subject dropped successfully.');
    }

    /**
     * Record a payment for enrollment.
     */
    public function recordPayment(Request $request, Enrollment $enrollment): RedirectResponse
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'method' => 'required|in:cash,bank_transfer,gcash,paymaya,card,online',
            'reference_number' => 'nullable|string|max:100',
            'type' => 'nullable|in:full,partial,installment',
            'notes' => 'nullable|string',
        ]);

        $payment = $this->enrollmentService->recordPayment($enrollment, $validated);

        return redirect()
            ->route('admission.admin.enrollments.show', $enrollment)
            ->with('success', 'Payment recorded successfully. Pending verification.');
    }

    /**
     * Verify a payment.
     */
    public function verifyPayment(EnrollmentPayment $payment): RedirectResponse
    {
        $this->enrollmentService->verifyPayment($payment, auth()->user());
        $this->notificationService->sendPaymentVerified($payment);

        return redirect()
            ->route('admission.admin.enrollments.show', $payment->enrollment)
            ->with('success', 'Payment verified successfully.');
    }

    /**
     * Reject a payment.
     */
    public function rejectPayment(Request $request, EnrollmentPayment $payment): RedirectResponse
    {
        $validated = $request->validate([
            'reason' => 'required|string|max:255',
        ]);

        $this->enrollmentService->rejectPayment($payment, auth()->user(), $validated['reason']);
        $this->notificationService->sendPaymentRejected($payment, $validated['reason']);

        return redirect()
            ->route('admission.admin.enrollments.show', $payment->enrollment)
            ->with('success', 'Payment rejected.');
    }

    /**
     * Re-enroll a student.
     */
    public function reEnroll(Request $request, Enrollment $enrollment): RedirectResponse
    {
        $validated = $request->validate([
            'academic_year' => 'required|string|max:20',
            'semester' => 'required|in:1st,2nd,Summer',
            'year_level' => 'nullable|string|max:10',
            'academic_term_id' => 'nullable|exists:academic_terms,id',
            'section_id' => 'nullable|exists:admission_sections,id',
            'notes' => 'nullable|string',
        ]);

        try {
            $newEnrollment = $this->enrollmentService->reEnroll($enrollment, $validated);
            $this->notificationService->sendReEnrollmentNotification($newEnrollment);

            return redirect()
                ->route('admission.admin.enrollments.show', $newEnrollment)
                ->with('success', 'Student re-enrolled successfully.');
        } catch (\RuntimeException $e) {
            return redirect()
                ->route('admission.admin.enrollments.show', $enrollment)
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Generate enrollment reports.
     */
    public function reports(Request $request): Response
    {
        $reports = $this->enrollmentService->getReports(
            $request->term_id,
            $request->academic_year
        );

        $terms = AcademicTerm::orderBy('academic_year', 'desc')->orderByRaw("CASE semester WHEN '1st' THEN 1 WHEN '2nd' THEN 2 WHEN 'Summer' THEN 3 END DESC")->get();
        $academicYears = Enrollment::distinct()->pluck('academic_year')->sort()->reverse();

        return Inertia::render('admission/admin/enrollments/reports', [
            'reports' => $reports,
            'terms' => $terms,
            'academicYears' => $academicYears,
            'filters' => $request->only(['term_id', 'academic_year']),
        ]);
    }

    /**
     * Get enrollments by section (API).
     */
    public function bySection(int $sectionId): \Illuminate\Http\JsonResponse
    {
        $enrollments = Enrollment::where('section_id', $sectionId)
            ->whereIn('status', ['confirmed', 'enrolled'])
            ->with(['user', 'subjects'])
            ->get();

        return response()->json($enrollments);
    }

    /**
     * Confirm pending enrollment.
     */
    public function confirm(Enrollment $enrollment): RedirectResponse
    {
        if ($enrollment->status !== 'pending') {
            return redirect()
                ->route('admission.admin.enrollments.show', $enrollment)
                ->with('error', 'Only pending enrollments can be confirmed.');
        }

        $enrollment->update([
            'status' => 'confirmed',
            'confirmed_at' => now(),
            'confirmed_by' => auth()->id(),
        ]);

        return redirect()
            ->route('admission.admin.enrollments.show', $enrollment)
            ->with('success', 'Enrollment confirmed.');
    }
}