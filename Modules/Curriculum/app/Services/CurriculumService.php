<?php

namespace Modules\Curriculum\Services;

use Modules\Curriculum\Models\Program;
use Modules\Curriculum\Models\Course;
use Modules\Curriculum\Models\Syllabus;
use Modules\Curriculum\Models\Curriculum;
use Modules\Curriculum\Models\ProgramOutcome;
use Modules\Curriculum\Models\CourseOutcome;

class CurriculumService
{
    public function getDashboardStats(): array
    {
        return [
            'total_programs' => Program::where('is_active', true)->count(),
            'total_courses' => Course::where('is_active', true)->count(),
            'total_curricula' => Curriculum::count(),
            'total_syllabi' => Syllabus::count(),
            'published_syllabi' => Syllabus::where('status', 'published')->count(),
            'draft_syllabi' => Syllabus::where('status', 'draft')->count(),
            'total_program_outcomes' => ProgramOutcome::count(),
            'total_course_outcomes' => CourseOutcome::count(),
            'programs' => Program::withCount(['curricula', 'outcomes'])->where('is_active', true)->get(),
            'recent_syllabi' => Syllabus::with('course')->latest()->take(5)->get(),
            'recent_curricula' => Curriculum::with('program')->latest()->take(5)->get(),
        ];
    }

    public function getCurriculumMap(): array
    {
        $programs = Program::with(['outcomes', 'curricula.courses.course.syllabi.courseOutcomes.mappings'])->where('is_active', true)->get();
        return compact('programs');
    }

    public function getSyllabusStatus(): array
    {
        $courses = Course::withCount(['syllabi', 'syllabi as published_syllabi' => fn($q) => $q->where('status', 'published')])
            ->where('is_active', true)
            ->get();
        $total = Course::where('is_active', true)->count();
        $withSyllabi = $courses->filter(fn($c) => $c->syllabi_count > 0)->count();
        $published = $courses->filter(fn($c) => $c->published_syllabi > 0)->count();
        return compact('courses', 'total', 'withSyllabi', 'published');
    }
}