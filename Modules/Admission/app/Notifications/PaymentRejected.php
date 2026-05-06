<?php

namespace Modules\Admission\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class PaymentRejected extends Notification
{
    use Queueable;

    public function __construct(
        public $payment,
        public string $reason
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Payment Rejected - ' . config('app.name'))
            ->greeting('Hello!')
            ->line('Your payment has been rejected.')
            ->line('**Payment Number:** ' . $this->payment->payment_number)
            ->line('**Amount:** ₱' . number_format($this->payment->amount, 2))
            ->line('**Reason:** ' . $this->reason)
            ->line('Please submit a new payment with correct details.')
            ->action('View Enrollment', route('dashboard'))
            ->line('Contact the registrar if you have questions.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'payment_rejected',
            'payment_id' => $this->payment->id,
            'payment_number' => $this->payment->payment_number,
            'amount' => $this->payment->amount,
            'reason' => $this->reason,
            'message' => 'Payment of ₱' . number_format($this->payment->amount, 2) . ' was rejected: ' . $this->reason,
        ];
    }
}