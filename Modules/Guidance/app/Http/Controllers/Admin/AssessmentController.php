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

