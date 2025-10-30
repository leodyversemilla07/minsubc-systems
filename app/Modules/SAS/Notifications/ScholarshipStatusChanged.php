<?php

namespace App\Modules\SAS\Notifications;

use App\Modules\SAS\Models\ScholarshipRecipient;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ScholarshipStatusChanged extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public ScholarshipRecipient $recipient,
        public string $oldStatus,
        public string $newStatus
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
        $message = (new MailMessage)
            ->subject('Scholarship Status Update')
            ->greeting('Hello, '.$notifiable->first_name.'!')
            ->line('Your scholarship status has been updated.')
            ->line('Scholarship: '.$this->recipient->scholarship->scholarship_name)
            ->line('Previous Status: '.ucfirst($this->oldStatus))
            ->line('New Status: '.ucfirst($this->newStatus));

        if ($this->newStatus === 'suspended') {
            $message->line('Your scholarship has been suspended. Please contact the Student Affairs office for more information.');
        } elseif ($this->newStatus === 'cancelled') {
            $message->line('Your scholarship has been cancelled. Please contact the Student Affairs office if you have any questions.');
        } elseif ($this->newStatus === 'completed') {
            $message->line('Congratulations! You have successfully completed the requirements for this scholarship.');
        }

        return $message->action('View Scholarship', url('/sas/student/scholarships/'.$this->recipient->id));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Scholarship Status Updated',
            'message' => 'Your '.$this->recipient->scholarship->scholarship_name.' status changed to '.ucfirst($this->newStatus),
            'scholarship_name' => $this->recipient->scholarship->scholarship_name,
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
            'url' => '/sas/student/scholarships/'.$this->recipient->id,
            'icon' => 'bell',
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
