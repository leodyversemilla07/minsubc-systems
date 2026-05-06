<?php

namespace Modules\Admission\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Modules\Admission\Models\Enrollment;

class EnrollmentConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Enrollment $enrollment
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Enrollment Confirmed - ' . config('app.name'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'admission::mail.enrollment-confirmation',
            with: [
                'enrollment' => $this->enrollment,
                'studentId' => $this->enrollment->student_id,
                'fullName' => $this->enrollment->full_name,
                'program' => $this->enrollment->program,
                'academicYear' => $this->enrollment->academic_year,
                'semester' => $this->enrollment->semester,
                'yearLevel' => $this->enrollment->year_level,
                'feesUrl' => route('admission.admin.enrollments.index'),
            ],
        );
    }
}