<?php

namespace Modules\Curriculum\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Curriculum\Models\Curriculum;
use Modules\Curriculum\Models\CurriculumCourse;
use Modules\Curriculum\Models\Course;
use Modules\Curriculum\Models\Program;

class CurriculumController extends Controller
{
    public function index(): InertiaResponse
    {
        $curricula = Curriculum::with('program')->latest()->get();
        return inertia('curriculum/admin/curricula/index', compact('curricula'));
    }
    public function create(): InertiaResponse
    {
        $programs = Program::where('is_active', true)->get(['id', 'code', 'name']);
        return inertia('curriculum/admin/curricula/create', compact('programs'));
    }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(['program_id' => 'required|exists:cur_programs,id', 'version_name' => 'required|string|max:255', 'academic_year' => 'nullable|string|max:20', 'description' => 'nullable|string', 'effective_date' => 'nullable|date']);
        Curriculum::create($validated);
        return redirect()->route('curriculum.admin.curricula.index')->with('success', 'Curriculum created.');
    }
    public function show(Curriculum $curriculum): InertiaResponse
    {
        $curriculum->load(['program', 'courses.course']);
        $allCourses = Course::where('is_active', true)->get(['id', 'code', 'name', 'units']);
        return inertia('curriculum/admin/curricula/show', compact('curriculum', 'allCourses'));
    }
    public function publish(Curriculum $curriculum): RedirectResponse
    {
        $curriculum->update(['status' => 'published', 'approved_at' => now(), 'approved_by' => auth()->id()]);
        return redirect()->route('curriculum.admin.curricula.show', $curriculum)->with('success', 'Curriculum published.');
    }
    public function addCourse(Request $request, Curriculum $curriculum): RedirectResponse
    {
        $validated = $request->validate(['course_id' => 'required|exists:cur_courses,id', 'year_level' => 'required|integer|min:1|max:10', 'semester' => 'required|in:1st,2nd,summer', 'is_elective' => 'boolean']);
        $validated['curriculum_id'] = $curriculum->id;
        CurriculumCourse::create($validated);
        return redirect()->route('curriculum.admin.curricula.show', $curriculum)->with('success', 'Course added to curriculum.');
    }
    public function removeCourse(Curriculum $curriculum, CurriculumCourse $curriculumCourse): RedirectResponse
    {
        $curriculumCourse->delete();
        return redirect()->route('curriculum.admin.curricula.show', $curriculum)->with('success', 'Course removed.');
    }
}


