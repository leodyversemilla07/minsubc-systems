<?php

namespace Modules\Research\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Research\Models\Defense;
use Modules\Research\Models\DefenseScore;
use Modules\Research\Models\Proposal;
class DefenseController extends Controller
{
    public function index(): InertiaResponse
    {
        $defenses = Defense::with('proposal')->latest()->paginate(15);
        return inertia('research/admin/defenses/index', compact('defenses'));
    }
    public function create(): InertiaResponse
    {
        $proposals = Proposal::whereIn('status', ['approved', 'in_progress'])->get(['id', 'title', 'proposal_code']);
        return inertia('research/admin/defenses/create', compact('proposals'));
    }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'proposal_id' => 'required|exists:res_proposals,id', 'stage' => 'required|in:proposal,pre_oral,final_defense,grand_defense',
            'scheduled_date' => 'required|date', 'start_time' => 'required', 'venue' => 'nullable|string|max:255',
        ]);
        Defense::create($validated);
        return redirect()->route('research.admin.defenses.index')->with('success', 'Defense scheduled.');
    }
    public function score(Request $request, Defense $defense): RedirectResponse
    {
        $validated = $request->validate(['criteria_scores' => 'required|json', 'total_score' => 'required|numeric|min:0|max:100', 'comments' => 'nullable|string']);
        DefenseScore::updateOrCreate(
            ['defense_id' => $defense->id, 'panelist_id' => auth()->id()],
            $validated
        );
        return redirect()->route('research.admin.defenses.index')->with('success', 'Score submitted.');
    }
    public function complete(Request $request, Defense $defense): RedirectResponse
    {
        $defense->update(['status' => 'completed', 'final_grade' => $request->final_grade, 'remarks' => $request->remarks, 'recommendations' => $request->recommendations, 'completed_at' => now()]);
        $defense->proposal->update(['status' => 'in_progress']);
        return redirect()->route('research.admin.defenses.index')->with('success', 'Defense completed.');
    }
}


