<?php

namespace Modules\SAS\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Modules\SAS\Models\InsuranceRecord;

class InsuranceApproved extends Notification implements ShouldQueue
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
            ->subject('Insurance Record Approved')
            ->greeting('Hello, '.$notifiable->first_name.'!')
            ->line('Great news! Your insurance record has been approved.')
            ->line('Policy Number: '.$this->insurance->policy_number)
            ->line('Provider: '.$this->insurance->provider)
            ->line('Coverage Type: '.$this->insurance->coverage_type)
            ->line('Coverage Amount: ₱'.number_format($this->insurance->coverage_amount, 2))
            ->line('Valid Until: '.date('F d, Y', strtotime($this->insurance->expiry_date)))
            ->action('View Insurance Record', url('/sas/student/insurance/'.$this->insurance->id))
            ->line('Please remember to renew your insurance before the expiry date.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Insurance Record Approved',
            'message' => 'Your insurance record (Policy #'.$this->insurance->policy_number.') has been approved',
            'policy_number' => $this->insurance->policy_number,
            'provider' => $this->insurance->provider,
            'url' => '/sas/student/insurance/'.$this->insurance->id,
            'icon' => 'check-circle',
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
