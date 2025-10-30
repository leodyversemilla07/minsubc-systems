<?php

namespace App\Modules\SAS\Services;

use App\Models\User;
use App\Modules\SAS\Models\SASActivity;
use App\Modules\SAS\Models\Scholarship;
use App\Modules\SAS\Models\ScholarshipRecipient;
use App\Notifications\SASNotification;
use Illuminate\Support\Facades\Notification;

class NotificationService
{
    /**
     * Send scholarship award notification to student.
     */
    public function notifyScholarshipAwarded(ScholarshipRecipient $recipient): void
    {
        $student = $recipient->student;

        $student->notify(new SASNotification([
            'title' => 'Scholarship Awarded',
            'message' => "Congratulations! You have been awarded the {$recipient->scholarship->scholarship_name} scholarship.",
            'type' => 'success',
            'action_url' => route('sas.student.scholarships.show', $recipient->id),
        ]));
    }

    /**
     * Send scholarship renewal reminder to students.
     */
    public function notifyScholarshipRenewal(ScholarshipRecipient $recipient): void
    {
        $student = $recipient->student;

        $student->notify(new SASNotification([
            'title' => 'Scholarship Renewal Required',
            'message' => "Your {$recipient->scholarship->scholarship_name} scholarship requires renewal. Please submit the necessary requirements.",
            'type' => 'warning',
            'action_url' => route('sas.student.scholarships.show', $recipient->id),
        ]));
    }

    /**
     * Send insurance expiration reminder to student.
     */
    public function notifyInsuranceExpiring(int $studentId, string $policyNumber, string $expirationDate): void
    {
        $student = User::findOrFail($studentId);

        $student->notify(new SASNotification([
            'title' => 'Insurance Policy Expiring Soon',
            'message' => "Your insurance policy ({$policyNumber}) will expire on {$expirationDate}. Please renew to maintain coverage.",
            'type' => 'warning',
            'action_url' => route('sas.student.insurance.index'),
        ]));
    }

    /**
     * Send activity reminder to participants.
     */
    public function notifyActivityReminder(SASActivity $activity, array $participantIds): void
    {
        $participants = User::whereIn('id', $participantIds)->get();

        Notification::send($participants, new SASNotification([
            'title' => 'Upcoming Activity Reminder',
            'message' => "Reminder: {$activity->activity_title} is scheduled for {$activity->start_date->format('F d, Y')} at {$activity->location}.",
            'type' => 'info',
            'action_url' => route('sas.activities.show', $activity->id),
        ]));
    }

    /**
     * Send document upload notification to admin.
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
     * Send organization officer appointment notification.
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
     * Send bulk notifications to specific user groups.
     */
    public function sendBulkNotification(array $userIds, array $notificationData): void
    {
        $users = User::whereIn('id', $userIds)->get();

        Notification::send($users, new SASNotification($notificationData));
    }
}
