<?php

namespace Modules\Guidance\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response as InertiaResponse;
use Modules\Guidance\Models\Appointment;
use Modules\Guidance\Models\AppointmentSlot;
use Modules\Guidance\Models\Assessment;
use Modules\Guidance\Models\CounselingSession;
use Modules\Guidance\Models\Counselor;

class StudentDashboardController extends Controller
{
    public function index(): InertiaResponse
    {
        $student = Student::where('user_id', auth()->id())->firstOrFail();
        $upcomingAppointments = Appointment::with('counselor', 'slot')
            ->where('student_id', $student->student_id)
            ->whereIn('status', ['scheduled', 'confirmed'])
            ->latest()->take(5)->get();
        $completedSessions = CounselingSession::where('student_id', $student->student_id)
            ->where('status', 'completed')->count();
        $pendingAssessments = Assessment::where('student_id', $student->student_id)
            ->where('status', 'pending')->count();

        return inertia('guidance/student/dashboard', compact('student', 'upcomingAppointments', 'completedSessions', 'pendingAssessments'));
    }

    public function appointments(): InertiaResponse
    {
        $student = Student::where('user_id', auth()->id())->firstOrFail();
        $appointments = Appointment::with('counselor', 'slot')
            ->where('student_id', $student->student_id)
            ->latest()->paginate(10);

        return inertia('guidance/student/appointments', compact('appointments'));
    }

    public function createAppointment(): InertiaResponse
    {
        $slots = AppointmentSlot::with('counselor:id,first_name,last_name,specialization')
            ->whereDate('date', '>=', now())
            ->where('is_available', true)
            ->whereRaw('booked_count < max_students')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        return inertia('guidance/student/appointments/create', compact('slots'));
    }

    public function storeAppointment(Request $request): RedirectResponse
    {
        $student = Student::where('user_id', auth()->id())->firstOrFail();
        $validated = $request->validate([
            'slot_id' => 'required|exists:gdn_appointment_slots,id',
            'reason' => 'nullable|string|max:500',
        ]);

        return DB::transaction(function () use ($student, $validated) {
            $slot = AppointmentSlot::whereKey($validated['slot_id'])->lockForUpdate()->firstOrFail();
            if (! $slot->has_availability) {
                return redirect()->back()->with('error', 'Slot is no longer available.');
            }

            if (Appointment::where('student_id', $student->student_id)
                ->where('slot_id', $slot->id)
                ->whereIn('status', ['scheduled', 'confirmed'])->exists()) {
                return redirect()->back()->with('error', 'You already have an appointment in this slot.');
            }

            Appointment::create([
                'appointment_code' => 'APT-'.now()->format('Ymd').'-'.strtoupper(bin2hex(random_bytes(6))),
                'slot_id' => $slot->id,
                'student_id' => $student->student_id,
                'counselor_id' => $slot->counselor_id,
                'reason' => $validated['reason'] ?? null,
                'status' => 'scheduled',
            ]);
            $slot->increment('booked_count');

            return redirect()->route('guidance.my.appointments')->with('success', 'Appointment booked successfully.');
        });
    }

    public function cancelAppointment(Request $request, Appointment $appointment): RedirectResponse
    {
        $student = Student::where('user_id', auth()->id())->firstOrFail();

        return DB::transaction(function () use ($request, $appointment, $student) {
            $slot = AppointmentSlot::whereKey($appointment->slot_id)->lockForUpdate()->firstOrFail();
            $appointment = Appointment::whereKey($appointment->id)->lockForUpdate()->firstOrFail();
            if ($appointment->student_id !== $student->student_id) {
                abort(403);
            }
            if (! in_array($appointment->status, ['scheduled', 'confirmed'], true)) {
                return redirect()->back()->with('error', 'This appointment cannot be cancelled.');
            }

            $appointment->update(['status' => 'cancelled', 'cancellation_reason' => $request->reason ?? 'Cancelled by student']);
            if ($slot->booked_count > 0) {
                $slot->decrement('booked_count');
            }

            return redirect()->route('guidance.my.appointments')->with('success', 'Appointment cancelled.');
        });
    }

    public function assessments(): InertiaResponse
    {
        $student = Student::where('user_id', auth()->id())->firstOrFail();
        $assessments = Assessment::where('student_id', $student->student_id)->latest()->paginate(10);

        return inertia('guidance/student/assessments', compact('assessments'));
    }

    public function counselors(): InertiaResponse
    {
        $counselors = Counselor::where('is_active', true)->where('is_available', true)->get();

        return inertia('guidance/student/counselors', compact('counselors'));
    }
}
