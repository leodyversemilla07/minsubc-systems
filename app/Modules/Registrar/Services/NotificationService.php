<?php

namespace App\Modules\Registrar\Services;

use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Notification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    private ?string $semaphoreApiKey;

    private ?string $semaphoreSenderName;

    private ?string $sendgridApiKey;

    public function __construct()
    {
        $this->semaphoreApiKey = config('services.semaphore.api_key');
        $this->semaphoreSenderName = config('services.semaphore.sender_name');
        $this->sendgridApiKey = config('services.sendgrid.api_key');
    }

    /**
     * Send SMS notification
     */
    public function sendSms(string $phone, string $message): bool
    {
        if (! $this->semaphoreApiKey || ! $phone) {
            Log::warning('SMS not sent: Missing API key or phone number', [
                'phone' => $phone,
                'has_api_key' => ! empty($this->semaphoreApiKey),
            ]);

            return false;
        }

        try {
            $response = Http::post('https://api.semaphore.co/api/v4/messages', [
                'apikey' => $this->semaphoreApiKey,
                'number' => $phone,
                'message' => $message,
                'sendername' => $this->semaphoreSenderName ?? 'MinSU-DRS',
            ]);

            if ($response->successful()) {
                Log::info('SMS sent successfully', [
                    'phone' => $phone,
                    'response' => $response->json(),
                ]);

                return true;
            }

            Log::error('SMS sending failed', [
                'phone' => $phone,
                'response' => $response->json(),
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
        if (! $this->sendgridApiKey || ! $email) {
            Log::warning('Email not sent: Missing API key or email address', [
                'email' => $email,
                'has_api_key' => ! empty($this->sendgridApiKey),
            ]);

            return false;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$this->sendgridApiKey,
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
            'document_request_id' => $request->id,
            'student_id' => $student->student_id,
            'type' => 'request_submitted',
            'message' => $message,
            'channel' => 'sms',
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
            'document_request_id' => $request->id,
            'student_id' => $student->student_id,
            'type' => 'payment_confirmed',
            'message' => $message,
            'channel' => 'sms',
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

        Notification::create([
            'document_request_id' => $request->id,
            'student_id' => $student->student_id,
            'type' => 'document_ready',
            'message' => $message,
            'channel' => 'sms',
        ]);

        if ($student->phone) {
            $this->sendSms($student->phone, $message);
        }

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

        Notification::create([
            'document_request_id' => $request->id,
            'student_id' => $student->student_id,
            'type' => 'document_released',
            'message' => $message,
            'channel' => 'sms',
        ]);

        if ($student->phone) {
            $this->sendSms($student->phone, $message);
        }

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
        // This would typically send to a staff notification system
        // For now, we'll log it
        Log::info('New document request submitted', [
            'request_id' => $request->id,
            'student_id' => $request->student_id,
            'document_type' => $request->document_type,
        ]);

        // TODO: Send notification to registrar staff dashboard or email group
    }
}
