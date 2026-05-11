<?php

namespace Modules\Curriculum\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Curriculum\Models\Program;

class ProgramController extends Controller
{
    public function index(): InertiaResponse
    {
        $programs = Program::withCount(['curricula', 'outcomes'])->latest()->get();
        return inertia('curriculum/admin/programs/index', compact('programs'));
    }
    public function create(): InertiaResponse { return inertia('curriculum/admin/programs/create'); }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(['code' => 'required|string|max:20|unique:cur_programs,code', 'name' => 'required|string|max:255', 'full_name' => 'nullable|string', 'level' => 'required|in:undergraduate,graduate,postgraduate,short_course', 'college' => 'nullable|string', 'years' => 'required|integer|min:1|max:10', 'description' => 'nullable|string', 'objectives' => 'nullable|string', 'career_opportunities' => 'nullable|string']);
        Program::create($validated);
        return redirect()->route('curriculum.admin.programs.index')->with('success', 'Program created.');
    }
    public function edit(Program $program): InertiaResponse { return inertia('curriculum/admin/programs/edit', compact('program')); }
    public function update(Request $request, Program $program): RedirectResponse
    {
        $validated = $request->validate(['code' => 'required|string|max:20|unique:cur_programs,code,' . $program->id, 'name' => 'required|string', 'full_name' => 'nullable|string', 'level' => 'required|in:undergraduate,graduate,postgraduate,short_course', 'college' => 'nullable|string', 'years' => 'required|integer|min:1|max:10', 'description' => 'nullable|string', 'objectives' => 'nullable|string', 'career_opportunities' => 'nullable|string', 'is_active' => 'boolean']);
        $program->update($validated);
        return redirect()->route('curriculum.admin.programs.index')->with('success', 'Program updated.');
    }
    public function destroy(Program $program): RedirectResponse { $program->delete(); return redirect()->route('curriculum.admin.programs.index')->with('success', 'Program deleted.'); }
}


