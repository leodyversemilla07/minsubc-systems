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

class InterventionController extends Controller
{
    public function index(): InertiaResponse
    {
        $interventions = Intervention::withCount('participants')->latest()->get();
        return inertia('guidance/admin/interventions/index', compact('interventions'));
    }

    public function create(): InertiaResponse
    {
        return inertia('guidance/admin/interventions/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:workshop,seminar,group_therapy,individual,peer_support',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'location' => 'nullable|string|max:255',
            'max_participants' => 'nullable|integer|min:1',
        ]);
        Intervention::create($validated);
        return redirect()->route('guidance.admin.interventions.index')->with('success', 'Intervention created.');
    }

    public function show(Intervention $intervention): InertiaResponse
    {
        $intervention->load(['participants.student']);
        return inertia('guidance/admin/interventions/show', compact('intervention'));
    }

    public function manageParticipants(Request $request, Intervention $intervention): RedirectResponse
    {
        $validated = $request->validate([
            'students' => 'required|array',
            'students.*' => 'exists:students,student_id',
        ]);
        foreach ($validated['students'] as $studentId) {
            InterventionParticipant::firstOrCreate([
                'intervention_id' => $intervention->id,
                'student_id' => $studentId,
            ]);
        }
        return redirect()->route('guidance.admin.interventions.show', $intervention)->with('success', 'Participants added.');
    }
}

