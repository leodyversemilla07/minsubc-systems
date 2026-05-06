<?php

namespace Modules\Admission\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class EnrollmentConfirmed extends Notification
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
            ->subject('Enrollment Confirmed - ' . config('app.name'))
            ->greeting('Congratulations ' . $this->enrollment->full_name . '!')
            ->line('Your enrollment has been confirmed.')
            ->line('**Student ID:** ' . $this->enrollment->student_id)
            ->line('**Academic Year:** ' . $this->enrollment->academic_year . ' (' . $this->enrollment->semester . ' Semester)')
            ->line('**Year Level:** ' . $this->enrollment->year_level)
            ->line('Please log in to view your class schedule and account details.')
            ->action('View Dashboard', route('dashboard'))
            ->line('Welcome to ' . config('app.name') . '!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'enrollment_confirmed',
            'enrollment_id' => $this->enrollment->id,
            'student_id' => $this->enrollment->student_id,
            'academic_year' => $this->enrollment->academic_year,
            'semester' => $this->enrollment->semester,
            'message' => 'Enrollment confirmed for ' . $this->enrollment->academic_year,
        ];
    }
}