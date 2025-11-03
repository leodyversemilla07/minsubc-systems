<?php

namespace Modules\SAS\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Modules\SAS\Models\InsuranceRecord;

class InsuranceSubmitted extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public InsuranceRecord $insurance
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
            ->subject('Insurance Record Submitted Successfully')
            ->greeting('Hello, '.$notifiable->first_name.'!')
            ->line('Your insurance record has been successfully submitted and is now under review.')
            ->line('Policy Number: '.$this->insurance->policy_number)
            ->line('Provider: '.$this->insurance->provider)
            ->line('Coverage Type: '.$this->insurance->coverage_type)
            ->line('You will receive another notification once your insurance record has been reviewed.')
            ->action('View Insurance Record', url('/sas/student/insurance/'.$this->insurance->id))
            ->line('Thank you for keeping your insurance information up to date!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Insurance Record Submitted',
            'message' => 'Your insurance record (Policy #'.$this->insurance->policy_number.') has been submitted',
            'policy_number' => $this->insurance->policy_number,
            'provider' => $this->insurance->provider,
            'url' => '/sas/student/insurance/'.$this->insurance->id,
            'icon' => 'shield-check',
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
