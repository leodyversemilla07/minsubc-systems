<?php

namespace App\Modules\SAS\Notifications;

use App\Modules\SAS\Models\ScholarshipRecipient;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ScholarshipAssigned extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public ScholarshipRecipient $recipient
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Scholarship Awarded - '.$this->recipient->scholarship->scholarship_name)
            ->greeting('Congratulations, '.$notifiable->first_name.'!')
            ->line('You have been awarded the '.$this->recipient->scholarship->scholarship_name.'.')
            ->line('Amount: ₱'.number_format($this->recipient->amount, 2))
            ->line('Academic Year: '.$this->recipient->academic_year)
            ->line('Semester: '.$this->recipient->semester)
            ->action('View Scholarship Details', url('/sas/student/scholarships/'.$this->recipient->id))
            ->line('Please complete all required documents to maintain your scholarship.')
            ->line('Thank you for your hard work!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Scholarship Awarded',
            'message' => 'You have been awarded the '.$this->recipient->scholarship->scholarship_name,
            'scholarship_name' => $this->recipient->scholarship->scholarship_name,
            'amount' => $this->recipient->amount,
            'url' => '/sas/student/scholarships/'.$this->recipient->id,
            'icon' => 'award',
        ];
    }

    /**
     * Get the database representation of the notification for sas_user_notifications table.
     */
    public function toDatabase(object $notifiable): array
    {
        return $this->toArray($notifiable);
    }
}
