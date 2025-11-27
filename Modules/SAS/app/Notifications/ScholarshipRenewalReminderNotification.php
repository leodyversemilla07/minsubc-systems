<?php

namespace Modules\SAS\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Modules\SAS\Models\ScholarshipRecipient;

class ScholarshipRenewalReminderNotification extends Notification
{
    use Queueable;

    public function __construct(
        public ScholarshipRecipient $recipient,
        public string $academicYear,
        public string $semester
    ) {}

    /**
     * Get the notification's delivery channels.
     */
    public function via(mixed $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(mixed $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Scholarship Renewal Available')
            ->greeting('Hello '.$notifiable->name.'!')
            ->line('Your '.$this->recipient->scholarship->scholarship_name.' scholarship is up for renewal.')
            ->line('Academic Year: '.$this->academicYear)
            ->line('Semester: '.$this->semester)
            ->line('Please submit your renewal application as soon as possible to continue receiving scholarship benefits.')
            ->action('Renew Now', url('/sas/student/scholarships'))
            ->line('Thank you for your continued academic excellence!');
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(mixed $notifiable): array
    {
        return [
            'title' => 'Scholarship Renewal Available',
            'message' => 'Your '.$this->recipient->scholarship->scholarship_name.' scholarship is up for renewal for '.$this->semester.' '.$this->academicYear.'.',
            'scholarship_id' => $this->recipient->scholarship_id,
            'academic_year' => $this->academicYear,
            'semester' => $this->semester,
            'action_url' => url('/sas/student/scholarships'),
        ];
    }
}
