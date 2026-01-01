<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    public function __construct(
        protected ?BrandedEmailService $brandedEmailService = null
    ) {
        $this->brandedEmailService = $brandedEmailService ?? new BrandedEmailService;
    }

    /**
     * Send SMS notification via Semaphore API
     */
    public function sendSms(string $phone, string $message, ?string $senderName = null): bool
    {
        $semaphoreApiKey = config('services.semaphore.api_key');
        $semaphoreSenderName = $senderName ?? config('services.semaphore.sender_name', 'MinSU');

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
                'sendername' => $semaphoreSenderName,
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
     * Send email notification via SendGrid API
     */
    public function sendEmail(
        string $email,
        string $subject,
        string $message,
        ?string $fromEmail = null,
        ?string $fromName = null
    ): bool {
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
                    'email' => $fromEmail ?? config('mail.from.address', 'noreply@minsu.edu.ph'),
                    'name' => $fromName ?? config('mail.from.name', 'MinSU BC Systems'),
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
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Send email to multiple recipients
     */
    public function sendBulkEmail(
        array $emails,
        string $subject,
        string $message,
        ?string $fromEmail = null,
        ?string $fromName = null
    ): int {
        $successCount = 0;

        foreach ($emails as $email) {
            if ($this->sendEmail($email, $subject, $message, $fromEmail, $fromName)) {
                $successCount++;
            }
        }

        return $successCount;
    }

    /**
     * Send a branded HTML email.
     */
    public function sendBrandedEmail(
        string $email,
        string $subject,
        string $message,
        string $module = 'general',
        array $options = []
    ): bool {
        return $this->brandedEmailService->send($email, $subject, $message, $module, $options);
    }

    /**
     * Send branded emails to multiple recipients.
     */
    public function sendBrandedBulkEmail(
        array $emails,
        string $subject,
        string $message,
        string $module = 'general',
        array $options = []
    ): int {
        $successCount = 0;

        foreach ($emails as $email) {
            if ($this->brandedEmailService->send($email, $subject, $message, $module, $options)) {
                $successCount++;
            }
        }

        return $successCount;
    }

    /**
     * Get staff emails by roles
     */
    public function getStaffEmailsByRole(array $roles): array
    {
        return User::role($roles)
            ->pluck('email')
            ->toArray();
    }

    /**
     * Get staff emails by permission
     */
    public function getStaffEmailsByPermission(string $permission): array
    {
        return User::permission($permission)
            ->pluck('email')
            ->toArray();
    }
}
