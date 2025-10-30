<?php

namespace App\Modules\SAS\Services;

use App\Modules\SAS\Models\InsuranceRecord;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class InsuranceService
{
    public function __construct(
        protected NotificationService $notificationService
    ) {}

    /**
     * Get all insurance records with optional filters and pagination.
     */
    public function getInsuranceRecords(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = InsuranceRecord::with('student');

        if (isset($filters['student_id'])) {
            $query->where('student_id', $filters['student_id']);
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['policy_type'])) {
            $query->where('policy_type', $filters['policy_type']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('policy_number', 'like', "%{$filters['search']}%")
                    ->orWhere('insurance_provider', 'like', "%{$filters['search']}%")
                    ->orWhereHas('student', function ($studentQuery) use ($filters) {
                        $studentQuery->where('name', 'like', "%{$filters['search']}%");
                    });
            });
        }

        return $query->orderBy('effective_date', 'desc')->paginate($perPage);
    }

    /**
     * Get a single insurance record by ID.
     */
    public function getInsuranceById(int $id): InsuranceRecord
    {
        return InsuranceRecord::with('student')->findOrFail($id);
    }

    /**
     * Create a new insurance record with file upload.
     */
    public function createInsurance(array $data): InsuranceRecord
    {
        if (isset($data['policy_document'])) {
            $data['policy_document_path'] = $data['policy_document']->store('insurance/policies', 'public');
        }

        $insurance = InsuranceRecord::create($data);
        $insurance->load('student');

        // Send notification to student
        $this->notificationService->notifyInsuranceSubmitted($insurance);

        return $insurance;
    }

    /**
     * Update an existing insurance record.
     */
    public function updateInsurance(InsuranceRecord $insurance, array $data): InsuranceRecord
    {
        if (isset($data['policy_document'])) {
            // Delete old document if exists
            if ($insurance->policy_document_path) {
                Storage::disk('public')->delete($insurance->policy_document_path);
            }

            $data['policy_document_path'] = $data['policy_document']->store('insurance/policies', 'public');
        }

        $insurance->update($data);

        return $insurance->fresh();
    }

    /**
     * Delete an insurance record and its associated file.
     */
    public function deleteInsurance(InsuranceRecord $insurance): bool
    {
        if ($insurance->policy_document_path) {
            Storage::disk('public')->delete($insurance->policy_document_path);
        }

        return $insurance->delete();
    }

    /**
     * Get insurance records for a specific student.
     */
    public function getStudentInsurance(int $studentId): Collection
    {
        return InsuranceRecord::where('student_id', $studentId)
            ->orderBy('effective_date', 'desc')
            ->get();
    }

    /**
     * Check for expiring insurance policies.
     */
    public function getExpiringPolicies(int $daysAhead = 30): Collection
    {
        $expirationDate = now()->addDays($daysAhead);

        return InsuranceRecord::with('student')
            ->where('status', 'Approved')
            ->whereBetween('expiration_date', [now(), $expirationDate])
            ->orderBy('expiration_date')
            ->get();
    }

    /**
     * Get insurance statistics.
     */
    public function getInsuranceStatistics(): array
    {
        return [
            'total_policies' => InsuranceRecord::count(),
            'active_policies' => InsuranceRecord::where('status', 'Approved')->count(),
            'pending_review' => InsuranceRecord::where('status', 'Pending Review')->count(),
            'expired_policies' => InsuranceRecord::where('status', 'Expired')->count(),
            'total_coverage_amount' => InsuranceRecord::where('status', 'Approved')->sum('coverage_amount'),
            'by_policy_type' => InsuranceRecord::selectRaw('policy_type, COUNT(*) as count')
                ->groupBy('policy_type')
                ->pluck('count', 'policy_type'),
        ];
    }
}
