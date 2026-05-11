<?php

namespace Modules\Curriculum\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\Curriculum\Models\Program;
use Modules\Curriculum\Models\Course;
use Modules\Curriculum\Models\Syllabus;

class CurriculumController extends Controller
{
    public function index(): InertiaResponse
    {
        $stats = [
            'programs' => Program::where('is_active', true)->count(),
            'courses' => Course::where('is_active', true)->count(),
            'syllabi' => Syllabus::count(),
        ];
        return inertia('curriculum/index', compact('stats'));
    }

    public function programs(): InertiaResponse
    {
        $programs = Program::where('is_active', true)->get();
        return inertia('curriculum/programs', compact('programs'));
    }

    public function courses(): InertiaResponse
    {
        $courses = Course::where('is_active', true)->get();
        return inertia('curriculum/courses', compact('courses'));
    }

    public function viewSyllabus(Syllabus $syllabus): InertiaResponse
    {
        $syllabus->load(['course', 'courseOutcomes', 'textbooks']);
        return inertia('curriculum/syllabi/view', compact('syllabus'));
    }
}