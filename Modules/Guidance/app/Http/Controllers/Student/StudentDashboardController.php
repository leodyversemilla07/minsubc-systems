<?php

namespace Modules\Guidance\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Guidance\Models\Appointment;
use Modules\Guidance\Models\AppointmentSlot;
use Modules\Guidance\Models\Assessment;
use Modules\Guidance\Models\Counselor;
use App\Models\Student;

class StudentDashboardController extends Controller
{
    public function index(): InertiaResponse
    {
        $student = Student::where('user_id', auth()->id())->firstOrFail();
        $upcomingAppointments = Appointment::with('counselor', 'slot')
            ->where('student_id', $student->id)
            ->whereIn('status', ['scheduled', 'confirmed'])
            ->latest()->take(5)->get();
        $completedSessions = \Modules\Guidance\Models\CounselingSession::where('student_id', $student->id)
            ->where('status', 'completed')->count();
        $pendingAssessments = Assessment::where('student_id', $student->id)
            ->where('status', 'pending')->count();

        return inertia('guidance/student/dashboard', compact('student', 'upcomingAppointments', 'completedSessions', 'pendingAssessments'));
    }

    public function appointments(): InertiaResponse
    {
        $student = Student::where('user_id', auth()->id())->firstOrFail();
        $appointments = Appointment::with('counselor', 'slot')
            ->where('student_id', $student->id)
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

        $slot = AppointmentSlot::findOrFail($validated['slot_id']);
        if (!$slot->has_availability) {
            return redirect()->back()->with('error', 'Slot is no longer available.');
        }

        $existing = Appointment::where('student_id', $student->id)
            ->where('slot_id', $slot->id)
            ->whereIn('status', ['scheduled', 'confirmed'])
            ->exists();
        if ($existing) {
            return redirect()->back()->with('error', 'You already have an appointment in this slot.');
        }

        $appointment = Appointment::create([
            'appointment_code' => 'APT-' . now()->format('Ymd') . '-' . str_pad((Appointment::max('id') ?? 0) + 1, 4, '0', STR_PAD_LEFT),
            'slot_id' => $slot->id,
            'student_id' => $student->id,
            'counselor_id' => $slot->counselor_id,
            'reason' => $validated['reason'],
            'status' => 'scheduled',
        ]);
        $slot->increment('booked_count');

        return redirect()->route('guidance.my.appointments')->with('success', 'Appointment booked successfully.');
    }

    public function cancelAppointment(Request $request, Appointment $appointment): RedirectResponse
    {
        $student = Student::where('user_id', auth()->id())->firstOrFail();
        if ($appointment->student_id !== $student->id) {
            return redirect()->back()->with('error', 'Unauthorized.');
        }
        $appointment->update(['status' => 'cancelled', 'cancellation_reason' => $request->reason ?? 'Cancelled by student']);
        $appointment->slot()->decrement('booked_count');
        return redirect()->route('guidance.my.appointments')->with('success', 'Appointment cancelled.');
    }

    public function assessments(): InertiaResponse
    {
        $student = Student::where('user_id', auth()->id())->firstOrFail();
        $assessments = Assessment::where('student_id', $student->id)->latest()->paginate(10);
        return inertia('guidance/student/assessments', compact('assessments'));
    }

    public function counselors(): InertiaResponse
    {
        $counselors = Counselor::where('is_active', true)->where('is_available', true)->get();
        return inertia('guidance/student/counselors', compact('counselors'));
    }
}