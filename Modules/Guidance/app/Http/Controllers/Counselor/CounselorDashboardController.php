<?php

namespace Modules\Guidance\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\Guidance\Models\Appointment;
use Modules\Guidance\Models\CounselingSession;
use Modules\Guidance\Models\Counselor;
use App\Models\Student;

class CounselorDashboardController extends Controller
{
    public function index(): InertiaResponse
    {
        $counselor = Counselor::where('user_id', auth()->id())->firstOrFail();
        $todayAppointments = Appointment::with('student', 'slot')
            ->where('counselor_id', $counselor->id)
            ->whereDate('created_at', today())
            ->whereIn('status', ['scheduled', 'confirmed'])
            ->get();
        $pendingAppointments = Appointment::with('student')
            ->where('counselor_id', $counselor->id)
            ->where('status', 'scheduled')
            ->count();
        $recentSessions = CounselingSession::with('student')
            ->where('counselor_id', $counselor->id)
            ->latest()->take(10)->get();
        $totalSessions = CounselingSession::where('counselor_id', $counselor->id)->count();

        return inertia('guidance/counselor/dashboard', compact('counselor', 'todayAppointments', 'pendingAppointments', 'recentSessions', 'totalSessions'));
    }

    public function appointments(): InertiaResponse
    {
        $counselor = Counselor::where('user_id', auth()->id())->firstOrFail();
        $appointments = Appointment::with('student', 'slot')
            ->where('counselor_id', $counselor->id)
            ->latest()->paginate(15);
        return inertia('guidance/counselor/appointments', compact('appointments'));
    }

    public function students(): InertiaResponse
    {
        $counselor = Counselor::where('user_id', auth()->id())->firstOrFail();
        $studentIds = CounselingSession::where('counselor_id', $counselor->id)
            ->distinct('student_id')->pluck('student_id');
        $students = Student::whereIn('id', $studentIds)->paginate(15);
        return inertia('guidance/counselor/students', compact('students'));
    }

    public function studentProfile(Student $student): InertiaResponse
    {
        $counselor = Counselor::where('user_id', auth()->id())->firstOrFail();
        $sessions = CounselingSession::with('appointment')
            ->where('counselor_id', $counselor->id)
            ->where('student_id', $student->id)
            ->latest()->get();
        $assessments = \Modules\Guidance\Models\Assessment::where('student_id', $student->id)
            ->where('status', 'reviewed')->get();

        return inertia('guidance/counselor/students/show', compact('student', 'sessions', 'assessments'));
    }
}