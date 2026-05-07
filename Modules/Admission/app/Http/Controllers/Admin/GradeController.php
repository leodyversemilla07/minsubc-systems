<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentSubject;
use Modules\Admission\Models\Subject;
use Modules\Admission\Services\GradeService;

class GradeController extends Controller
{
    public function __construct(
        private GradeService $gradeService
    ) {}

    /**
     * Display grades listing.
     */
    public function index(Request $request): View
    {
        $query = Enrollment::with(['user', 'section.course', 'subjects.subject'])
            ->whereIn('status', ['confirmed', 'enrolled']);

        if ($request->section_id) {
            $query->where('section_id', $request->section_id);
        }

        if ($request->academic_year) {
            $query->where('academic_year', $request->academic_year);
        }

        if ($request->semester) {
            $query->where('semester', $request->semester);
        }

        if ($request->search) {
            $query->whereHas('user', fn ($q) => 
                $q->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$request->search}%"])
            );
        }

        $enrollments = $query->latest()->paginate(20)->withQueryString();

        $academicYears = Enrollment::distinct()->pluck('academic_year')->sort()->reverse();
        $sections = \Modules\Admission\Models\Section::with('course')->get();

        $stats = $this->gradeService->getStatistics($request->section_id, $request->academic_year);

        return view('admission::admin.grades.index', [
            'enrollments' => $enrollments,
            'academicYears' => $academicYears,
            'sections' => $sections,
            'stats' => $stats,
            'filters' => $request->only(['section_id', 'academic_year', 'semester', 'search']),
        ]);
    }

    /**
     * Show grade entry form for a section.
     */
    public function sectionGrades(\Modules\Admission\Models\Section $section): Response
    {
        $section->load(['course', 'enrollments.user', 'enrollments.subjects.subject']);

        $enrollments = $section->enrollments()
            ->whereIn('status', ['confirmed', 'enrolled'])
            ->with(['user', 'subjects' => fn ($q) => $q->where('status', 'enrolled')])
            ->get()
            ->map(fn ($e) => [
                'id' => $e->id,
                'full_name' => $e->user?->full_name ?? $e->full_name ?? 'Unknown',
                'student_id' => $e->student_id,
                'status' => $e->status,
                'gpa' => $e->gpa,
                'subjects' => $e->subjects->map(fn ($es) => [
                    'id' => $es->id,
                    'subject_id' => $es->subject_id,
                    'grade' => $es->grade,
                    'status' => $es->status,
                    'remarks' => $es->remarks,
                    'subject' => $es->subject ? [
                        'id' => $es->subject->id,
                        'code' => $es->subject->code,
                        'name' => $es->subject->name,
                        'units' => $es->subject->units,
                    ] : null,
                ]),
            ]);

        // Get all subjects for this section
        $subjects = $section->schedules()
            ->with('subject')
            ->get()
            ->pluck('subject')
            ->filter()
            ->unique('id')
            ->values()
            ->map(fn ($s) => [
                'id' => $s->id,
                'code' => $s->code,
                'name' => $s->name,
                'units' => $s->units,
            ]);

        return Inertia::render('admission/admin/grades/section', [
            'section' => [
                'id' => $section->id,
                'name' => $section->name,
                'academic_year' => $section->academic_year,
                'semester' => $section->semester,
                'course' => $section->course ? ['name' => $section->course->name] : null,
            ],
            'enrollments' => $enrollments,
            'subjects' => $subjects,
        ]);
    }

    /**
     * Submit grades for an enrollment.
     */
    public function submitGrades(Request $request, Enrollment $enrollment): RedirectResponse
    {
        $validated = $request->validate([
            'grades' => 'required|array',
            'grades.*.subject_id' => 'required|exists:admission_subjects,id',
            'grades.*.grade' => 'nullable|numeric|min:0|max:100',
            'grades.*.remarks' => 'nullable|string|max:255',
        ]);

        foreach ($validated['grades'] as $gradeData) {
            $subject = Subject::find($gradeData['subject_id']);
            
            $status = $this->gradeService->determineStatus($gradeData['grade'] ?? null);

            EnrollmentSubject::updateOrCreate(
                [
                    'enrollment_id' => $enrollment->id,
                    'subject_id' => $gradeData['subject_id'],
                ],
                [
                    'grade' => $gradeData['grade'] ?? null,
                    'status' => $status,
                    'remarks' => $gradeData['remarks'] ?? null,
                ]
            );
        }

        return redirect()
            ->back()
            ->with('success', 'Grades submitted successfully.');
    }

    /**
     * Update a single grade.
     */
    public function updateGrade(Request $request, EnrollmentSubject $enrollmentSubject): RedirectResponse
    {
        $validated = $request->validate([
            'grade' => 'nullable|numeric|min:0|max:100',
            'remarks' => 'nullable|string|max:255',
        ]);

        $status = $this->gradeService->determineStatus($validated['grade'] ?? null);

        $enrollmentSubject->update([
            'grade' => $validated['grade'] ?? null,
            'status' => $status,
            'remarks' => $validated['remarks'] ?? null,
        ]);

        return redirect()
            ->back()
            ->with('success', 'Grade updated successfully.');
    }

    /**
     * Bulk grade upload via CSV.
     */
    public function bulkUpload(Request $request): RedirectResponse
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',
            'section_id' => 'required|exists:admission_sections,id',
        ]);

        $section = \Modules\Admission\Models\Section::find($request->section_id);
        
        try {
            $result = $this->gradeService->bulkUpload($request->file('csv_file'), $section);
            
            return redirect()
                ->back()
                ->with('success', "Successfully imported {$result['imported']} grades. {$result['errors']} errors.");
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Failed to import grades: ' . $e->getMessage());
        }
    }

    /**
     * Export grades to CSV.
     */
    public function export(Request $request)
    {
        $sectionId = $request->section_id;
        $academicYear = $request->academic_year;
        $semester = $request->semester;

        $csv = $this->gradeService->exportGrades($sectionId, $academicYear, $semester);

        $filename = "grades_{$sectionId}_{$academicYear}_{$semester}.csv";

        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }

    /**
     * Calculate GPA for an enrollment.
     */
    public function calculateGPA(Enrollment $enrollment): \Illuminate\Http\JsonResponse
    {
        $gpa = $this->gradeService->calculateGPA($enrollment);
        $standing = $this->gradeService->getAcademicStanding($gpa);

        return response()->json([
            'gpa' => round($gpa, 2),
            'standing' => $standing,
        ]);
    }

    /**
     * Generate grade sheet PDF.
     */
    public function gradeSheet(\Modules\Admission\Models\Section $section): View
    {
        $section->load(['course', 'enrollments.user', 'enrollments.subjects.subject', 'adviser']);

        $enrollments = $section->enrollments()
            ->whereIn('status', ['confirmed', 'enrolled'])
            ->with(['user', 'subjects' => fn ($q) => $q->where('status', 'enrolled')])
            ->get();

        $subjects = $section->schedules()
            ->with('subject')
            ->get()
            ->pluck('subject')
            ->filter()
            ->unique('id')
            ->values();

        return view('admission::admin.grades.sheet', [
            'section' => $section,
            'enrollments' => $enrollments,
            'subjects' => $subjects,
        ]);
    }
}