<?php

namespace Modules\Admission\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ScheduleAvailable extends Notification
{
    use Queueable;

    public function __construct(
        public $enrollment
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Class Schedule Available - ' . config('app.name'))
            ->greeting('Hello ' . $this->enrollment->full_name . '!')
            ->line('Your class schedule for the ' . $this->enrollment->semester . ' semester is now available.')
            ->line('**Academic Year:** ' . $this->enrollment->academic_year)
            ->line('**Section:** ' . ($this->enrollment->section?->name ?? 'TBA'))
            ->action('View Schedule', route('dashboard'))
            ->line('Please check your schedule and report any conflicts to the registrar.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'schedule_available',
            'enrollment_id' => $this->enrollment->id,
            'section' => $this->enrollment->section?->name,
            'message' => 'Your class schedule for ' . $this->enrollment->semester . ' semester is now available',
        ];
    }
}