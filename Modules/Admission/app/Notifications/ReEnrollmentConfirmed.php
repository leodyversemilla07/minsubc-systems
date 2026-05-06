<?php

namespace Modules\Admission\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ReEnrollmentConfirmed extends Notification
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
            ->subject('Re-Enrollment Confirmed - ' . config('app.name'))
            ->greeting('Hello ' . $this->enrollment->full_name . '!')
            ->line('Your re-enrollment for the upcoming semester has been confirmed.')
            ->line('**Student ID:** ' . $this->enrollment->student_id)
            ->line('**Academic Year:** ' . $this->enrollment->academic_year . ' (' . $this->enrollment->semester . ' Semester)')
            ->line('**Year Level:** ' . $this->enrollment->year_level)
            ->action('View Dashboard', route('dashboard'))
            ->line('See you in the new semester!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 're_enrollment_confirmed',
            'enrollment_id' => $this->enrollment->id,
            'student_id' => $this->enrollment->student_id,
            'academic_year' => $this->enrollment->academic_year,
            'semester' => $this->enrollment->semester,
            'message' => 'Re-enrollment confirmed for ' . $this->enrollment->academic_year . ' ' . $this->enrollment->semester . ' semester',
        ];
    }
}