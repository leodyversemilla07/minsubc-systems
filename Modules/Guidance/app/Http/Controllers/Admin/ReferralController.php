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

