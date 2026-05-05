<?php

namespace Modules\Admission\Services;

use Illuminate\Support\Facades\DB;
use Modules\Admission\Enums\ApplicantStatus;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\Evaluation;

class EvaluationService
{
    public function __construct(
        private ApplicationService $applicationService,
    ) {}

    public function evaluate(Applicant $applicant, array $data): Evaluation
    {
        return DB::transaction(function () use ($applicant, $data) {
            // Check slot limits before accepting
            if ($data['decision'] === 'accepted') {
                $program = $applicant->program;
                if ($program && $program->slots_available <= 0) {
                    throw new \RuntimeException(
                        "Cannot accept applicant. The program '{$program->name}' has no available slots."
                    );
                }
            }

            $evaluation = Evaluation::create([
                'applicant_id' => $applicant->id,
                'evaluator_id' => auth()->id(),
                'decision' => $data['decision'],
                'notes' => $data['notes'] ?? null,
                'score' => $data['score'] ?? null,
                'criteria_scores' => $data['criteria_scores'] ?? null,
            ]);

            $newStatus = match ($data['decision']) {
                'accepted' => ApplicantStatus::Accepted,
                'rejected' => ApplicantStatus::Rejected,
                'waitlisted' => ApplicantStatus::Waitlisted,
                default => $applicant->status,
            };

            $this->applicationService->updateStatus(
                $applicant, $newStatus, $data['notes'] ?? null,
                ['evaluation_id' => $evaluation->id]
            );

            // Increment slots_filled when accepted
            if ($data['decision'] === 'accepted' && $applicant->program) {
                $applicant->program->increment('slots_filled');
            }

            return $evaluation;
        });
    }

    public function getStats(): array
    {
        return [
            'total_applicants' => Applicant::submitted()->count(),
            'pending_review' => Applicant::byStatus(ApplicantStatus::Submitted)->count(),
            'under_review' => Applicant::byStatus(ApplicantStatus::UnderReview)->count(),
            'interview_scheduled' => Applicant::byStatus(ApplicantStatus::InterviewScheduled)->count(),
            'accepted' => Applicant::byStatus(ApplicantStatus::Accepted)->count(),
            'rejected' => Applicant::byStatus(ApplicantStatus::Rejected)->count(),
            'waitlisted' => Applicant::byStatus(ApplicantStatus::Waitlisted)->count(),
            'enrolled' => Applicant::byStatus(ApplicantStatus::Enrolled)->count(),
        ];
    }
}