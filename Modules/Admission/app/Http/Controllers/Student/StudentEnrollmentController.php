<?php

namespace Modules\Admission\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentFee;
use Modules\Admission\Models\EnrollmentPayment;
use Modules\Admission\Models\EnrollmentSubject;
use Modules\Admission\Models\Section;
use Modules\Admission\Models\Subject;
use Modules\Admission\Services\EnrollmentService;
use Illuminate\Support\Facades\Auth;

class StudentEnrollmentController extends Controller
{
    public function __construct(
        private EnrollmentService $enrollmentService
    ) {}

    /**
     * Display student's enrollment dashboard.
     */
    public function index(): View
    {
        $user = Auth::user();
        
        $currentEnrollment = Enrollment::where('user_id', $user->id)
            ->whereIn('status', ['confirmed', 'enrolled'])
            ->orderBy('created_at', 'desc')
            ->with(['section.course', 'academicTerm'])
            ->first();

        $enrollmentHistory = Enrollment::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->with(['section.course', 'academicTerm'])
            ->get();

        // Check if user can re-enroll
        $activeTerm = AcademicTerm::active()
            ->where('status', 'enrollment')
            ->first();

        $canReEnroll = $activeTerm && !$currentEnrollment;

        // Get grades for current enrollment
        $grades = [];
        if ($currentEnrollment) {
            $enrollmentSubjects = EnrollmentSubject::where('enrollment_id', $currentEnrollment->id)
                ->with('subject')
                ->get();
            
            $grades = [
                'subjects' => $enrollmentSubjects,
                'total_units' => $enrollmentSubjects->sum(fn ($es) => $es->subject?->units ?? 0),
                'average' => $enrollmentSubjects->whereNotNull('grade')->avg('grade'),
                'passed' => $enrollmentSubjects->filter(fn ($es) => $es->grade >= 75)->count(),
                'failed' => $enrollmentSubjects->filter(fn ($es) => $es->grade && $es->grade < 75)->count(),
            ];
        }

        return view('admission::student.index', [
            'currentEnrollment' => $currentEnrollment,
            'enrollmentHistory' => $enrollmentHistory,
            'activeTerm' => $activeTerm,
            'canReEnroll' => $canReEnroll,
            'grades' => $grades,
        ]);
    }

    /**
     * Show re-enrollment form.
     */
    public function create(): View
    {
        $user = Auth::user();
        
        $activeTerm = AcademicTerm::active()
            ->where('status', 'enrollment')
            ->first();

        if (!$activeTerm) {
            abort(403, 'Enrollment is not currently open.');
        }

        // Get previous enrollment to determine course/year level
        $previousEnrollment = Enrollment::where('user_id', $user->id)
            ->where('status', 'enrolled')
            ->orderBy('created_at', 'desc')
            ->first();

        $nextYearLevel = $previousEnrollment 
            ? (int) $previousEnrollment->year_level + 1 
            : 1;

        // Get available sections
        $availableSections = Section::where('academic_term_id', $activeTerm->id)
            ->where('status', 'open')
            ->with('course')
            ->orderBy('year_level')
            ->orderBy('name')
            ->get()
            ->filter(fn ($s) => $s->year_level === $nextYearLevel || $s->year_level === 1);

        // Get fees breakdown
        $fees = EnrollmentFee::where('academic_term_id', $activeTerm->id)
            ->active()
            ->orderBy('priority')
            ->get();

        $totalFees = $fees->sum('amount');

        // Get available subjects for the term
        $availableSubjects = Subject::active()
            ->whereIn('course_id', $availableSections->pluck('course_id')->unique())
            ->where(function ($query) use ($activeTerm) {
                $query->where('semester', $activeTerm->semester)
                    ->orWhere('semester', 'All');
            })
            ->where('year_level', '<=', $nextYearLevel)
            ->with('course')
            ->orderBy('course_id')
            ->orderBy('year_level')
            ->orderBy('code')
            ->get();

        return view('admission::student.enroll', [
            'activeTerm' => $activeTerm,
            'previousEnrollment' => $previousEnrollment,
            'nextYearLevel' => $nextYearLevel,
            'availableSections' => $availableSections,
            'availableSubjects' => $availableSubjects,
            'fees' => $fees,
            'totalFees' => $totalFees,
        ]);
    }

    /**
     * Store new enrollment.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'academic_term_id' => 'required|exists:academic_terms,id',
            'section_id' => 'required|exists:admission_sections,id',
            'subject_ids' => 'required|array|min:1',
            'subject_ids.*' => 'exists:admission_subjects,id',
        ]);

        $section = Section::find($validated['section_id']);
        $term = AcademicTerm::find($validated['academic_term_id']);

        // Check if already enrolled
        $existingEnrollment = Enrollment::where('user_id', $user->id)
            ->where('academic_year', $term->academic_year)
            ->where('semester', $term->semester)
            ->whereIn('status', ['confirmed', 'enrolled'])
            ->first();

        if ($existingEnrollment) {
            return back()->with('error', 'You are already enrolled for this term.');
        }

        // Create enrollment record
        $enrollment = Enrollment::create([
            'user_id' => $user->id,
            'academic_term_id' => $term->id,
            'section_id' => $section->id,
            'academic_year' => $term->academic_year,
            'semester' => $term->semester,
            'year_level' => (string) $section->year_level,
            'status' => 'confirmed',
            'confirmed_at' => now(),
            'confirmed_by' => auth()->id(),
        ]);

        // Assign subjects
        $this->enrollmentService->assignSubjects($enrollment, $validated['subject_ids'], $section->id);

        return redirect()
            ->route('student.enrollment.show', $enrollment)
            ->with('success', 'Enrollment submitted successfully. Please proceed to payment.');
    }

    /**
     * Show enrollment details.
     */
    public function show(Enrollment $enrollment): View
    {
        $user = Auth::user();

        // Ensure user owns this enrollment
        if ($enrollment->user_id !== $user->id) {
            abort(403);
        }

        $enrollment->load([
            'section.course',
            'academicTerm',
            'subjects.subject',
            'payments',
        ]);

        // Calculate fees
        $feesBreakdown = $this->enrollmentService->calculateFees($enrollment);

        // Get schedule
        $schedules = collect();
        if ($enrollment->section) {
            $schedules = $enrollment->section->schedules()
                ->with(['subject', 'instructor'])
                ->orderBy('day')
                ->orderBy('start_time')
                ->get();
        }

        return view('admission::student.show', [
            'enrollment' => $enrollment,
            'feesBreakdown' => $feesBreakdown,
            'schedules' => $schedules,
        ]);
    }

    /**
     * Show subjects for selection.
     */
    public function subjects(Enrollment $enrollment): View
    {
        $user = Auth::user();

        if ($enrollment->user_id !== $user->id) {
            abort(403);
        }

        $enrollment->load(['section.course', 'subjects.subject']);

        $enrolledSubjectIds = $enrollment->subjects->pluck('subject_id')->toArray();

        // Get available subjects based on year level and semester
        $availableSubjects = Subject::active()
            ->where('course_id', $enrollment->section?->course_id)
            ->where('year_level', '<=', $enrollment->section?->year_level ?? 1)
            ->where(function ($query) use ($enrollment) {
                $query->where('semester', $enrollment->semester)
                    ->orWhere('semester', 'All');
            })
            ->orderBy('year_level')
            ->orderBy('code')
            ->get();

        return view('admission::student.subjects', [
            'enrollment' => $enrollment,
            'enrolledSubjectIds' => $enrolledSubjectIds,
            'availableSubjects' => $availableSubjects,
        ]);
    }

    /**
     * Update enrollment subjects.
     */
    public function updateSubjects(Request $request, Enrollment $enrollment)
    {
        $user = Auth::user();

        if ($enrollment->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'subject_ids' => 'required|array|min:1',
            'subject_ids.*' => 'exists:admission_subjects,id',
        ]);

        // Add new subjects
        $currentSubjectIds = $enrollment->subjects->pluck('subject_id')->toArray();
        $newSubjects = array_diff($validated['subject_ids'], $currentSubjectIds);

        if (!empty($newSubjects)) {
            $this->enrollmentService->assignSubjects($enrollment, $newSubjects, $enrollment->section_id);
        }

        return back()->with('success', 'Subjects updated successfully.');
    }

    /**
     * Show payment form.
     */
    public function payment(Enrollment $enrollment): View
    {
        $user = Auth::user();

        if ($enrollment->user_id !== $user->id) {
            abort(403);
        }

        $enrollment->load(['payments', 'section.course', 'academicTerm']);
        $feesBreakdown = $this->enrollmentService->calculateFees($enrollment);

        return view('admission::student.payment', [
            'enrollment' => $enrollment,
            'feesBreakdown' => $feesBreakdown,
        ]);
    }

    /**
     * Record payment (cash/bank transfer).
     */
    public function submitPayment(Request $request, Enrollment $enrollment)
    {
        $user = Auth::user();

        if ($enrollment->user_id !== $user->id) {
            abort(403);
        }

        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'method' => 'required|in:cash,bank_transfer,gcash,paymaya',
            'reference_number' => 'nullable|string|max:100',
        ]);

        $this->enrollmentService->recordPayment($enrollment, $validated);

        return redirect()
            ->route('student.enrollment.show', $enrollment)
            ->with('success', 'Payment submitted. Please wait for verification.');
    }

    /**
     * Get enrollment history.
     */
    public function history(): View
    {
        $user = Auth::user();

        $enrollments = Enrollment::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->with(['section.course', 'academicTerm', 'subjects.subject'])
            ->paginate(10);

        return view('admission::student.history', [
            'enrollments' => $enrollments,
        ]);
    }

    /**
     * Get grades.
     */
    public function grades(): View
    {
        $user = Auth::user();

        $enrollments = Enrollment::where('user_id', $user->id)
            ->where('status', 'enrolled')
            ->with(['subjects.subject', 'section.course'])
            ->orderBy('academic_year', 'desc')
            ->orderBy('semester', 'desc')
            ->get();

        return view('admission::student.grades', [
            'enrollments' => $enrollments,
        ]);
    }

    /**
     * Get class schedule.
     */
    public function schedule(): View
    {
        $user = Auth::user();

        $currentEnrollment = Enrollment::where('user_id', $user->id)
            ->where('status', 'enrolled')
            ->orderBy('created_at', 'desc')
            ->with(['section.course', 'section.schedules.subject', 'section.schedules.instructor'])
            ->first();

        if (!$currentEnrollment?->section) {
            return view('admission::student.schedule', [
                'schedule' => null,
                'enrollment' => $currentEnrollment,
            ]);
        }

        $schedules = $currentEnrollment->section->schedules
            ->sortBy(fn ($s) => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']->indexOf($s->day))
            ->sortBy('start_time');

        return view('admission::student.schedule', [
            'schedule' => $schedules,
            'enrollment' => $currentEnrollment,
        ]);
    }
}