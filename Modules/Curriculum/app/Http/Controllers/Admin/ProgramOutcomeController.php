<?php

namespace Modules\Curriculum\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Curriculum\Models\ProgramOutcome;
use Modules\Curriculum\Models\Program;

class ProgramOutcomeController extends Controller
{
    public function index(): InertiaResponse
    {
        $outcomes = ProgramOutcome::with('program')->latest()->get();
        return inertia('curriculum/admin/learning-outcomes/index', compact('outcomes'));
    }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(['program_id' => 'required|exists:cur_programs,id', 'code' => 'required|string|max:10', 'description' => 'required|string', 'domain' => 'nullable|string']);
        ProgramOutcome::create($validated);
        return redirect()->route('curriculum.admin.program-outcomes.index')->with('success', 'Outcome created.');
    }
    public function update(Request $request, ProgramOutcome $programOutcome): RedirectResponse
    {
        $validated = $request->validate(['code' => 'required|string|max:10', 'description' => 'required|string', 'domain' => 'nullable|string']);
        $programOutcome->update($validated);
        return redirect()->route('curriculum.admin.program-outcomes.index')->with('success', 'Outcome updated.');
    }
    public function destroy(ProgramOutcome $programOutcome): RedirectResponse { $programOutcome->delete(); return redirect()->route('curriculum.admin.program-outcomes.index')->with('success', 'Outcome deleted.'); }
}


