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

class DashboardController extends Controller
{
    public function __construct(
        protected GuidanceService $guidanceService
    ) {}

    public function index(): InertiaResponse
    {
        $stats = $this->guidanceService->getDashboardStats();
        return inertia('guidance/admin/dashboard/index', compact('stats'));
    }
}

class CounselorController extends Controller
{
    public function index(): InertiaResponse
    {
        $counselors = Counselor::withCount(['appointments', 'sessions'])->latest()->get();
        return inertia('guidance/admin/counselors/index', compact('counselors'));
    }

    public function create(): InertiaResponse
    {
        return inertia('guidance/admin/counselors/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'counselor_id' => 'required|string|max:20|unique:gdn_counselors,counselor_id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:gdn_counselors,email',
            'phone' => 'nullable|string|max:20',
            'specialization' => 'nullable|string|max:100',
            'bio' => 'nullable|string',
        ]);
        Counselor::create($validated);
        return redirect()->route('guidance.admin.counselors.index')->with('success', 'Counselor created.');
    }

    public function edit(Counselor $counselor): InertiaResponse
    {
        return inertia('guidance/admin/counselors/edit', compact('counselor'));
    }

    public function update(Request $request, Counselor $counselor): RedirectResponse
    {
        $validated = $request->validate([
            'counselor_id' => 'required|string|max:20|unique:gdn_counselors,counselor_id,' . $counselor->id,
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:gdn_counselors,email,' . $counselor->id,
            'phone' => 'nullable|string|max:20',
            'specialization' => 'nullable|string|max:100',
            'bio' => 'nullable|string',
            'is_available' => 'boolean',
            'is_active' => 'boolean',
        ]);
        $counselor->update($validated);
        return redirect()->route('guidance.admin.counselors.index')->with('success', 'Counselor updated.');
    }

    public function destroy(Counselor $counselor): RedirectResponse
    {
        $counselor->delete();
        return redirect()->route('guidance.admin.counselors.index')->with('success', 'Counselor deleted.');
    }

    public function listAvailable()
    {
        return response()->json(Counselor::where('is_available', true)->where('is_active', true)->get(['id', 'counselor_id', 'first_name', 'last_name', 'specialization']));
    }
}

class AppointmentSlotController extends Controller
{
    public function index(): InertiaResponse
    {
        $slots = AppointmentSlot::with('counselor:id,first_name,last_name')
            ->whereDate('date', '>=', now())
            ->orderBy('date')
            ->orderBy('start_time')
            ->paginate(20);
        return inertia('guidance/admin/slots/index', compact('slots'));
    }

    public function create(): InertiaResponse
    {
        $counselors = Counselor::where('is_available', true)->where('is_active', true)->get(['id', 'first_name', 'last_name', 'specialization']);
        return inertia('guidance/admin/slots/create', compact('counselors'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'counselor_id' => 'required|exists:gdn_counselors,id',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'max_students' => 'required|integer|min:1|max:50',
            'location' => 'nullable|string|max:255',
            'type' => 'required|in:individual,group',
        ]);
        AppointmentSlot::create($validated);
        return redirect()->route('guidance.admin.slots.index')->with('success', 'Slot created.');
    }

    public function destroy(AppointmentSlot $slot): RedirectResponse
    {
        if ($slot->appointments()->whereIn('status', ['scheduled', 'confirmed'])->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete slot with active appointments.');
        }
        $slot->delete();
        return redirect()->route('guidance.admin.slots.index')->with('success', 'Slot deleted.');
    }

    public function availableSlots(Request $request)
    {
        $slots = AppointmentSlot::with('counselor:id,first_name,last_name')
            ->whereDate('date', '>=', now())
            ->where('is_available', true)
            ->whereRaw('booked_count < max_students')
            ->when($request->counselor_id, fn ($q, $id) => $q->where('counselor_id', $id))
            ->get();
        return response()->json($slots);
    }
}

class AppointmentController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $appointments = Appointment::with(['student', 'counselor', 'slot'])
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->date, fn ($q, $d) => $q->whereDate('created_at', $d))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return inertia('guidance/admin/appointments/index', [
            'appointments' => $appointments,
            'filters' => $request->only(['status', 'date']),
        ]);
    }

    public function show(Appointment $appointment): InertiaResponse
    {
        $appointment->load(['student', 'counselor', 'slot', 'session']);
        return inertia('guidance/admin/appointments/show', compact('appointment'));
    }

    public function confirm(Appointment $appointment): RedirectResponse
    {
        $appointment->update(['status' => 'confirmed', 'confirmed_at' => now()]);
        return redirect()->route('guidance.admin.appointments.show', $appointment)->with('success', 'Appointment confirmed.');
    }

    public function complete(Appointment $appointment): RedirectResponse
    {
        $appointment->update(['status' => 'completed', 'completed_at' => now()]);
        return redirect()->route('guidance.admin.appointments.show', $appointment)->with('success', 'Appointment completed.');
    }

    public function cancel(Request $request, Appointment $appointment): RedirectResponse
    {
        $validated = $request->validate(['reason' => 'required|string']);
        $appointment->update(['status' => 'cancelled', 'cancellation_reason' => $validated['reason']]);
        $appointment->slot()->decrement('booked_count');
        return redirect()->route('guidance.admin.appointments.index')->with('success', 'Appointment cancelled.');
    }

    public function noShow(Appointment $appointment): RedirectResponse
    {
        $appointment->update(['status' => 'no_show']);
        return redirect()->route('guidance.admin.appointments.index')->with('success', 'Marked as no-show.');
    }
}

class CounselingSessionController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $sessions = CounselingSession::with(['student', 'counselor'])
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->risk_level, fn ($q, $r) => $q->where('risk_level', $r))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return inertia('guidance/admin/sessions/index', [
            'sessions' => $sessions,
            'filters' => $request->only(['status', 'risk_level']),
        ]);
    }

    public function create(): InertiaResponse
    {
        $counselors = Counselor::where('is_active', true)->get(['id', 'first_name', 'last_name']);
        $students = Student::where('is_active', true)->get(['id', 'student_id', 'first_name', 'last_name']);
        return inertia('guidance/admin/sessions/create', compact('counselors', 'students'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,student_id',
            'counselor_id' => 'required|exists:gdn_counselors,id',
            'type' => 'required|in:individual,group,family,career',
            'session_type' => 'required|in:initial,follow_up,emergency,termination',
            'concern' => 'nullable|string',
            'observations' => 'nullable|string',
            'interventions' => 'nullable|string',
            'recommendations' => 'nullable|string',
            'mood' => 'nullable|string',
            'risk_level' => 'required|in:none,low,moderate,high,critical',
            'requires_follow_up' => 'boolean',
            'follow_up_date' => 'nullable|date|after_or_equal:today',
            'follow_up_notes' => 'nullable|string',
        ]);
        $validated['session_code'] = 'SES-' . now()->format('Ymd') . '-' . str_pad((CounselingSession::max('id') ?? 0) + 1, 4, '0', STR_PAD_LEFT);
        $validated['status'] = 'completed';

        CounselingSession::create($validated);
        return redirect()->route('guidance.admin.sessions.index')->with('success', 'Session recorded.');
    }

    public function show(CounselingSession $session): InertiaResponse
    {
        $session->load(['student', 'counselor', 'appointment']);
        return inertia('guidance/admin/sessions/show', compact('session'));
    }

    public function searchStudents(Request $request)
    {
        $q = $request->q;
        return response()->json(Student::where(function ($query) use ($q) {
            $query->where('first_name', 'like', "%{$q}%")
                ->orWhere('last_name', 'like', "%{$q}%")
                ->orWhere('student_id', 'like', "%{$q}%");
        })->take(10)->get(['id', 'student_id', 'first_name', 'last_name']));
    }
}

class AssessmentController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $assessments = Assessment::with('student')
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->type, fn ($q, $t) => $q->where('type', $t))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return inertia('guidance/admin/assessments/index', [
            'assessments' => $assessments,
            'filters' => $request->only(['status', 'type']),
        ]);
    }

    public function show(Assessment $assessment): InertiaResponse
    {
        $assessment->load(['student', 'counselor']);
        return inertia('guidance/admin/assessments/show', compact('assessment'));
    }

    public function review(Request $request, Assessment $assessment): RedirectResponse
    {
        $validated = $request->validate([
            'score' => 'nullable|integer|min:0|max:100',
            'interpretation' => 'nullable|string',
        ]);
        $validated['reviewed_at'] = now();
        $validated['status'] = 'reviewed';
        $validated['counselor_id'] = $request->user()->counselor?->id ?? Counselor::where('user_id', auth()->id())->first()?->id;
        $assessment->update($validated);
        return redirect()->route('guidance.admin.assessments.show', $assessment)->with('success', 'Assessment reviewed.');
    }
}

class ReferralController extends Controller
{
    public function index(): InertiaResponse
    {
        $referrals = Referral::with(['student', 'referrer'])
            ->latest()->paginate(15);
        return inertia('guidance/admin/referrals/index', compact('referrals'));
    }

    public function create(): InertiaResponse
    {
        $counselors = Counselor::where('is_active', true)->get(['id', 'first_name', 'last_name']);
        return inertia('guidance/admin/referrals/create', compact('counselors'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,student_id',
            'referred_to' => 'nullable|exists:gdn_counselors,id',
            'external_agency' => 'nullable|string|max:255',
            'reason' => 'required|string|max:255',
            'details' => 'nullable|string',
            'urgency' => 'required|in:normal,urgent,emergency',
        ]);
        $validated['referral_code'] = 'REF-' . now()->format('Ymd') . '-' . str_pad((Referral::max('id') ?? 0) + 1, 4, '0', STR_PAD_LEFT);
        $validated['referred_by'] = Counselor::where('user_id', auth()->id())->first()?->id ?? $request->user()->counselor?->id;
        if (!$validated['referred_to'] && !$validated['external_agency']) {
            return redirect()->back()->with('error', 'Specify either internal counselor or external agency.');
        }
        Referral::create($validated);
        return redirect()->route('guidance.admin.referrals.index')->with('success', 'Referral created.');
    }

    public function accept(Referral $referral): RedirectResponse
    {
        $referral->update(['status' => 'accepted']);
        return redirect()->route('guidance.admin.referrals.index')->with('success', 'Referral accepted.');
    }

    public function complete(Request $request, Referral $referral): RedirectResponse
    {
        $validated = $request->validate(['feedback' => 'nullable|string']);
        $referral->update(['status' => 'completed', 'feedback' => $validated['feedback'] ?? null, 'resolved_at' => now()]);
        return redirect()->route('guidance.admin.referrals.index')->with('success', 'Referral completed.');
    }
}

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

class ReportController extends Controller
{
    public function __construct(
        protected GuidanceService $guidanceService
    ) {}

    public function index(): InertiaResponse
    {
        return inertia('guidance/admin/reports/index');
    }

    public function appointmentsReport(): InertiaResponse
    {
        $report = $this->guidanceService->getAppointmentsReport();
        return inertia('guidance/admin/reports/appointments', compact('report'));
    }

    public function sessionsReport(): InertiaResponse
    {
        $report = $this->guidanceService->getSessionsReport();
        return inertia('guidance/admin/reports/sessions', compact('report'));
    }

    public function incidentsReport(): InertiaResponse
    {
        $report = $this->guidanceService->getIncidentsReport();
        return inertia('guidance/admin/reports/incidents', compact('report'));
    }
}