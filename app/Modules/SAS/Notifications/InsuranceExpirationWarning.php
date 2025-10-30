<?php

namespace App\Modules\SAS\Notifications;

use App\Modules\SAS\Models\InsuranceRecord;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InsuranceExpirationWarning extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public InsuranceRecord $insurance,
        public int $daysLeft
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
        $urgency = $this->daysLeft <= 7 ? 'urgent' : 'soon';

        return (new MailMessage)
            ->subject('Insurance Expiration Warning - Action Required')
            ->greeting('Hello, '.$notifiable->first_name.'!')
            ->line('This is a reminder that your insurance is expiring '.$urgency.'.')
            ->line('Policy Number: '.$this->insurance->policy_number)
            ->line('Provider: '.$this->insurance->provider)
            ->line('Expiration Date: '.date('F d, Y', strtotime($this->insurance->expiry_date)).' ('.$this->daysLeft.' days left)')
            ->action('View Insurance Record', url('/sas/student/insurance/'.$this->insurance->id))
            ->line('Please renew your insurance before it expires to maintain continuous coverage.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Insurance Expiring Soon',
            'message' => 'Your insurance (Policy #'.$this->insurance->policy_number.') expires in '.$this->daysLeft.' days',
            'policy_number' => $this->insurance->policy_number,
            'provider' => $this->insurance->provider,
            'expiry_date' => $this->insurance->expiry_date,
            'days_left' => $this->daysLeft,
            'url' => '/sas/student/insurance/'.$this->insurance->id,
            'icon' => 'alert-triangle',
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
