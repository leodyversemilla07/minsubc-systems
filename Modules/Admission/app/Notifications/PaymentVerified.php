<?php

namespace Modules\Admission\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class PaymentVerified extends Notification
{
    use Queueable;

    public function __construct(
        public $payment
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Payment Verified - ' . config('app.name'))
            ->greeting('Hello!')
            ->line('Your payment has been verified.')
            ->line('**Payment Number:** ' . $this->payment->payment_number)
            ->line('**Amount:** ₱' . number_format($this->payment->amount, 2))
            ->line('**Method:** ' . ucfirst($this->payment->method))
            ->action('View Enrollment', route('dashboard'))
            ->line('Thank you!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'payment_verified',
            'payment_id' => $this->payment->id,
            'payment_number' => $this->payment->payment_number,
            'amount' => $this->payment->amount,
            'message' => 'Payment of ₱' . number_format($this->payment->amount, 2) . ' has been verified',
        ];
    }
}