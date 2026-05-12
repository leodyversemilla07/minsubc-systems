<?php

namespace Modules\Research\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Research\Models\Journal;
use Modules\Research\Models\JournalIssue;
class JournalController extends Controller
{
    public function index(): InertiaResponse { return inertia('research/admin/journals/index', ['journals' => Journal::withCount('issues')->get()]); }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(['name' => 'required|string|max:255', 'issn' => 'nullable|string|max:20', 'publisher' => 'nullable|string', 'frequency' => 'required|in:annual,semiannual,quarterly']);
        Journal::create($validated);
        return redirect()->route('research.admin.journals.index')->with('success', 'Journal created.');
    }
    public function show(Journal $journal): InertiaResponse { $journal->load('issues'); return inertia('research/admin/journals/show', compact('journal')); }
}


