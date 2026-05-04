<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Models\AdmissionProgram;
use Modules\Admission\Models\Course;

class ProgramController extends Controller
{
    public function index(): Response
    {
        $programs = AdmissionProgram::with('course')
            ->withCount('applicants')
            ->latest()
            ->paginate(20)
            ->through(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'course' => $p->course->code,
                'academic_year' => $p->academic_year,
                'semester' => $p->semester,
                'slots' => $p->slots,
                'slots_filled' => $p->slots_filled,
                'slots_available' => $p->slots_available,
                'status' => $p->status,
                'applicants_count' => $p->applicants_count,
                'application_period' => $p->application_start->format('M d') . ' - ' . $p->application_end->format('M d, Y'),
            ]);

        return Inertia::render('admission/admin/programs/index', ['programs' => $programs]);
    }

    public function create(): Response
    {
        $courses = Course::active()->get()->map(fn($c) => ['id' => $c->id, 'code' => $c->code, 'name' => $c->name]);
        return Inertia::render('admission/admin/programs/create', ['courses' => $courses]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => ['required', 'exists:courses,id'],
            'academic_year' => ['required', 'string', 'max:20'],
            'semester' => ['required', 'in:1st,2nd,Summer'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'slots' => ['required', 'integer', 'min:1', 'max:9999'],
            'application_start' => ['required', 'date'],
            'application_end' => ['required', 'date', 'after:application_start'],
            'status' => ['required', 'in:open,closed,full'],
        ]);

        AdmissionProgram::create($validated);

        return redirect()->route('admission.admin.programs.index')
            ->with('success', 'Program created successfully.');
    }

    public function edit(int $id): Response
    {
        $program = AdmissionProgram::with('course')->findOrFail($id);
        $courses = Course::active()->get()->map(fn($c) => ['id' => $c->id, 'code' => $c->code, 'name' => $c->name]);

        return Inertia::render('admission/admin/programs/edit', [
            'program' => $program,
            'courses' => $courses,
        ]);
    }

    public function update(Request $request, int $id)
    {
        $program = AdmissionProgram::findOrFail($id);

        $validated = $request->validate([
            'course_id' => ['required', 'exists:courses,id'],
            'academic_year' => ['required', 'string', 'max:20'],
            'semester' => ['required', 'in:1st,2nd,Summer'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'slots' => ['required', 'integer', 'min:1', 'max:9999'],
            'application_start' => ['required', 'date'],
            'application_end' => ['required', 'date', 'after:application_start'],
            'status' => ['required', 'in:open,closed,full'],
        ]);

        $program->update($validated);

        return redirect()->route('admission.admin.programs.index')
            ->with('success', 'Program updated successfully.');
    }
}
