<?php

namespace Modules\Admission\Services;

use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentPayment;

class NotificationService
{
    /**
     * Send application received notification
     */
    public function sendApplicationReceived(Applicant $applicant): void
    {
        $user = $applicant->user;

        if (!$user && !$applicant->email) {
            return;
        }

        $recipientEmail = $user?->email ?? $applicant->email;
        $recipientName = $applicant->full_name;

        Mail::to($recipientEmail)->send(new \Modules\Admission\Mail\ApplicationReceived($applicant));

        if ($user) {
            // Create in-app notification
            $user->notify(new \Modules\Admission\Notifications\ApplicationReceived($applicant));
        }
    }

    /**
     * Send status change notification
     */
    public function sendStatusChange(Applicant $applicant, string $oldStatus, string $newStatus): void
    {
        $user = $applicant->user;

        if (!$user && !$applicant->email) {
            return;
        }

        $recipientEmail = $user?->email ?? $applicant->email;

        Mail::to($recipientEmail)->send(new \Modules\Admission\Mail\StatusChanged($applicant, $oldStatus, $newStatus));

        if ($user) {
            $user->notify(new \Modules\Admission\Notifications\StatusChanged($applicant, $oldStatus, $newStatus));
        }
    }

    /**
     * Send enrollment confirmation
     */
    public function sendEnrollmentConfirmation(Enrollment $enrollment): void
    {
        $user = $enrollment->user;

        if (!$user) {
            return;
        }

        Mail::to($user->email)->send(new \Modules\Admission\Mail\EnrollmentConfirmation($enrollment));

        $user->notify(new \Modules\Admission\Notifications\EnrollmentConfirmed($enrollment));
    }

    /**
     * Send payment confirmation
     */
    public function sendPaymentConfirmation(EnrollmentPayment $payment): void
    {
        $enrollment = $payment->enrollment;
        $user = $enrollment?->user;

        if (!$user) {
            return;
        }

        $user->notify(new \Modules\Admission\Notifications\PaymentReceived($payment));
    }

    /**
     * Send payment verification notification
     */
    public function sendPaymentVerified(EnrollmentPayment $payment): void
    {
        $enrollment = $payment->enrollment;
        $user = $enrollment?->user;

        if (!$user) {
            return;
        }

        Mail::to($user->email)->send(new \Modules\Admission\Mail\PaymentVerified($payment));

        $user->notify(new \Modules\Admission\Notifications\PaymentVerified($payment));
    }

    /**
     * Send payment rejected notification
     */
    public function sendPaymentRejected(EnrollmentPayment $payment, string $reason): void
    {
        $enrollment = $payment->enrollment;
        $user = $enrollment?->user;

        if (!$user) {
            return;
        }

        $user->notify(new \Modules\Admission\Notifications\PaymentRejected($payment, $reason));
    }

    /**
     * Send re-enrollment notification
     */
    public function sendReEnrollmentNotification(Enrollment $enrollment): void
    {
        $user = $enrollment->user;

        if (!$user) {
            return;
        }

        Mail::to($user->email)->send(new \Modules\Admission\Mail\ReEnrollmentConfirmation($enrollment));

        $user->notify(new \Modules\Admission\Notifications\ReEnrollmentConfirmed($enrollment));
    }

    /**
     * Send enrollment reminder
     */
    public function sendEnrollmentReminder(Enrollment $enrollment, int $daysRemaining): void
    {
        $user = $enrollment->user;

        if (!$user) {
            return;
        }

        $user->notify(new \Modules\Admission\Notifications\EnrollmentReminder($enrollment, $daysRemaining));
    }

    /**
     * Send class schedule notification
     */
    public function sendScheduleNotification(Enrollment $enrollment): void
    {
        $user = $enrollment->user;

        if (!$user) {
            return;
        }

        $user->notify(new \Modules\Admission\Notifications\ScheduleAvailable($enrollment));
    }
}