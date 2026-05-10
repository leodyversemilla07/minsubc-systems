<?php

namespace Modules\HR\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\HR\Models\Position;

class PositionController extends Controller
{
    public function index(): InertiaResponse
    {
        $positions = Position::withCount('employees')->latest()->get();
        return inertia('hr/admin/positions/index', compact('positions'));
    }

    public function create(): InertiaResponse
    {
        return inertia('hr/admin/positions/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|in:faculty,staff,executive',
            'employment_type' => 'required|in:full-time,part-time,contractual',
            'description' => 'nullable|string',
            'salary_grade_min' => 'nullable|numeric|min:0',
            'salary_grade_max' => 'nullable|numeric|min:0|gte:salary_grade_min',
        ]);

        Position::create($validated);

        return redirect()->route('hr.admin.positions.index')
            ->with('success', 'Position created.');
    }

    public function edit(Position $position): InertiaResponse
    {
        return inertia('hr/admin/positions/edit', compact('position'));
    }

    public function update(Request $request, Position $position): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|in:faculty,staff,executive',
            'employment_type' => 'required|in:full-time,part-time,contractual',
            'description' => 'nullable|string',
            'salary_grade_min' => 'nullable|numeric|min:0',
            'salary_grade_max' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $position->update($validated);

        return redirect()->route('hr.admin.positions.index')
            ->with('success', 'Position updated.');
    }

    public function destroy(Position $position): RedirectResponse
    {
        if ($position->employees()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete position with employees.');
        }
        $position->delete();
        return redirect()->route('hr.admin.positions.index')->with('success', 'Position deleted.');
    }
}