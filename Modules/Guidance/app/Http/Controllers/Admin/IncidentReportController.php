<?php

namespace Modules\Guidance\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Guidance\Models\Counselor;
use Modules\Guidance\Models\Appointment;
use Modules\Guidance\Models\AppointmentSlot;
use Modules\Guidance\Models\CounselingSession;
use Modules\Guidance\Models\Assessment;
use Modules\Guidance\Models\Referral;
use Modules\Guidance\Models\Intervention;
use Modules\Guidance\Models\IncidentReport;
use Modules\Guidance\Models\InterventionParticipant;
use Modules\Guidance\Services\GuidanceService;
use App\Models\Student;

class IncidentReportController extends Controller
{
    public function index(): InertiaResponse
    {
        $reports = IncidentReport::with('student')
            ->latest()->paginate(15);
        return inertia('guidance/admin/incident-reports/index', compact('reports'));
    }

    public function create(): InertiaResponse
    {
        return inertia('guidance/admin/incident-reports/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,student_id',
            'type' => 'required|in:behavioral,academic,disciplinary,concern',
            'incident_date' => 'required|date',
            'description' => 'required|string',
            'severity' => 'required|in:minor,moderate,serious,critical',
            'location' => 'nullable|string|max:255',
            'action_taken' => 'nullable|string',
        ]);
        $validated['incident_code'] = 'INC-' . now()->format('Ymd') . '-' . str_pad((IncidentReport::max('id') ?? 0) + 1, 4, '0', STR_PAD_LEFT);
        $validated['reported_by'] = auth()->id();
        IncidentReport::create($validated);
        return redirect()->route('guidance.admin.incident-reports.index')->with('success', 'Incident report created.');
    }

    public function show(IncidentReport $incidentReport): InertiaResponse
    {
        $incidentReport->load('student', 'reporter');
        return inertia('guidance/admin/incident-reports/show', compact('incidentReport'));
    }

    public function resolve(Request $request, IncidentReport $incidentReport): RedirectResponse
    {
        $validated = $request->validate(['resolution' => 'required|string']);
        $incidentReport->update(['status' => 'resolved', 'action_taken' => $validated['resolution']]);
        return redirect()->route('guidance.admin.incident-reports.index')->with('success', 'Incident resolved.');
    }
}

