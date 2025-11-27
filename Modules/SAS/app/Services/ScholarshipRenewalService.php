<?php

namespace Modules\SAS\Services;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Modules\SAS\Models\ScholarshipRecipient;
use Modules\SAS\Notifications\ScholarshipRenewalReminderNotification;

class ScholarshipRenewalService
{
    /**
     * Find scholars eligible for renewal.
     */
    public function getEligibleScholars(string $academicYear, string $semester): Collection
    {
        $previousPeriod = $this->getPreviousPeriod($academicYear, $semester);

        return ScholarshipRecipient::query()
            ->where('status', 'Active')
            ->where('academic_year', $previousPeriod['academic_year'])
            ->where('semester', $previousPeriod['semester'])
            ->whereDoesntHave('renewals', function ($query) use ($academicYear, $semester) {
                $query->where('academic_year', $academicYear)
                    ->where('semester', $semester);
            })
            ->with(['student', 'scholarship'])
            ->get();
    }

    /**
     * Send renewal reminders to eligible scholars.
     */
    public function sendRenewalReminders(string $academicYear, string $semester): int
    {
        $eligibleScholars = $this->getEligibleScholars($academicYear, $semester);

        foreach ($eligibleScholars as $recipient) {
            if ($recipient->student) {
                $recipient->student->notify(
                    new ScholarshipRenewalReminderNotification($recipient, $academicYear, $semester)
                );
            }
        }

        return $eligibleScholars->count();
    }

    /**
     * Create renewal application (simplified with pre-filled data).
     */
    public function createRenewalApplication(ScholarshipRecipient $previousRecipient, array $data = []): ScholarshipRecipient
    {
        return ScholarshipRecipient::create([
            'student_id' => $previousRecipient->student_id,
            'scholarship_id' => $previousRecipient->scholarship_id,
            'academic_year' => $data['academic_year'] ?? $previousRecipient->academic_year,
            'semester' => $data['semester'] ?? $previousRecipient->semester,
            'amount' => $previousRecipient->amount,
            'status' => 'Active',
            'renewal_status' => 'Renewed',
            'remarks' => $data['remarks'] ?? 'Renewal from previous period',
            'requirements_complete' => false,
            'created_by' => $data['created_by'] ?? auth()->user()?->id,
        ]);
    }

    /**
     * Get renewal history for a student.
     */
    public function getRenewalHistory(int $studentId): Collection
    {
        return ScholarshipRecipient::query()
            ->where('student_id', $studentId)
            ->where('renewal_status', 'Renewed')
            ->with('scholarship')
            ->orderBy('academic_year', 'desc')
            ->orderBy('semester', 'desc')
            ->get();
    }

    /**
     * Check if a scholar is eligible for renewal.
     */
    public function isEligibleForRenewal(ScholarshipRecipient $recipient, string $targetAcademicYear, string $targetSemester): bool
    {
        // Check if status is active
        if ($recipient->status !== 'Active') {
            return false;
        }

        // Check if requirements are complete
        if (! $recipient->requirements_complete) {
            return false;
        }

        // Check if not expired
        if ($recipient->expiration_date && Carbon::parse($recipient->expiration_date)->isPast()) {
            return false;
        }

        // Check if not already renewed for target period
        $alreadyRenewed = ScholarshipRecipient::query()
            ->where('student_id', $recipient->student_id)
            ->where('scholarship_id', $recipient->scholarship_id)
            ->where('academic_year', $targetAcademicYear)
            ->where('semester', $targetSemester)
            ->exists();

        return ! $alreadyRenewed;
    }

    /**
     * Get previous academic period.
     */
    protected function getPreviousPeriod(string $academicYear, string $semester): array
    {
        // Parse academic year (e.g., "2024-2025")
        $years = explode('-', $academicYear);
        $startYear = (int) $years[0];

        if ($semester === '1st') {
            // Previous is 2nd semester of previous year
            return [
                'academic_year' => ($startYear - 1).'-'.$startYear,
                'semester' => '2nd',
            ];
        }

        // Previous is 1st semester of current year
        return [
            'academic_year' => $academicYear,
            'semester' => '1st',
        ];
    }

    /**
     * Get scholars needing renewal soon.
     */
    public function getScholarsNeedingRenewal(int $daysAhead = 30): Collection
    {
        $futureDate = now()->addDays($daysAhead);

        return ScholarshipRecipient::query()
            ->where('status', 'Active')
            ->whereNotNull('expiration_date')
            ->where('expiration_date', '<=', $futureDate)
            ->where('expiration_date', '>=', now())
            ->with(['student', 'scholarship'])
            ->get();
    }
}
