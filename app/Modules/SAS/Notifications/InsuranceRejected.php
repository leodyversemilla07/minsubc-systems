<?php

namespace App\Modules\SAS\Notifications;

use App\Modules\SAS\Models\InsuranceRecord;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InsuranceRejected extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public InsuranceRecord $insurance,
        public string $reason
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
            ->subject('Insurance Record Requires Review')
            ->greeting('Hello, '.$notifiable->first_name.'!')
            ->line('Your insurance record requires review and has not been approved at this time.')
            ->line('Policy Number: '.$this->insurance->policy_number)
            ->line('Provider: '.$this->insurance->provider)
            ->line('Reason: '.$this->reason)
            ->action('View Insurance Record', url('/sas/student/insurance/'.$this->insurance->id))
            ->line('Please contact the Student Affairs office for more information on how to proceed.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Insurance Record Requires Review',
            'message' => 'Your insurance record (Policy #'.$this->insurance->policy_number.') requires review',
            'policy_number' => $this->insurance->policy_number,
            'provider' => $this->insurance->provider,
            'reason' => $this->reason,
            'url' => '/sas/student/insurance/'.$this->insurance->id,
            'icon' => 'alert-circle',
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
