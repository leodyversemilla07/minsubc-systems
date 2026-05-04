<?php

namespace Modules\Admission\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Modules\Admission\Models\Applicant;

class ApplicationReceived extends Notification
{
    use Queueable;

    public function __construct(private Applicant $applicant) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Application Received - MinSU BC')
            ->greeting("Hello {$this->applicant->first_name}!")
            ->line("Your application ({$this->applicant->application_number}) has been received successfully.")
            ->line('You can track the status using your application number.')
            ->action('Track Application', route('admission.track'))
            ->line('Thank you for applying to Mindoro State University - Bongabong Campus!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'application_number' => $this->applicant->application_number,
            'message' => 'Your application has been submitted successfully.',
        ];
    }
}
