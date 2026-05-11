<?php

namespace Modules\Curriculum\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Curriculum\Models\Syllabus;
use Modules\Curriculum\Models\CourseOutcome;
use Modules\Curriculum\Models\CoPoMapping;
use Modules\Curriculum\Models\ProgramOutcome;
use Modules\Curriculum\Models\SyllabusTextbook;
use Modules\Curriculum\Models\Textbook;
use Modules\Curriculum\Models\Course;

class SyllabusController extends Controller
{
    public function index(): InertiaResponse
    {
        $syllabi = Syllabus::with('course')->latest()->get();
        return inertia('curriculum/admin/syllabi/index', compact('syllabi'));
    }
    public function create(): InertiaResponse
    {
        $courses = Course::where('is_active', true)->get(['id', 'code', 'name']);
        return inertia('curriculum/admin/syllabi/create', compact('courses'));
    }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(['course_id' => 'required|exists:cur_courses,id', 'version' => 'nullable|string|max:10', 'academic_year' => 'nullable|string|max:20', 'semester' => 'nullable|string|max:20', 'course_description' => 'nullable|string', 'learning_objectives' => 'nullable|string', 'grading_system' => 'nullable|string']);
        $validated['prepared_by'] = auth()->id();
        Syllabus::create($validated);
        return redirect()->route('curriculum.admin.syllabi.index')->with('success', 'Syllabus created.');
    }
    public function show(Syllabus $syllabus): InertiaResponse
    {
        $syllabus->load(['course', 'courseOutcomes', 'textbooks', 'courseOutcomes.mappings.programOutcome']);
        $programOutcomes = ProgramOutcome::with('program')->get();
        $textbooks = Textbook::all();
        return inertia('curriculum/admin/syllabi/show', compact('syllabus', 'programOutcomes', 'textbooks'));
    }
    public function publish(Syllabus $syllabus): RedirectResponse
    {
        $syllabus->update(['status' => 'published', 'approved_at' => now(), 'approved_by' => auth()->id()]);
        return redirect()->route('curriculum.admin.syllabi.show', $syllabus)->with('success', 'Syllabus published.');
    }
    public function addCourseOutcome(Request $request, Syllabus $syllabus): RedirectResponse
    {
        $validated = $request->validate(['code' => 'required|string|max:10', 'description' => 'required|string', 'domain' => 'nullable|string']);
        $validated['syllabus_id'] = $syllabus->id;
        CourseOutcome::create($validated);
        return redirect()->route('curriculum.admin.syllabi.show', $syllabus)->with('success', 'Course outcome added.');
    }
    public function removeCourseOutcome(Syllabus $syllabus, CourseOutcome $courseOutcome): RedirectResponse { $courseOutcome->delete(); return redirect()->route('curriculum.admin.syllabi.show', $syllabus)->with('success', 'Course outcome removed.'); }
    public function mapOutcomes(Request $request, Syllabus $syllabus): RedirectResponse
    {
        $validated = $request->validate(['mappings' => 'required|array', 'mappings.*.course_outcome_id' => 'required|exists:cur_course_outcomes,id', 'mappings.*.program_outcome_id' => 'required|exists:cur_program_outcomes,id', 'mappings.*.strength' => 'required|in:low,moderate,strong']);
        foreach ($validated['mappings'] as $m) {
            CoPoMapping::updateOrCreate(
                ['course_outcome_id' => $m['course_outcome_id'], 'program_outcome_id' => $m['program_outcome_id']],
                ['strength' => $m['strength']]
            );
        }
        return redirect()->route('curriculum.admin.syllabi.show', $syllabus)->with('success', 'Outcomes mapped.');
    }
    public function addTextbook(Request $request, Syllabus $syllabus): RedirectResponse
    {
        $validated = $request->validate(['textbook_id' => 'required|exists:cur_textbooks,id', 'type' => 'required|in:required,recommended']);
        SyllabusTextbook::firstOrCreate(['syllabus_id' => $syllabus->id, 'textbook_id' => $validated['textbook_id']], ['type' => $validated['type']]);
        return redirect()->route('curriculum.admin.syllabi.show', $syllabus)->with('success', 'Textbook added.');
    }
    public function removeTextbook(Syllabus $syllabus, SyllabusTextbook $syllabusTextbook): RedirectResponse { $syllabusTextbook->delete(); return redirect()->route('curriculum.admin.syllabi.show', $syllabus)->with('success', 'Textbook removed.'); }
}


