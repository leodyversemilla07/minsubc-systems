<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Models\Subject;
use Modules\Admission\Models\Course;

class SubjectController extends Controller
{
    /**
     * Display a listing of subjects.
     */
    public function index(Request $request): Response
    {
        $subjects = Subject::with('course')
            ->when($request->course_id, fn ($q, $id) => $q->where('course_id', $id))
            ->when($request->year_level, fn ($q, $lvl) => $q->where('year_level', $lvl))
            ->when($request->semester, fn ($q, $sem) => $q->where('semester', $sem))
            ->when($request->search, fn ($q, $s) => $q->where(function ($q) use ($s) {
                $q->where('code', 'like', "%{$s}%")->orWhere('name', 'like', "%{$s}%");
            }))
            ->orderBy('course_id')
            ->orderBy('year_level')
            ->orderBy('code')
            ->paginate(15)
            ->withQueryString();

        $courses = Course::orderBy('name')->get(['id', 'code', 'name']);

        return Inertia::render('admission/admin/subjects/index', [
            'subjects' => $subjects,
            'courses' => $courses,
            'filters' => $request->only(['course_id', 'year_level', 'semester', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new subject.
     */
    public function create(Request $request): Response
    {
        $courses = Course::orderBy('name')->get(['id', 'code', 'name']);
        $selectedCourse = $request->course_id ? Course::find($request->course_id, ['id', 'code', 'name']) : null;

        return Inertia::render('admission/admin/subjects/create', [
            'courses' => $courses,
            'selectedCourse' => $selectedCourse,
        ]);
    }

    /**
     * Store a newly created subject.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'code' => 'required|string|max:20',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'units' => 'required|integer|min:1|max:10',
            'semester' => 'required|in:1st,2nd,Summer,All',
            'year_level' => 'required|integer|min:1|max:10',
            'type' => 'required|in:lec,lab,both',
            'lab_hours' => 'nullable|integer|min:0',
            'lec_hours' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        Subject::create($validated);

        return redirect()
            ->route('admission.admin.subjects.index')
            ->with('success', 'Subject created successfully.');
    }

    /**
     * Display the specified subject.
     */
    public function show(Subject $subject): Response
    {
        $subject->load('course');
        $schedules = $subject->schedules()->with(['section:id,name', 'instructor:id,name'])->get();

        return Inertia::render('admission/admin/subjects/show', [
            'subject' => $subject->toArray() + [
                'course' => $subject->course ? $subject->course->toArray() : null,
            ],
            'schedules' => $schedules,
        ]);
    }

    /**
     * Show the form for editing the specified subject.
     */
    public function edit(Subject $subject): Response
    {
        $courses = Course::orderBy('name')->get(['id', 'code', 'name']);
        $subject->load('course');

        return Inertia::render('admission/admin/subjects/edit', [
            'subject' => $subject->toArray() + [
                'course' => $subject->course ? $subject->course->toArray() : null,
            ],
            'courses' => $courses,
        ]);
    }

    /**
     * Update the specified subject.
     */
    public function update(Request $request, Subject $subject): RedirectResponse
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'code' => 'required|string|max:20',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'units' => 'required|integer|min:1|max:10',
            'semester' => 'required|in:1st,2nd,Summer,All',
            'year_level' => 'required|integer|min:1|max:10',
            'type' => 'required|in:lec,lab,both',
            'lab_hours' => 'nullable|integer|min:0',
            'lec_hours' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $subject->update($validated);

        return redirect()
            ->route('admission.admin.subjects.show', $subject)
            ->with('success', 'Subject updated successfully.');
    }

    /**
     * Remove the specified subject.
     */
    public function destroy(Subject $subject): RedirectResponse
    {
        if ($subject->schedules()->exists()) {
            return redirect()
                ->route('admission.admin.subjects.show', $subject)
                ->with('error', 'Cannot delete subject with associated schedules.');
        }

        $subject->delete();

        return redirect()
            ->route('admission.admin.subjects.index')
            ->with('success', 'Subject deleted successfully.');
    }

    /**
     * Get subjects for a course (API endpoint).
     */
    public function byCourse(int $courseId): \Illuminate\Http\JsonResponse
    {
        $subjects = Subject::where('course_id', $courseId)
            ->active()
            ->orderBy('year_level')
            ->orderBy('code')
            ->get();

        return response()->json($subjects);
    }

    /**
     * Get subjects for a course, year level and semester (API endpoint).
     */
    public function byCourseAndLevel(Request $request): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'year_level' => 'required|integer|min:1',
            'semester' => 'required|in:1st,2nd,Summer',
        ]);

        $subjects = Subject::where('course_id', $validated['course_id'])
            ->where('year_level', $validated['year_level'])
            ->where(function ($query) use ($validated) {
                $query->where('semester', $validated['semester'])
                    ->orWhere('semester', 'All');
            })
            ->active()
            ->orderBy('code')
            ->get();

        return response()->json($subjects);
    }
}