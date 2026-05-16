<?php

namespace Modules\Discipline\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Discipline\Models\Offense;

class OffenseController extends Controller
{
    public function index()
    {
        $offenses = Offense::with('category')->latest()->paginate(10);
        $categories = \Modules\Discipline\Models\OffenseCategory::all();
        return inertia('discipline/admin/offenses/index', compact('offenses', 'categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:dsc_offense_categories,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:dsc_offenses,code',
            'description' => 'nullable|string',
            'penalty_guideline' => 'nullable|string',
        ]);
        Offense::create($validated);
        return back()->with('success', 'Offense created.');
    }

    public function update(Request $request, Offense $offense)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:dsc_offense_categories,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:dsc_offenses,code,' . $offense->id,
            'description' => 'nullable|string',
            'penalty_guideline' => 'nullable|string',
        ]);
        $offense->update($validated);
        return back()->with('success', 'Offense updated.');
    }

    public function destroy(Offense $offense)
    {
        $offense->delete();
        return back()->with('success', 'Offense deleted.');
    }
}