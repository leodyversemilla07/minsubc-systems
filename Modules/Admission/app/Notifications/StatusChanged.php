<?php

namespace Modules\Admission\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class StatusChanged extends Notification
{
    use Queueable;

    public function __construct(
        public $applicant,
        public string $oldStatus,
        public string $newStatus
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $statusLabel = ucfirst(str_replace('_', ' ', $this->newStatus));

        return (new MailMessage)
            ->subject('Application Status Update - ' . config('app.name'))
            ->greeting('Hello ' . $this->applicant->full_name . '!')
            ->line('Your application status has been updated.')
            ->line('**Application Number:** ' . $this->applicant->application_number)
            ->line('**Previous Status:** ' . ucfirst(str_replace('_', ' ', $this->oldStatus)))
            ->line('**New Status:** ' . $statusLabel)
            ->action('Track Application', route('admission.track'))
            ->line('Thank you for your patience.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'status_changed',
            'applicant_id' => $this->applicant->id,
            'application_number' => $this->applicant->application_number,
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
            'message' => 'Application status changed to ' . $this->newStatus,
        ];
    }
}