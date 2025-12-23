<?php

namespace Modules\SAS\Services;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Modules\SAS\Models\Scholarship;
use Modules\SAS\Models\ScholarshipRecipient;

class ScholarshipService
{
    public function __construct(
        protected SASNotificationService $notificationService
    ) {}

    /**
     * Get all scholarships with optional filters and pagination.
     */
    public function getScholarships(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Scholarship::query();

        if (isset($filters['scholarship_type'])) {
            $query->where('scholarship_type', $filters['scholarship_type']);
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('scholarship_name', 'like', "%{$filters['search']}%")
                    ->orWhere('scholarship_code', 'like', "%{$filters['search']}%")
                    ->orWhere('provider', 'like', "%{$filters['search']}%");
            });
        }

        return $query->orderBy('scholarship_name')->paginate($perPage);
    }

    /**
     * Get a single scholarship by ID.
     */
    public function getScholarshipById(int $id): Scholarship
    {
        return Scholarship::with(['recipients.student'])->findOrFail($id);
    }

    /**
     * Create a new scholarship.
     */
    public function createScholarship(array $data): Scholarship
    {
        return Scholarship::create($data);
    }

    /**
     * Update an existing scholarship.
     */
    public function updateScholarship(Scholarship $scholarship, array $data): Scholarship
    {
        $scholarship->update($data);

        return $scholarship->fresh();
    }

    /**
     * Delete a scholarship.
     */
    public function deleteScholarship(Scholarship $scholarship): bool
    {
        return $scholarship->delete();
    }

    /**
     * Get all recipients for a specific scholarship.
     */
    public function getScholarshipRecipients(int $scholarshipId, array $filters = []): Collection
    {
        $query = ScholarshipRecipient::where('scholarship_id', $scholarshipId)
            ->with(['student', 'scholarship']);

        if (isset($filters['academic_year'])) {
            $query->where('academic_year', $filters['academic_year']);
        }

        if (isset($filters['semester'])) {
            $query->where('semester', $filters['semester']);
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderBy('date_awarded', 'desc')->get();
    }

    /**
     * Get all scholarships for a specific student.
     */
    public function getStudentScholarships(int $studentId, array $filters = []): Collection
    {
        $query = ScholarshipRecipient::where('student_id', $studentId)
            ->with(['scholarship']);

        if (isset($filters['academic_year'])) {
            $query->where('academic_year', $filters['academic_year']);
        }

        if (isset($filters['semester'])) {
            $query->where('semester', $filters['semester']);
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->orderBy('date_awarded', 'desc')->get();
    }

    /**
     * Create a scholarship recipient record.
     */
    public function createRecipient(array $data): ScholarshipRecipient
    {
        $recipient = ScholarshipRecipient::create($data);

        // Load relationships for notification
        $recipient->load(['student', 'scholarship']);

        // Send notification to student
        $this->notificationService->notifyScholarshipAssigned($recipient);

        return $recipient;
    }

    /**
     * Update a scholarship recipient record.
     */
    public function updateRecipient(ScholarshipRecipient $recipient, array $data): ScholarshipRecipient
    {
        $oldStatus = $recipient->status;

        $recipient->update($data);
        $recipient->load(['student', 'scholarship']);

        // Send notification if status changed
        if (isset($data['status']) && $data['status'] !== $oldStatus) {
            $this->notificationService->notifyScholarshipStatusChange($recipient, $oldStatus, $data['status']);
        }

        return $recipient->fresh();
    }

    /**
     * Get a single scholarship recipient by ID.
     */
    public function getRecipientById(int $id): ScholarshipRecipient
    {
        return ScholarshipRecipient::with(['student', 'scholarship', 'requirements'])->findOrFail($id);
    }

    /**
     * Delete a scholarship recipient record.
     */
    public function deleteRecipient(ScholarshipRecipient $recipient): bool
    {
        return $recipient->delete();
    }

    /**
     * Upload a requirement document.
     */
    public function uploadRequirement(int $requirementId, $file): void
    {
        $requirement = \Modules\SAS\Models\ScholarshipRequirement::findOrFail($requirementId);

        $path = $file->store('scholarships/requirements', 'public');

        $requirement->update([
            'file_path' => $path,
            'is_submitted' => true,
            'submission_date' => now(),
        ]);
    }

    /**
     * Get scholarship statistics.
     */
    public function getScholarshipStatistics(): array
    {
        return [
            'total_scholarships' => Scholarship::count(),
            'active_scholarships' => Scholarship::where('is_active', true)->count(),
            'total_recipients' => ScholarshipRecipient::count(),
            'active_recipients' => ScholarshipRecipient::where('status', 'Active')->count(),
            'total_amount_disbursed' => ScholarshipRecipient::sum('amount'),
            'by_type' => Scholarship::selectRaw('scholarship_type, COUNT(*) as count')
                ->groupBy('scholarship_type')
                ->pluck('count', 'scholarship_type'),
        ];
    }
}
