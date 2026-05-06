<?php

namespace Modules\Admission\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class EnrollmentReminder extends Notification
{
    use Queueable;

    public function __construct(
        public $enrollment,
        public int $daysRemaining
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Enrollment Reminder - ' . config('app.name'))
            ->greeting('Hello ' . $this->enrollment->full_name . '!')
            ->line('This is a reminder that enrollment for the ' . $this->enrollment->semester . ' semester ends in ' . $this->daysRemaining . ' day(s).')
            ->line('**Academic Year:** ' . $this->enrollment->academic_year)
            ->line('Please complete your enrollment as soon as possible.')
            ->action('Complete Enrollment', route('dashboard'))
            ->line('Contact the registrar if you need assistance.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'enrollment_reminder',
            'enrollment_id' => $this->enrollment->id,
            'days_remaining' => $this->daysRemaining,
            'message' => 'Enrollment ends in ' . $this->daysRemaining . ' day(s)',
        ];
    }
}