<?php

namespace Modules\Research\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Research\Models\JournalIssue;
class JournalIssueController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(['journal_id' => 'required|exists:res_journals,id', 'title' => 'required|string', 'volume' => 'nullable|string', 'issue' => 'nullable|string', 'year' => 'nullable|integer']);
        JournalIssue::create($validated);
        return redirect()->route('research.admin.journals.show', $validated['journal_id'])->with('success', 'Issue created.');
    }
}


