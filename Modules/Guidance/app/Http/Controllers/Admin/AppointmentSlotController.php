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

