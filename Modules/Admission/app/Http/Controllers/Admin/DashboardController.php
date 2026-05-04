<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Models\AdmissionProgram;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Services\EnrollmentService;
use Modules\Admission\Services\EvaluationService;

class DashboardController extends Controller
{
    public function __construct(
        private EvaluationService $evaluationService,
        private EnrollmentService $enrollmentService,
    ) {}

    public function index(): Response
    {
        $evalStats = $this->evaluationService->getStats();
        $enrollmentStats = $this->enrollmentService->getStats();

        $programs = AdmissionProgram::with('course')->get()->map(fn($p) => [
            'id' => $p->id,
            'name' => $p->name,
            'course' => $p->course->code,
            'slots' => $p->slots,
            'slots_filled' => $p->slots_filled,
            'slots_available' => $p->slots_available,
            'status' => $p->status,
            'applicants_count' => $p->applicants()->count(),
        ]);

        $recentApplicants = Applicant::with(['program.course'])->latest()->take(10)->get()->map(fn($a) => [
            'id' => $a->id,
            'application_number' => $a->application_number,
            'name' => $a->full_name,
            'program' => $a->program?->course?->code ?? 'N/A',
            'status' => $a->status->value,
            'status_label' => $a->status->label(),
            'created_at' => $a->created_at->format('M d, Y'),
        ]);

        return Inertia::render('admission/admin/dashboard', [
            'stats' => $evalStats,
            'enrollmentStats' => $enrollmentStats,
            'programs' => $programs,
            'recentApplicants' => $recentApplicants,
        ]);
    }
}
