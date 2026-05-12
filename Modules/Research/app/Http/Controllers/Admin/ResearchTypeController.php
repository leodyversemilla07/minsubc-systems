<?php

namespace Modules\Research\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Research\Models\ResearchType;
class ResearchTypeController extends Controller
{
    public function index(): InertiaResponse { return inertia('research/admin/research-types/index', ['types' => ResearchType::all()]); }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(['name' => 'required|string|max:255', 'code' => 'required|string|max:20|unique:res_research_types', 'description' => 'nullable|string']);
        ResearchType::create($validated);
        return redirect()->route('research.admin.research-types.index')->with('success', 'Research type created.');
    }
    public function update(Request $request, ResearchType $researchType): RedirectResponse
    {
        $validated = $request->validate(['name' => 'required|string', 'code' => 'required|string|max:20|unique:res_research_types,code,' . $researchType->id, 'description' => 'nullable|string', 'is_active' => 'boolean']);
        $researchType->update($validated);
        return redirect()->route('research.admin.research-types.index')->with('success', 'Research type updated.');
    }
    public function destroy(ResearchType $researchType): RedirectResponse { $researchType->delete(); return redirect()->route('research.admin.research-types.index')->with('success', 'Research type deleted.'); }
}


