<?php

namespace Modules\Registrar\Services;

use App\Services\NotificationService;
use Illuminate\Support\Facades\Log;
use Modules\Registrar\Models\DocumentRequest;

class RegistrarNotificationService
{
    public function __construct(
        protected NotificationService $notificationService
    ) {}

    /**
     * Notify student about request submission
     */
    public function notifyRequestSubmitted(DocumentRequest $request): void
    {
        $student = $request->student;
        $message = "Your document request {$request->request_number} has been submitted successfully. ".
                  'Please complete payment within 48 hours to avoid cancellation.';

        // Send SMS if phone available
        if ($student->phone) {
            $this->notificationService->sendSms($student->phone, $message, 'MinSU-DRS');
        }

        // Send email
        $this->notificationService->sendEmail(
            $student->user->email,
            'Document Request Submitted - MinSU DRS',
            $message."\n\nView your request: ".route('registrar.document-requests.show', $request->id)
        );
    }

    /**
     * Notify student about payment confirmation
     */
    public function notifyPaymentConfirmed(DocumentRequest $request): void
    {
        $student = $request->student;
        $message = "Payment confirmed for your document request {$request->request_number}. ".
                  'Your request is now being processed.';

        if ($student->phone) {
            $this->notificationService->sendSms($student->phone, $message, 'MinSU-DRS');
        }

        $this->notificationService->sendEmail(
            $student->user->email,
            'Payment Confirmed - MinSU DRS',
            $message
        );
    }

    /**
     * Notify student when document is ready for pickup
     */
    public function notifyDocumentReady(DocumentRequest $request): void
    {
        $student = $request->student;
        $message = "Your document request {$request->request_number} is ready for pickup at the Registrar's Office.";

        $smsSent = false;
        if ($student->phone) {
            $smsSent = $this->notificationService->sendSms($student->phone, $message, 'MinSU-DRS');
        }

        $this->notificationService->sendEmail(
            $student->user->email,
            'Document Ready for Pickup - MinSU DRS',
            $message."\n\nPlease bring your ID for verification."
        );
    }

    /**
     * Notify student when document is released
     */
    public function notifyDocumentReleased(DocumentRequest $request): void
    {
        $student = $request->student;
        $message = "Your document request {$request->request_number} has been released.";

        if ($student->phone) {
            $this->notificationService->sendSms($student->phone, $message, 'MinSU-DRS');
        }

        $this->notificationService->sendEmail(
            $student->user->email,
            'Document Released - MinSU DRS',
            $message
        );
    }

    /**
     * Notify registrar staff about new requests
     */
    public function notifyStaffNewRequest(DocumentRequest $request): void
    {
        $student = $request->student;
        $staffEmails = $this->getRegistrarStaffEmails();

        $subject = "New Document Request - {$request->request_number}";
        $message = "A new document request has been submitted by {$student->user->name}.\n\n".
                  "Request Number: {$request->request_number}\n".
                  "Student ID: {$student->student_id}\n".
                  "Document Type: {$request->document_type}\n".
                  "Status: {$request->status}\n".
                  "Payment Deadline: {$request->payment_deadline->format('F d, Y g:i A')}\n\n".
                  'View request: '.route('registrar.admin.dashboard');

        // Send email to all staff members
        $this->notificationService->sendBulkEmail($staffEmails, $subject, $message);

        Log::info('Registrar staff notified about new document request', [
            'request_id' => $request->id,
            'request_number' => $request->request_number,
            'staff_count' => count($staffEmails),
        ]);
    }

    /**
     * Notify registrar staff when student claims document is ready
     */
    public function notifyStudentClaimed(DocumentRequest $request): void
    {
        $student = $request->student;
        $staffEmails = $this->getRegistrarStaffEmails();

        $subject = "Student Acknowledged - {$request->request_number}";
        $message = "The student has acknowledged that their document is ready for claim.\n\n".
                  "Request Number: {$request->request_number}\n".
                  "Student: {$student->user->name}\n".
                  "Student ID: {$student->student_id}\n".
                  "Document Type: {$request->document_type}\n\n".
                  "Please prepare the document for release.\n\n".
                  'View request: '.route('registrar.admin.dashboard');

        // Send email to all staff members
        $this->notificationService->sendBulkEmail($staffEmails, $subject, $message);

        Log::info('Registrar staff notified about student acknowledgment', [
            'request_id' => $request->id,
            'request_number' => $request->request_number,
            'staff_count' => count($staffEmails),
        ]);
    }

    /**
     * Get list of registrar staff email addresses
     */
    private function getRegistrarStaffEmails(): array
    {
        $staffEmails = $this->notificationService->getStaffEmailsByRole(['registrar-admin', 'registrar-staff']);

        // Fallback to a configured email if no staff found
        if (empty($staffEmails)) {
            $fallbackEmail = config('services.registrar.notification_email');
            if ($fallbackEmail) {
                return [$fallbackEmail];
            }
        }

        return $staffEmails;
    }
}
