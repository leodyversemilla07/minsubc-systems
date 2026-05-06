<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Modules\Admission\Models\Section;
use Modules\Admission\Models\Course;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Services\ScheduleService;

class SectionController extends Controller
{
    public function __construct(
        private ScheduleService $scheduleService
    ) {}

    /**
     * Display a listing of sections.
     */
    public function index(Request $request): View
    {
        $query = Section::with(['course', 'academicTerm', 'adviser'])
            ->when($request->term_id, fn ($q, $id) => $q->where('academic_term_id', $id))
            ->when($request->course_id, fn ($q, $id) => $q->where('course_id', $id))
            ->when($request->year_level, fn ($q, $lvl) => $q->where('year_level', $lvl))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"));

        $sections = $query->orderBy('name')->paginate(15)->withQueryString();

        $terms = AcademicTerm::orderBy('academic_year', 'desc')->orderByRaw("FIELD(semester, '1st', '2nd', 'Summer') DESC")->get();
        $courses = Course::orderBy('name')->get();

        $stats = $this->scheduleService->getSectionStats($request->term_id);

        return view('admission::admin.sections.index', [
            'sections' => $sections,
            'terms' => $terms,
            'courses' => $courses,
            'stats' => $stats,
            'filters' => $request->only(['term_id', 'course_id', 'year_level', 'status', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new section.
     */
    public function create(Request $request): View
    {
        $terms = AcademicTerm::orderBy('academic_year', 'desc')->orderByRaw("FIELD(semester, '1st', '2nd', 'Summer') DESC")->get();
        $courses = Course::orderBy('name')->get();

        $selectedTerm = $request->term_id ? AcademicTerm::find($request->term_id) : AcademicTerm::active()->first();
        $selectedCourse = $request->course_id ? Course::find($request->course_id) : null;

        return view('admission::admin.sections.create', [
            'terms' => $terms,
            'courses' => $courses,
            'selectedTerm' => $selectedTerm,
            'selectedCourse' => $selectedCourse,
        ]);
    }

    /**
     * Store a newly created section.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'academic_term_id' => 'required|exists:academic_terms,id',
            'course_id' => 'required|exists:courses,id',
            'name' => 'required|string|max:50',
            'year_level' => 'required|integer|min:1|max:10',
            'max_students' => 'nullable|integer|min:1|max:200',
            'adviser_id' => 'nullable|exists:users,id',
            'room' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $section = $this->scheduleService->createSection($validated);

        return redirect()
            ->route('admission.admin.sections.show', $section)
            ->with('success', 'Section created successfully.');
    }

    /**
     * Display the specified section.
     */
    public function show(Section $section): View
    {
        $section->load([
            'course',
            'academicTerm',
            'adviser',
            'schedules.subject',
            'schedules.instructor',
            'enrollments.user',
        ]);

        $scheduleByDay = $this->scheduleService->getScheduleByDay($section);
        $availableSubjects = $this->scheduleService->getAvailableSubjects(
            $section->course_id,
            $section->year_level,
            $section->academicTerm?->semester ?? '1st'
        );

        return view('admission::admin.sections.show', [
            'section' => $section,
            'scheduleByDay' => $scheduleByDay,
            'availableSubjects' => $availableSubjects,
        ]);
    }

    /**
     * Show the form for editing the specified section.
     */
    public function edit(Section $section): View
    {
        $terms = AcademicTerm::orderBy('academic_year', 'desc')->orderByRaw("FIELD(semester, '1st', '2nd', 'Summer') DESC")->get();
        $courses = Course::orderBy('name')->get();
        $advisers = \App\Models\User::role(['faculty', 'admission-admin', 'registrar-admin'])
            ->orderBy('first_name')
            ->get();

        return view('admission::admin.sections.edit', [
            'section' => $section,
            'terms' => $terms,
            'courses' => $courses,
            'advisers' => $advisers,
        ]);
    }

    /**
     * Update the specified section.
     */
    public function update(Request $request, Section $section): RedirectResponse
    {
        $validated = $request->validate([
            'academic_term_id' => 'required|exists:academic_terms,id',
            'course_id' => 'required|exists:courses,id',
            'name' => 'required|string|max:50',
            'year_level' => 'required|integer|min:1|max:10',
            'max_students' => 'nullable|integer|min:1|max:200',
            'adviser_id' => 'nullable|exists:users,id',
            'room' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $this->scheduleService->updateSection($section, $validated);

        return redirect()
            ->route('admission.admin.sections.show', $section)
            ->with('success', 'Section updated successfully.');
    }

    /**
     * Remove the specified section.
     */
    public function destroy(Section $section): RedirectResponse
    {
        if ($section->current_students > 0) {
            return redirect()
                ->route('admission.admin.sections.show', $section)
                ->with('error', 'Cannot delete section with enrolled students.');
        }

        $section->delete();

        return redirect()
            ->route('admission.admin.sections.index')
            ->with('success', 'Section deleted successfully.');
    }

    /**
     * Add a schedule to the section.
     */
    public function addSchedule(Request $request, Section $section): RedirectResponse
    {
        $validated = $request->validate([
            'subject_id' => 'required|exists:admission_subjects,id',
            'day' => 'required|string|max:20',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'room' => 'nullable|string|max:50',
            'instructor_id' => 'nullable|exists:users,id',
            'type' => 'required|in:lec,lab',
        ]);

        try {
            $this->scheduleService->addSchedule($section, $validated);
            $message = 'Schedule added successfully.';
        } catch (\RuntimeException $e) {
            return redirect()
                ->route('admission.admin.sections.show', $section)
                ->with('error', $e->getMessage());
        }

        return redirect()
            ->route('admission.admin.sections.show', $section)
            ->with('success', $message);
    }

    /**
     * Remove a schedule from the section.
     */
    public function removeSchedule(\Modules\Admission\Models\Schedule $schedule): RedirectResponse
    {
        $section = $schedule->section;
        $this->scheduleService->removeSchedule($schedule);

        return redirect()
            ->route('admission.admin.sections.show', $section)
            ->with('success', 'Schedule removed successfully.');
    }

    /**
     * Get available subjects for a section.
     */
    public function availableSubjects(Section $section): \Illuminate\Http\JsonResponse
    {
        $semester = $section->academicTerm?->semester ?? '1st';
        $subjects = $this->scheduleService->getAvailableSubjects(
            $section->course_id,
            $section->year_level,
            $semester
        );

        return response()->json($subjects);
    }
}