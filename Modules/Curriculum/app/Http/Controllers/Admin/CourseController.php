<?php

namespace Modules\Curriculum\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Curriculum\Models\Course;
use Modules\Curriculum\Models\Prerequisite;

class CourseController extends Controller
{
    public function index(): InertiaResponse
    {
        $courses = Course::withCount('prerequisites')->latest()->get();
        return inertia('curriculum/admin/courses/index', compact('courses'));
    }
    public function create(): InertiaResponse
    {
        $courses = Course::where('is_active', true)->get(['id', 'code', 'name']);
        return inertia('curriculum/admin/courses/create', compact('courses'));
    }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(['code' => 'required|string|max:20|unique:cur_courses,code', 'name' => 'required|string|max:255', 'description' => 'nullable|string', 'units' => 'required|numeric|min:0.5|max:20', 'lecture_hours' => 'nullable|numeric|min:0', 'lab_hours' => 'nullable|numeric|min:0', 'category' => 'required|in:major,general_education,elective,nstp,pe', 'is_lab' => 'boolean']);
        Course::create($validated);
        return redirect()->route('curriculum.admin.courses.index')->with('success', 'Course created.');
    }
    public function edit(Course $course): InertiaResponse
    {
        $allCourses = Course::where('is_active', true)->where('id', '!=', $course->id)->get(['id', 'code', 'name']);
        $course->load('prerequisites');
        return inertia('curriculum/admin/courses/edit', compact('course', 'allCourses'));
    }
    public function update(Request $request, Course $course): RedirectResponse
    {
        $validated = $request->validate(['code' => 'required|string|max:20|unique:cur_courses,code,' . $course->id, 'name' => 'required|string', 'description' => 'nullable|string', 'units' => 'required|numeric|min:0.5|max:20', 'lecture_hours' => 'nullable|numeric|min:0', 'lab_hours' => 'nullable|numeric|min:0', 'category' => 'required|in:major,general_education,elective,nstp,pe', 'is_lab' => 'boolean', 'is_active' => 'boolean']);
        $course->update($validated);
        return redirect()->route('curriculum.admin.courses.index')->with('success', 'Course updated.');
    }
    public function destroy(Course $course): RedirectResponse { $course->delete(); return redirect()->route('curriculum.admin.courses.index')->with('success', 'Course deleted.'); }
    public function addPrerequisite(Request $request, Course $course): RedirectResponse
    {
        $validated = $request->validate(['prerequisite_id' => 'required|exists:cur_courses,id|different:course_id', 'type' => 'required|in:required,recommended,corequisite']);
        Prerequisite::firstOrCreate(['course_id' => $course->id, 'prerequisite_id' => $validated['prerequisite_id']], ['type' => $validated['type']]);
        return redirect()->route('curriculum.admin.courses.edit', $course)->with('success', 'Prerequisite added.');
    }
    public function removePrerequisite(Course $course, Prerequisite $prerequisite): RedirectResponse { $prerequisite->delete(); return redirect()->route('curriculum.admin.courses.edit', $course)->with('success', 'Prerequisite removed.'); }
}


