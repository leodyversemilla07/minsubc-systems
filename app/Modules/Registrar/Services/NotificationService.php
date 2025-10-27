<?php

namespace App\Modules\Registrar\Services;

use App\Models\User;
use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Notification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    /**
     * Send SMS notification
     */
    public function sendSms(string $phone, string $message): bool
    {
        $semaphoreApiKey = config('services.semaphore.api_key');
        $semaphoreSenderName = config('services.semaphore.sender_name', 'MinSU-DRS');

        if (! $semaphoreApiKey || ! $phone) {
            Log::warning('SMS not sent: Missing API key or phone number', [
                'phone' => $phone,
                'has_api_key' => ! empty($semaphoreApiKey),
            ]);

            return false;
        }

        try {
            $response = Http::post('https://api.semaphore.co/api/v4/messages', [
                'apikey' => $semaphoreApiKey,
                'number' => $phone,
                'message' => $message,
                'sendername' => $semaphoreSenderName ?? 'MinSU-DRS',
            ]);

            $responseData = $response->json();

            // Check both HTTP status and API response content
            if ($response->successful() && ! isset($responseData['apikey'])) {
                Log::info('SMS sent successfully', [
                    'phone' => $phone,
                    'response' => $responseData,
                ]);

                return true;
            }

            Log::error('SMS sending failed', [
                'phone' => $phone,
                'http_status' => $response->status(),
                'response' => $responseData,
            ]);

            return false;
        } catch (\Exception $e) {
            Log::error('SMS sending exception', [
                'phone' => $phone,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Send email notification
     */
    public function sendEmail(string $email, string $subject, string $message): bool
    {
        $sendgridApiKey = config('services.sendgrid.api_key');

        if (! $sendgridApiKey || ! $email) {
            Log::warning('Email not sent: Missing API key or email address', [
                'email' => $email,
                'has_api_key' => ! empty($sendgridApiKey),
            ]);

            return false;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$sendgridApiKey,
                'Content-Type' => 'application/json',
            ])->post('https://api.sendgrid.com/v3/mail/send', [
                'personalizations' => [
                    [
                        'to' => [['email' => $email]],
                        'subject' => $subject,
                    ],
                ],
                'from' => [
                    'email' => config('mail.from.address', 'noreply@minsu.edu.ph'),
                    'name' => config('mail.from.name', 'MinSU Document Request System'),
                ],
                'content' => [
                    [
                        'type' => 'text/plain',
                        'value' => $message,
                    ],
                ],
            ]);

            if ($response->successful()) {
                Log::info('Email sent successfully', [
                    'email' => $email,
                    'subject' => $subject,
                ]);

                return true;
            }

            Log::error('Email sending failed', [
                'email' => $email,
                'subject' => $subject,
                'response' => $response->json(),
            ]);

            return false;
        } catch (\Exception $e) {
            Log::error('Email sending exception', [
                'email' => $email,
                'subject' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Notify student about request submission
     */
    public function notifyRequestSubmitted(DocumentRequest $request): void
    {
        $student = $request->student;
        $message = "Your document request {$request->request_number} has been submitted successfully. ".
                  'Please complete payment within 48 hours to avoid cancellation.';

        // Store notification record
        Notification::create([
            'request_id' => $request->id,
            'student_id' => $student->student_id,
            'type' => 'sms',
            'message' => $message,
        ]);

        // Send SMS if phone available
        if ($student->phone) {
            $this->sendSms($student->phone, $message);
        }

        // Send email
        $this->sendEmail(
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

        Notification::create([
            'request_id' => $request->id,
            'student_id' => $student->student_id,
            'type' => 'sms',
            'message' => $message,
        ]);

        if ($student->phone) {
            $this->sendSms($student->phone, $message);
        }

        $this->sendEmail(
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

        $notification = Notification::create([
            'request_id' => $request->id,
            'student_id' => $student->student_id,
            'type' => 'sms',
            'message' => $message,
        ]);

        $smsSent = false;
        if ($student->phone) {
            $smsSent = $this->sendSms($student->phone, $message);
        }

        // Update notification status based on SMS sending result
        $notification->update([
            'status' => $smsSent ? 'sent' : 'failed',
            'sent_at' => $smsSent ? now() : null,
        ]);

        $this->sendEmail(
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

        $notification = Notification::create([
            'request_id' => $request->id,
            'student_id' => $student->student_id,
            'type' => 'sms',
            'message' => $message,
        ]);

        $smsSent = false;
        if ($student->phone) {
            $smsSent = $this->sendSms($student->phone, $message);
        }

        // Update notification status based on SMS sending result
        $notification->update([
            'status' => $smsSent ? 'sent' : 'failed',
            'sent_at' => $smsSent ? now() : null,
        ]);

        $this->sendEmail(
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
        foreach ($staffEmails as $email) {
            $this->sendEmail($email, $subject, $message);
        }

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
        foreach ($staffEmails as $email) {
            $this->sendEmail($email, $subject, $message);
        }

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
        // Get users with registrar roles
        $staffUsers = User::role(['registrar-admin', 'registrar-staff'])
            ->pluck('email')
            ->toArray();

        // Fallback to a configured email if no staff found
        if (empty($staffUsers)) {
            $fallbackEmail = config('services.registrar.notification_email');
            if ($fallbackEmail) {
                return [$fallbackEmail];
            }
        }

        return $staffUsers;
    }
}
