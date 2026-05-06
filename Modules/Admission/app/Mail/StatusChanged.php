<?php

namespace Modules\Admission\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Modules\Admission\Models\Applicant;

class StatusChanged extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Applicant $applicant,
        public string $oldStatus,
        public string $newStatus
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Application Status Update - ' . config('app.name'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'admission::mail.status-changed',
            with: [
                'applicant' => $this->applicant,
                'applicationNumber' => $this->applicant->application_number,
                'fullName' => $this->applicant->full_name,
                'oldStatus' => $this->oldStatus,
                'newStatus' => $this->newStatus,
                'trackUrl' => route('admission.track'),
            ],
        );
    }
}