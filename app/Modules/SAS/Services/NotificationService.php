<?php

namespace App\Modules\SAS\Services;

use App\Models\User;
use App\Modules\SAS\Models\InsuranceRecord;
use App\Modules\SAS\Models\SASActivity;
use App\Modules\SAS\Models\Scholarship;
use App\Modules\SAS\Models\ScholarshipRecipient;
use App\Modules\SAS\Models\ScholarshipRequirement;
use App\Modules\SAS\Notifications\InsuranceApproved;
use App\Modules\SAS\Notifications\InsuranceExpirationWarning;
use App\Modules\SAS\Notifications\InsuranceRejected;
use App\Modules\SAS\Notifications\InsuranceSubmitted;
use App\Modules\SAS\Notifications\RequirementDeadlineReminder;
use App\Modules\SAS\Notifications\ScholarshipAssigned;
use App\Modules\SAS\Notifications\ScholarshipRenewalReminder;
use App\Modules\SAS\Notifications\ScholarshipStatusChanged;
use App\Notifications\SASNotification;
use Illuminate\Support\Facades\Notification;

class NotificationService
{
    /**
     * Notify student about scholarship assignment.
     */
    public function notifyScholarshipAssigned(ScholarshipRecipient $recipient): void
    {
        $student = $recipient->student;

        if ($student) {
            $student->notify(new ScholarshipAssigned($recipient));
        }
    }

    /**
     * Notify student about approaching requirement deadline.
     */
    public function notifyRequirementDeadline(ScholarshipRecipient $recipient, ScholarshipRequirement $requirement): void
    {
        $student = $recipient->student;

        if ($student) {
            $student->notify(new RequirementDeadlineReminder($recipient, $requirement));
        }
    }

    /**
     * Notify student about upcoming scholarship renewal.
     */
    public function notifyScholarshipRenewal(ScholarshipRecipient $recipient): void
    {
        $student = $recipient->student;

        if ($student) {
            $student->notify(new ScholarshipRenewalReminder($recipient));
        }
    }

    /**
     * Notify student about scholarship status change.
     */
    public function notifyScholarshipStatusChange(ScholarshipRecipient $recipient, string $oldStatus, string $newStatus): void
    {
        $student = $recipient->student;

        if ($student) {
            $student->notify(new ScholarshipStatusChanged($recipient, $oldStatus, $newStatus));
        }
    }

    /**
     * Notify student about insurance submission.
     */
    public function notifyInsuranceSubmitted(InsuranceRecord $insurance): void
    {
        $student = $insurance->student;

        if ($student) {
            $student->notify(new InsuranceSubmitted($insurance));
        }
    }

    /**
     * Notify student about insurance approval.
     */
    public function notifyInsuranceApproved(InsuranceRecord $insurance): void
    {
        $student = $insurance->student;

        if ($student) {
            $student->notify(new InsuranceApproved($insurance));
        }
    }

    /**
     * Notify student about insurance rejection.
     */
    public function notifyInsuranceRejected(InsuranceRecord $insurance, string $reason): void
    {
        $student = $insurance->student;

        if ($student) {
            $student->notify(new InsuranceRejected($insurance, $reason));
        }
    }

    /**
     * Notify student about insurance expiration.
     */
    public function notifyInsuranceExpiration(InsuranceRecord $insurance, int $daysLeft): void
    {
        $student = $insurance->student;

        if ($student) {
            $student->notify(new InsuranceExpirationWarning($insurance, $daysLeft));
        }
    }

    /**
     * Send requirement deadline reminders (for scheduled command).
     */
    public function sendRequirementDeadlineReminders(int $daysBefore = 7): int
    {
        $count = 0;
        $targetDate = now()->addDays($daysBefore);

        $requirements = ScholarshipRequirement::where('is_submitted', false)
            ->whereNotNull('deadline')
            ->whereDate('deadline', $targetDate->format('Y-m-d'))
            ->with(['recipient.student', 'recipient.scholarship'])
            ->get();

        foreach ($requirements as $requirement) {
            $this->notifyRequirementDeadline($requirement->recipient, $requirement);
            $count++;
        }

        return $count;
    }

    /**
     * Send insurance expiration warnings (for scheduled command).
     */
    public function sendInsuranceExpirationWarnings(): int
    {
        $count = 0;

        // Send 30-day warnings
        $thirtyDaysOut = now()->addDays(30);
        $insurances30 = InsuranceRecord::where('status', 'approved')
            ->whereDate('expiry_date', $thirtyDaysOut->format('Y-m-d'))
            ->with('student')
            ->get();

        foreach ($insurances30 as $insurance) {
            $this->notifyInsuranceExpiration($insurance, 30);
            $count++;
        }

        // Send 7-day warnings
        $sevenDaysOut = now()->addDays(7);
        $insurances7 = InsuranceRecord::where('status', 'approved')
            ->whereDate('expiry_date', $sevenDaysOut->format('Y-m-d'))
            ->with('student')
            ->get();

        foreach ($insurances7 as $insurance) {
            $this->notifyInsuranceExpiration($insurance, 7);
            $count++;
        }

        return $count;
    }

    /**
     * Send scholarship renewal reminders (for scheduled command).
     */
    public function sendScholarshipRenewalReminders(int $daysBefore = 30): int
    {
        $count = 0;
        $targetDate = now()->addDays($daysBefore);

        $recipients = ScholarshipRecipient::where('status', 'active')
            ->whereNotNull('expiration_date')
            ->whereDate('expiration_date', $targetDate->format('Y-m-d'))
            ->with(['student', 'scholarship'])
            ->get();

        foreach ($recipients as $recipient) {
            $this->notifyScholarshipRenewal($recipient);
            $count++;
        }

        return $count;
    }

    /**
     * Send activity reminder to participants (legacy method).
     */
    public function notifyActivityReminder(SASActivity $activity, array $participantIds): void
    {
        $participants = User::whereIn('id', $participantIds)->get();

        Notification::send($participants, new SASNotification([
            'title' => 'Upcoming Activity Reminder',
            'message' => "Reminder: {$activity->activity_title} is scheduled for {$activity->start_date->format('F d, Y')} at {$activity->location}.",
            'type' => 'info',
            'action_url' => route('sas.activities.show', $activity->slug),
        ]));
    }

    /**
     * Send document upload notification to admin (legacy method).
     */
    public function notifyDocumentUploaded(int $documentId, string $documentTitle): void
    {
        $admins = User::permission('manage digitalized documents')->get();

        Notification::send($admins, new SASNotification([
            'title' => 'New Document Uploaded',
            'message' => "A new document has been uploaded: {$documentTitle}",
            'type' => 'info',
            'action_url' => route('sas.admin.documents.show', $documentId),
        ]));
    }

    /**
     * Send organization officer appointment notification (legacy method).
     */
    public function notifyOfficerAppointment(int $studentId, string $position, string $organizationName): void
    {
        $student = User::findOrFail($studentId);

        $student->notify(new SASNotification([
            'title' => 'Organization Officer Appointment',
            'message' => "You have been appointed as {$position} of {$organizationName}. Congratulations!",
            'type' => 'success',
            'action_url' => route('sas.organizations.index'),
        ]));
    }

    /**
     * Send bulk notifications to specific user groups (legacy method).
     */
    public function sendBulkNotification(array $userIds, array $notificationData): void
    {
        $users = User::whereIn('id', $userIds)->get();

        Notification::send($users, new SASNotification($notificationData));
    }
}
