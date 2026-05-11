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

