<?php

namespace Modules\Admission\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Modules\Admission\Models\Applicant;

class ApplicationReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Applicant $applicant
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Application Received - ' . config('app.name'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'admission::mail.application-received',
            with: [
                'applicant' => $this->applicant,
                'applicationNumber' => $this->applicant->application_number,
                'fullName' => $this->applicant->full_name,
                'program' => $this->applicant->program?->name,
                'trackUrl' => route('admission.track'),
            ],
        );
    }
}