<?php

namespace Modules\Admission\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentFee;
use Modules\Admission\Models\EnrollmentSubject;
use Modules\Admission\Models\Section;
use Modules\Admission\Models\Subject;
use Modules\Admission\Services\EnrollmentService;
use Modules\Admission\Services\GradeService;
use Modules\Admission\Services\ScheduleService;
use Illuminate\Support\Facades\Auth;

class StudentEnrollmentController extends Controller
{
    public function __construct(
        private EnrollmentService $enrollmentService,
        private GradeService $gradeService,
        private ScheduleService $scheduleService
    ) {}

    /**
     * Display student's enrollment dashboard.
     */
    public function index(): Response
    {
        $user = Auth::user();
        
        $currentEnrollment = Enrollment::where('user_id', $user->id)
            ->whereIn('status', ['confirmed', 'enrolled'])
            ->orderBy('created_at', 'desc')
            ->with(['section.course', 'academicTerm'])
            ->first()
            ?->loadCount('subjects');

        $enrollmentHistory = Enrollment::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->with(['section.course', 'academicTerm'])
            ->get();

        $activeTerm = AcademicTerm::active()
            ->where('status', 'enrollment')
            ->first();

        $canReEnroll = $activeTerm && !$currentEnrollment;

        if ($currentEnrollment) {
            $currentEnrollment->load(['subjects.subject', 'payments']);
            $feeInfo = $this->enrollmentService->calculateFees($currentEnrollment);
        }

        return Inertia::render('student/admission/index', [
            'currentEnrollment' => $currentEnrollment ? [
                'id' => $currentEnrollment->id,
                'academic_year' => $currentEnrollment->academic_year,
                'semester' => $currentEnrollment->semester,
                'year_level' => (string) $currentEnrollment->year_level,
                'status' => $currentEnrollment->status,
                'program' => $currentEnrollment->section?->course?->name ?? $currentEnrollment->program,
                'section_name' => $currentEnrollment->section?->name ?? 'Not Assigned',
                'total_subjects' => $currentEnrollment->subjects_count ?? $currentEnrollment->subjects->count(),
                'total_units' => $currentEnrollment->subjects->sum(fn ($es) => $es->subject?->units ?? 0),
                'total_fees' => $feeInfo['total_amount'] ?? 0,
                'balance' => $feeInfo['balance'] ?? 0,
                'gpa' => $currentEnrollment->gpa,
            ] : null,
            'enrollmentHistory' => $enrollmentHistory->map(fn ($e) => [
                'id' => $e->id,
                'academic_year' => $e->academic_year,
                'semester' => $e->semester,
                'program' => $e->section?->course?->name ?? $e->program,
                'status' => $e->status,
                'gpa' => $e->gpa,
            ]),
            'canReEnroll' => $canReEnroll,
            'stats' => $currentEnrollment ? [
                'average' => $currentEnrollment->subjects->whereNotNull('grade')->avg('grade'),
                'passed' => $currentEnrollment->subjects->filter(fn ($es) => $es->grade >= 75)->count(),
                'failed' => $currentEnrollment->subjects->filter(fn ($es) => $es->grade && $es->grade < 75)->count(),
                'total' => $currentEnrollment->subjects->count(),
            ] : null,
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
    public function payment(Enrollment $enrollment): Response
    {
        $user = Auth::user();

        if ($enrollment->user_id !== $user->id) {
            abort(403);
        }

        $enrollment->load(['payments', 'section.course', 'academicTerm']);
        $feesBreakdown = $this->enrollmentService->calculateFees($enrollment);

        $totalPaid = $enrollment->payments->where('status', 'verified')->sum('amount');
        $totalFees = $feesBreakdown['total'] ?? 0;
        $balance = max(0, $totalFees - $totalPaid);

        return Inertia::render('student/admission/payment', [
            'enrollment' => [
                'id' => $enrollment->id,
                'academic_year' => $enrollment->academic_year,
                'semester' => $enrollment->semester,
                'status' => $enrollment->status,
            ],
            'fees' => collect($feesBreakdown['items'] ?? [])->map(fn ($item) => [
                'name' => $item['name'],
                'amount' => (float) $item['amount'],
            ]),
            'totalFees' => (float) $totalFees,
            'totalPaid' => (float) $totalPaid,
            'balance' => (float) $balance,
            'payments' => $enrollment->payments->map(fn ($p) => [
                'id' => $p->id,
                'amount' => (float) $p->amount,
                'reference_number' => $p->reference_number,
                'payment_method' => $p->payment_method,
                'status' => $p->status,
                'created_at' => $p->created_at->format('M d, Y H:i'),
            ]),
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
    public function grades(): Response
    {
        $user = Auth::user();

        $enrollments = Enrollment::where('user_id', $user->id)
            ->where('status', 'enrolled')
            ->with(['subjects.subject', 'section.course'])
            ->orderBy('academic_year', 'desc')
            ->orderBy('semester', 'desc')
            ->get();

        $gradeRecords = $enrollments->map(function ($e) {
            $subjects = $e->subjects->map(function ($es) {
                $subject = $es->subject;
                $points = $es->grade ? $this->gradeService->gradeToPoints($es->grade) : null;
                return [
                    'code' => $subject->code,
                    'name' => $subject->name,
                    'units' => $subject->units,
                    'grade' => $es->grade,
                    'points' => $points,
                    'status' => $es->grade ? ($es->grade >= 75 ? 'passed' : 'failed') : 'incomplete',
                ];
            });

            return [
                'id' => $e->id,
                'academic_year' => $e->academic_year,
                'semester' => $e->semester,
                'section' => $e->section?->name,
                'gpa' => $e->gpa ?? 0,
                'average' => $subjects->whereNotNull('grade')->avg('grade'),
                'subjects' => $subjects->toArray(),
            ];
        });

        $stats = [
            'passed' => $gradeRecords->sum(fn ($r) => collect($r['subjects'])->where('status', 'passed')->count()),
            'failed' => $gradeRecords->sum(fn ($r) => collect($r['subjects'])->where('status', 'failed')->count()),
            'total' => $gradeRecords->sum(fn ($r) => count($r['subjects'])),
            'average' => $gradeRecords->whereNotNull('average')->avg('average'),
            'academic_standing' => $this->gradeService->getAcademicStanding($enrollments->avg('gpa') ?? 0),
        ];

        return Inertia::render('student/admission/grades', [
            'gradeRecords' => $gradeRecords,
            'cumulativeGPA' => $enrollments->avg('gpa') ?? 0,
            'stats' => $stats,
        ]);
    }

    /**
     * Get class schedule.
     */
    public function schedule(): Response
    {
        $user = Auth::user();

        $currentEnrollment = Enrollment::where('user_id', $user->id)
            ->where('status', 'enrolled')
            ->orderBy('created_at', 'desc')
            ->with(['section.course', 'section.schedules.subject', 'section.schedules.instructor'])
            ->first();

        if (!$currentEnrollment?->section) {
            return Inertia::render('student/admission/schedule', [
                'scheduleDetails' => [],
                'subjectColors' => [],
                'stats' => null,
            ]);
        }

        $schedules = $currentEnrollment->section->schedules
            ->sortBy(fn ($s) => array_search($s->day, ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']))
            ->sortBy('start_time');

        $colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];
        $subjectColors = [];
        $colorIdx = 0;
        foreach ($schedules as $s) {
            $subjName = $s->subject?->name ?? 'Unknown';
            if (!isset($subjectColors[$subjName])) {
                $subjectColors[$subjName] = $colors[$colorIdx % count($colors)];
                $colorIdx++;
            }
        }

        $scheduleDetails = $schedules->map(fn ($s) => [
            'subject' => $s->subject?->name ?? 'Unknown',
            'subject_code' => $s->subject?->code ?? '',
            'day' => $s->day,
            'start_time' => substr($s->start_time, 0, 5),
            'end_time' => substr($s->end_time, 0, 5),
            'room' => $s->room,
            'instructor' => $s->instructor?->full_name ?? $s->instructor?->name,
            'color' => $subjectColors[$s->subject?->name ?? 'Unknown'] ?? '#3B82F6',
        ]);

        $totalHours = 0;
        foreach ($schedules as $s) {
            $start = strtotime($s->start_time);
            $end = strtotime($s->end_time);
            $totalHours += ($end - $start) / 3600;
        }

        return Inertia::render('student/admission/schedule', [
            'scheduleDetails' => $scheduleDetails,
            'subjectColors' => $subjectColors,
            'stats' => [
                'total_subjects' => $schedules->pluck('subject_id')->unique()->count(),
                'total_units' => $schedules->sum(fn ($s) => $s->subject?->units ?? 0),
                'total_hours' => $totalHours,
            ],
        ]);
    }
}