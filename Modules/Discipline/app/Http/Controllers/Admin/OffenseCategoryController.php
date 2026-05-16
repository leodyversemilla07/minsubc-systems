<?php

namespace Modules\Discipline\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Discipline\Models\OffenseCategory;

class OffenseCategoryController extends Controller
{
    public function index()
    {
        $categories = OffenseCategory::withCount('offenses')->latest()->paginate(10);
        return inertia('discipline/admin/offense-categories/index', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'tier' => 'required|in:minor,major,grave',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:7',
        ]);
        OffenseCategory::create($validated);
        return back()->with('success', 'Category created.');
    }

    public function update(Request $request, OffenseCategory $offenseCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'tier' => 'required|in:minor,major,grave',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:7',
        ]);
        $offenseCategory->update($validated);
        return back()->with('success', 'Category updated.');
    }

    public function destroy(OffenseCategory $offenseCategory)
    {
        $offenseCategory->delete();
        return back()->with('success', 'Category deleted.');
    }
}