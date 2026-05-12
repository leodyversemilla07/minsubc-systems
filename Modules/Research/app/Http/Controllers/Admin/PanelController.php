<?php

namespace Modules\Research\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Research\Models\Panel;
class PanelController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(['proposal_id' => 'required|exists:res_proposals,id', 'panelist_id' => 'required|exists:users,id', 'role' => 'required|in:chair,member,secretary', 'designation' => 'nullable|string']);
        Panel::create($validated);
        return redirect()->route('research.admin.proposals.show', $validated['proposal_id'])->with('success', 'Panel member added.');
    }
    public function assignChair(Panel $panel): RedirectResponse
    {
        Panel::where('proposal_id', $panel->proposal_id)->where('role', 'chair')->update(['role' => 'member']);
        $panel->update(['role' => 'chair']);
        return redirect()->route('research.admin.proposals.show', $panel->proposal_id)->with('success', 'Panel chair assigned.');
    }
}


