<?php

namespace Modules\Admission\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ApplicationReceived extends Notification
{
    use Queueable;

    public function __construct(
        public $applicant
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Application Received - ' . config('app.name'))
            ->greeting('Hello ' . $this->applicant->full_name . '!')
            ->line('Your application has been received.')
            ->line('**Application Number:** ' . $this->applicant->application_number)
            ->line('**Program:** ' . ($this->applicant->program?->name ?? 'N/A'))
            ->line('Please keep your application number safe for tracking your application status.')
            ->action('Track Application', route('admission.track'))
            ->line('Thank you for applying to ' . config('app.name') . '!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'application_received',
            'applicant_id' => $this->applicant->id,
            'application_number' => $this->applicant->application_number,
            'program' => $this->applicant->program?->name,
            'message' => 'Your application has been received.',
        ];
    }
}