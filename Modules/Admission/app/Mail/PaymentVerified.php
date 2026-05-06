<?php

namespace Modules\Admission\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Modules\Admission\Models\EnrollmentPayment;

class PaymentVerified extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public EnrollmentPayment $payment
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Payment Verified - ' . config('app.name'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'admission::mail.payment-verified',
            with: [
                'payment' => $this->payment,
                'paymentNumber' => $this->payment->payment_number,
                'amount' => number_format($this->payment->amount, 2),
                'enrollment' => $this->payment->enrollment,
            ],
        );
    }
}