<?php

namespace Modules\Discipline\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Discipline\Models\Appeal;

class AppealController extends Controller
{
    public function index()
    {
        $appeals = Appeal::with('incident.student', 'incident.offense', 'reviewer')
            ->latest()->paginate(10);
        return inertia('discipline/admin/appeals/index', compact('appeals'));
    }

    public function show(Appeal $appeal)
    {
        $appeal->load('incident.student', 'incident.offense', 'incident.sanction', 'reviewer');
        return inertia('discipline/admin/appeals/show', compact('appeal'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'incident_id' => 'required|exists:dsc_incidents,id',
            'appeal_date' => 'required|date',
            'reason' => 'required|string',
        ]);
        $validated['status'] = 'pending';
        Appeal::create($validated);
        return back()->with('success', 'Appeal filed.');
    }

    public function review(Request $request, Appeal $appeal)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
            'review_notes' => 'nullable|string',
        ]);
        $validated['reviewed_by'] = auth()->id();
        $validated['review_date'] = now();
        $appeal->update($validated);
        return back()->with('success', 'Appeal reviewed.');
    }
}