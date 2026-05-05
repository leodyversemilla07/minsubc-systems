<?php

namespace Modules\Admission\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Modules\Admission\Enums\ApplicantStatus;
use Modules\Admission\Models\AdmissionAuditLog;
use Modules\Admission\Models\AdmissionProgram;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\ApplicantDocument;

class ApplicationService
{
    public function generateApplicationNumber(): string
    {
        $prefix = config('admission.application.prefix', 'ADM');
        $year = now()->year;

        $lastApplicant = Applicant::where('application_number', 'like', "{$prefix}{$year}%")
            ->orderBy('id', 'desc')
            ->first();

        $sequence = $lastApplicant ? intval(substr($lastApplicant->application_number, -5)) + 1 : 1;

        return "{$prefix}{$year}-" . str_pad($sequence, 5, '0', STR_PAD_LEFT);
    }

    public function createApplication(array $data): Applicant
    {
        return DB::transaction(function () use ($data) {
            // Prevent duplicate email for the same academic year & semester
            $program = AdmissionProgram::findOrFail($data['program_id']);

            $existing = Applicant::where('email', $data['email'])
                ->whereHas('program', function ($q) use ($program) {
                    $q->where('academic_year', $program->academic_year)
                      ->where('semester', $program->semester);
                })
                ->whereNull('deleted_at')
                ->first();

            if ($existing) {
                throw new \RuntimeException(
                    'An application for this email already exists for the ' . $program->academic_year . ' ' . $program->semester . ' semester.'
                );
            }

            // Verify program is still open for applications
            if (!$program->is_open) {
                throw new \RuntimeException('This program is no longer accepting applications.');
            }

            $data['application_number'] = $this->generateApplicationNumber();
            $data['status'] = ApplicantStatus::Draft;

            return Applicant::create($data);
        });
    }

    public function submitApplication(Applicant $applicant): Applicant
    {
        if ($applicant->status !== ApplicantStatus::Draft) {
            throw new \RuntimeException('Only draft applications can be submitted.');
        }

        // Re-verify the program is still open at time of submission
        if (!$applicant->program?->is_open) {
            throw new \RuntimeException(
                'This program is no longer accepting applications. The application period may have ended.'
            );
        }

        return DB::transaction(function () use ($applicant) {
            $oldStatus = $applicant->status;
            $applicant->update([
                'status' => ApplicantStatus::Submitted,
                'submitted_at' => now(),
            ]);

            $this->logAudit($applicant, 'submitted', $oldStatus->value, ApplicantStatus::Submitted->value);

            return $applicant->fresh();
        });
    }

    public function updateStatus(Applicant $applicant, ApplicantStatus $newStatus, ?string $remarks = null, ?array $metadata = null): Applicant
    {
        return DB::transaction(function () use ($applicant, $newStatus, $remarks, $metadata) {
            $oldStatus = $applicant->status;

            $updateData = ['status' => $newStatus];
            if ($remarks) $updateData['remarks'] = $remarks;
            if ($newStatus === ApplicantStatus::Accepted) $updateData['accepted_at'] = now();
            if ($newStatus === ApplicantStatus::Enrolled) $updateData['enrolled_at'] = now();

            $applicant->update($updateData);

            $this->logAudit($applicant, 'status_changed', $oldStatus->value, $newStatus->value, $remarks, $metadata);

            return $applicant->fresh();
        });
    }

    public function uploadDocument(Applicant $applicant, array $fileData, UploadedFile $file): ApplicantDocument
    {
        $path = $file->store(config('admission.storage.documents', 'admission/documents'), 'public');

        return DB::transaction(function () use ($applicant, $fileData, $path, $file) {
            $document = ApplicantDocument::create([
                'applicant_id' => $applicant->id,
                'requirement_id' => $fileData['requirement_id'] ?? null,
                'name' => $fileData['name'] ?? $file->getClientOriginalName(),
                'file_path' => $path,
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'status' => 'pending',
            ]);

            $this->logAudit($applicant, 'document_uploaded', null, null, "Uploaded: {$document->name}");

            return $document;
        });
    }

    public function logAudit(Applicant $applicant, string $action, ?string $fromStatus = null, ?string $toStatus = null, ?string $description = null, ?array $metadata = null): AdmissionAuditLog
    {
        return AdmissionAuditLog::create([
            'applicant_id' => $applicant->id,
            'user_id' => auth()->id(),
            'action' => $action,
            'from_status' => $fromStatus,
            'to_status' => $toStatus,
            'description' => $description,
            'metadata' => $metadata,
        ]);
    }
}