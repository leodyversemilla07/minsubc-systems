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

