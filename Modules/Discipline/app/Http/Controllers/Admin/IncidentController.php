<?php

namespace Modules\Discipline\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Discipline\Models\Incident;
use Modules\Discipline\Models\Offense;

class IncidentController extends Controller
{
    public function index()
    {
        $incidents = Incident::with('student', 'offense.category', 'reporter')
            ->latest()->paginate(10);
        return inertia('discipline/admin/incidents/index', compact('incidents'));
    }

    public function create()
    {
        $offenses = Offense::with('category')->get();
        return inertia('discipline/admin/incidents/create', compact('offenses'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|string|exists:students,student_id',
            'offense_id' => 'required|exists:dsc_offenses,id',
            'incident_date' => 'required|date',
            'location' => 'nullable|string|max:255',
            'description' => 'required|string',
        ]);
        $validated['reported_by'] = auth()->id();
        $validated['status'] = 'pending';
        Incident::create($validated);
        return redirect()->route('discipline.admin.incidents.index')
            ->with('success', 'Incident reported.');
    }

    public function show(Incident $incident)
    {
        $incident->load('student', 'offense.category', 'reporter', 'sanction', 'appeals.reviewer');
        return inertia('discipline/admin/incidents/show', compact('incident'));
    }

    public function update(Request $request, Incident $incident)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,investigating,resolved,dismissed',
            'resolution' => 'nullable|string',
        ]);
        $incident->update($validated);
        return back()->with('success', 'Incident updated.');
    }
}