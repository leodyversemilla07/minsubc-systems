<?php

namespace Modules\Admission\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Enums\ApplicantStatus;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Services\ApplicationService;

class ApplicantController extends Controller
{
    public function __construct(private ApplicationService $applicationService) {}

    public function index(Request $request): Response
    {
        $query = Applicant::with(['program.course', 'documents'])->latest();

        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('program_id')) $query->where('program_id', $request->program_id);
        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function($q) use ($s) {
                $q->where('application_number', 'like', "%{$s}%")
                  ->orWhere('first_name', 'like', "%{$s}%")
                  ->orWhere('last_name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%");
            });
        }

        $applicants = $query->paginate(20)->through(fn($a) => [
            'id' => $a->id,
            'application_number' => $a->application_number,
            'name' => $a->full_name,
            'email' => $a->email,
            'program' => $a->program?->course?->code ?? 'N/A',
            'program_name' => $a->program?->name ?? 'N/A',
            'status' => $a->status->value,
            'status_label' => $a->status->label(),
            'documents_count' => $a->documents->count(),
            'submitted_at' => $a->submitted_at?->format('M d, Y'),
            'created_at' => $a->created_at->format('M d, Y'),
        ]);

        $statuses = collect(ApplicantStatus::cases())->map(fn($s) => ['value' => $s->value, 'label' => $s->label()]);

        return Inertia::render('admission/admin/applicants/index', [
            'applicants' => $applicants,
            'statuses' => $statuses,
            'filters' => $request->only(['status', 'program_id', 'search']),
        ]);
    }

    public function show(int $id): Response
    {
        $applicant = Applicant::with([
            'program.course', 'program.requirements', 'documents.reviewer',
            'evaluations.evaluator', 'enrollment', 'auditLogs.user',
        ])->findOrFail($id);

        return Inertia::render('admission/admin/applicants/show', [
            'applicant' => $applicant,
            'statuses' => collect(ApplicantStatus::cases())->map(fn($s) => [
                'value' => $s->value, 'label' => $s->label(), 'color' => $s->color(),
            ]),
        ]);
    }

    public function updateStatus(Request $request, int $id)
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:' . implode(',', array_column(ApplicantStatus::cases(), 'value'))],
            'remarks' => ['nullable', 'string', 'max:500'],
        ]);

        $applicant = Applicant::findOrFail($id);
        $newStatus = ApplicantStatus::from($validated['status']);

        try {
            $this->applicationService->updateStatus($applicant, $newStatus, $validated['remarks'] ?? null);
            return back()->with('success', "Applicant status updated to {$newStatus->label()}.");
        } catch (\RuntimeException $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function destroy(int $id)
    {
        $applicant = Applicant::findOrFail($id);
        $applicant->delete();

        return redirect()->route('admission.admin.applicants.index')
            ->with('success', 'Applicant deleted successfully.');
    }
}
