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
