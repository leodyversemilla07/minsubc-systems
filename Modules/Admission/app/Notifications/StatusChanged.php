<?php

namespace Modules\Admission\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Modules\Admission\Enums\ApplicantStatus;
use Modules\Admission\Models\Applicant;

class StatusChanged extends Notification
{
    use Queueable;

    public function __construct(
        private Applicant $applicant,
        private ApplicantStatus $oldStatus,
        private ApplicantStatus $newStatus,
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $mail = (new MailMessage)
            ->subject('Application Status Updated - MinSU BC')
            ->greeting("Hello {$this->applicant->first_name}!")
            ->line("Your application ({$this->applicant->application_number}) status has been updated.")
            ->line("From: **{$this->oldStatus->label()}**")
            ->line("To: **{$this->newStatus->label()}**");

        if ($this->newStatus === ApplicantStatus::Accepted) {
            $mail->line('Congratulations! You have been accepted. Please wait for further instructions regarding enrollment.');
            $mail->action('View Status', route('admission.track'));
        } elseif ($this->newStatus === ApplicantStatus::Rejected) {
            $mail->line('We regret to inform you that your application was not accepted at this time.');
        } else {
            $mail->action('Track Application', route('admission.track'));
        }

        return $mail;
    }

    public function toArray(object $notifiable): array
    {
        return [
            'application_number' => $this->applicant->application_number,
            'old_status' => $this->oldStatus->value,
            'new_status' => $this->newStatus->value,
            'message' => "Status changed from {$this->oldStatus->label()} to {$this->newStatus->label()}.",
        ];
    }
}
