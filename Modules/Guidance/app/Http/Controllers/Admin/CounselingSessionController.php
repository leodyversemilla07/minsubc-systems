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

