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

        // Send branded email
        $emailBody = "Dear {$student->user->full_name},\n\n".
            "Your document request has been submitted successfully.\n\n".
            "Request Number: {$request->request_number}\n".
            "Document Type: {$this->formatDocumentType($request->document_type)}\n".
            'Amount: ₱'.number_format($request->amount, 2)."\n".
            "Payment Deadline: {$request->payment_deadline->format('F d, Y g:i A')}\n\n".
            "Please complete your payment within 48 hours to avoid automatic cancellation.\n\n".
            'Thank you for using the MinSU Document Request System.';

        $this->notificationService->sendBrandedEmail(
            $student->user->email,
            'Document Request Submitted - '.$request->request_number,
            $emailBody,
            'registrar',
            [
                'action_url' => route('registrar.document-requests.show', $request->id),
                'action_text' => 'View Request',
            ]
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

        $emailBody = "Dear {$student->user->full_name},\n\n".
            "Great news! Your payment has been confirmed.\n\n".
            "Request Number: {$request->request_number}\n".
            "Document Type: {$this->formatDocumentType($request->document_type)}\n".
            'Amount Paid: ₱'.number_format($request->amount, 2)."\n\n".
            "Your document request is now being processed. We will notify you once it's ready for pickup.\n\n".
            'Thank you for your patience.';

        $this->notificationService->sendBrandedEmail(
            $student->user->email,
            'Payment Confirmed - '.$request->request_number,
            $emailBody,
            'registrar',
            [
                'action_url' => route('registrar.document-requests.show', $request->id),
                'action_text' => 'Track Your Request',
            ]
        );
    }

    /**
     * Notify student when document is ready for pickup
     */
    public function notifyDocumentReady(DocumentRequest $request): void
    {
        $student = $request->student;
        $message = "Your document request {$request->request_number} is ready for pickup at the Registrar's Office.";

        if ($student->phone) {
            $this->notificationService->sendSms($student->phone, $message, 'MinSU-DRS');
        }

        $emailBody = "Dear {$student->user->full_name},\n\n".
            "Your document is now ready for pickup!\n\n".
            "Request Number: {$request->request_number}\n".
            "Document Type: {$this->formatDocumentType($request->document_type)}\n\n".
            "📍 Pickup Location: Office of the University Registrar\n".
            "🕐 Office Hours: Monday to Friday, 8:00 AM - 5:00 PM\n\n".
            "Please bring a valid ID for verification when claiming your document.\n\n".
            'Thank you for using the MinSU Document Request System.';

        $this->notificationService->sendBrandedEmail(
            $student->user->email,
            '📄 Document Ready for Pickup - '.$request->request_number,
            $emailBody,
            'registrar',
            [
                'action_url' => route('registrar.document-requests.show', $request->id),
                'action_text' => 'View Details',
            ]
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

        $emailBody = "Dear {$student->user->full_name},\n\n".
            "Your document has been successfully released.\n\n".
            "Request Number: {$request->request_number}\n".
            "Document Type: {$this->formatDocumentType($request->document_type)}\n".
            'Released On: '.now()->format('F d, Y g:i A')."\n\n".
            "Thank you for using the MinSU Document Request System.\n\n".
            'If you have any questions or need additional documents, feel free to submit a new request.';

        $this->notificationService->sendBrandedEmail(
            $student->user->email,
            '✅ Document Released - '.$request->request_number,
            $emailBody,
            'registrar'
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
        $message = "A new document request has been submitted.\n\n".
                  "Request Number: {$request->request_number}\n".
                  "Student: {$student->user->full_name}\n".
                  "Student ID: {$student->student_id}\n".
                  "Document Type: {$this->formatDocumentType($request->document_type)}\n".
                  'Amount: ₱'.number_format($request->amount, 2)."\n".
                  "Payment Deadline: {$request->payment_deadline->format('F d, Y g:i A')}";

        // Send branded email to all staff members
        $this->notificationService->sendBrandedBulkEmail(
            $staffEmails,
            $subject,
            $message,
            'registrar',
            [
                'action_url' => route('registrar.admin.dashboard'),
                'action_text' => 'View Dashboard',
            ]
        );

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
                  "Student: {$student->user->full_name}\n".
                  "Student ID: {$student->student_id}\n".
                  "Document Type: {$this->formatDocumentType($request->document_type)}\n\n".
                  'Please prepare the document for release.';

        // Send branded email to all staff members
        $this->notificationService->sendBrandedBulkEmail(
            $staffEmails,
            $subject,
            $message,
            'registrar',
            [
                'action_url' => route('registrar.admin.dashboard'),
                'action_text' => 'View Dashboard',
            ]
        );

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

    /**
     * Format document type for display.
     */
    private function formatDocumentType(string $type): string
    {
        $types = [
            'coe' => 'Certificate of Enrollment',
            'cog' => 'Certificate of Grades',
            'tor' => 'Transcript of Records',
            'honorable_dismissal' => 'Honorable Dismissal',
            'certificate_good_moral' => 'Certificate of Good Moral Character',
            'cav' => 'Certificate of Authentication and Verification',
            'diploma' => 'Diploma (Certified True Copy)',
            'so' => 'Special Order',
            'form_137' => 'Form 137',
        ];

        return $types[$type] ?? $type;
    }
}
