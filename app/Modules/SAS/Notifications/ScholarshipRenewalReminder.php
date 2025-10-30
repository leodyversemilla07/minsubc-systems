<?php

namespace App\Modules\SAS\Notifications;

use App\Modules\SAS\Models\ScholarshipRecipient;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ScholarshipRenewalReminder extends Notification implements ShouldQueue
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
        $daysLeft = now()->diffInDays($this->recipient->expiration_date);

        return (new MailMessage)
            ->subject('Scholarship Renewal Reminder')
            ->greeting('Hello, '.$notifiable->first_name.'!')
            ->line('Your scholarship is expiring soon and may be eligible for renewal.')
            ->line('Scholarship: '.$this->recipient->scholarship->scholarship_name)
            ->line('Expiration Date: '.date('F d, Y', strtotime($this->recipient->expiration_date)).' ('.$daysLeft.' days left)')
            ->action('View Scholarship', url('/sas/student/scholarships/'.$this->recipient->id))
            ->line('Please contact the Student Affairs office for renewal procedures.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $daysLeft = now()->diffInDays($this->recipient->expiration_date);

        return [
            'title' => 'Scholarship Renewal Reminder',
            'message' => 'Your '.$this->recipient->scholarship->scholarship_name.' is expiring in '.$daysLeft.' days',
            'scholarship_name' => $this->recipient->scholarship->scholarship_name,
            'expiration_date' => $this->recipient->expiration_date,
            'url' => '/sas/student/scholarships/'.$this->recipient->id,
            'icon' => 'refresh-cw',
        ];
    }

    /**
     * Get the database representation of the notification.
     */
    public function toDatabase(object $notifiable): array
    {
        return $this->toArray($notifiable);
    }
}
