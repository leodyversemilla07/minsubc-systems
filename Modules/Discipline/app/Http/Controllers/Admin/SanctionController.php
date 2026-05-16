<?php

namespace Modules\Discipline\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Discipline\Models\Sanction;

class SanctionController extends Controller
{
    public function index()
    {
        $sanctions = Sanction::with('incident.student', 'incident.offense', 'issuer')
            ->latest()->paginate(10);
        return inertia('discipline/admin/sanctions/index', compact('sanctions'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'incident_id' => 'required|exists:dsc_incidents,id',
            'type' => 'required|in:warning,suspension,community_service,probation,expulsion',
            'description' => 'required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);
        $validated['issued_by'] = auth()->id();
        $validated['status'] = 'active';
        Sanction::create($validated);
        return back()->with('success', 'Sanction applied.');
    }

    public function update(Request $request, Sanction $sanction)
    {
        $validated = $request->validate([
            'status' => 'required|in:active,completed,revoked',
            'notes' => 'nullable|string',
        ]);
        $sanction->update($validated);
        return back()->with('success', 'Sanction updated.');
    }
}