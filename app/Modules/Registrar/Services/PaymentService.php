<?php

namespace App\Modules\Registrar\Services;

use App\Models\AuditLog;
use App\Models\PaymentWebhook;
use App\Models\SystemSetting;
use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Payment;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentService
{
    private string $baseUrl;

    private string $secretKey;

    private string $publicKey;

    private ?string $webhookSecret;

    public function __construct(
        private NotificationService $notificationService
    ) {
        $this->baseUrl = 'https://api.paymongo.com/v1';
        $this->secretKey = SystemSetting::getValue('paymongo_secret_key', 'sk_test_xxxxx');
        $this->publicKey = SystemSetting::getValue('paymongo_public_key', 'pk_test_xxxxx');
        $this->webhookSecret = SystemSetting::getValue('paymongo_webhook_secret');
    }

    /**
     * Create a PayMongo payment intent for digital payment
     */
    public function createPaymentIntent(DocumentRequest $request): array
    {
        if (! $this->secretKey) {
            return [
                'success' => false,
                'error' => 'PayMongo configuration not found',
            ];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Basic '.base64_encode($this->secretKey.':'),
                'Content-Type' => 'application/json',
            ])->post('https://api.paymongo.com/v1/payment_intents', [
                'data' => [
                    'attributes' => [
                        'amount' => $request->amount * 100, // PayMongo expects amount in centavos
                        'currency' => 'PHP',
                        'payment_method_allowed' => [
                            'card',
                            'paymaya',
                            'gcash',
                            'grab_pay',
                        ],
                        'description' => "Document Request: {$request->request_number}",
                        'metadata' => [
                            'request_id' => $request->id,
                            'request_number' => $request->request_number,
                            'student_id' => $request->student_id,
                        ],
                    ],
                ],
            ]);

            if ($response->successful()) {
                $data = $response->json()['data'];

                // Store payment record
                $payment = Payment::create([
                    'document_request_id' => $request->id,
                    'payment_method' => 'digital',
                    'amount' => $request->amount,
                    'paymongo_payment_intent_id' => $data['id'],
                    'status' => 'pending',
                    'metadata' => $data,
                ]);

                // Log payment creation
                AuditLog::log(
                    'payment_created',
                    $request->student->user_id,
                    Payment::class,
                    $payment->id,
                    null,
                    $payment->toArray(),
                    "Digital payment initiated for document request {$request->request_number}",
                    [
                        'request_number' => $request->request_number,
                        'amount' => $request->amount,
                        'payment_method' => 'digital',
                    ]
                );

                return [
                    'success' => true,
                    'client_key' => $data['attributes']['client_key'],
                    'payment_intent_id' => $data['id'],
                ];
            }

            Log::error('PayMongo payment intent creation failed', [
                'request_id' => $request->id,
                'response' => $response->json(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to create payment intent',
            ];
        } catch (\Exception $e) {
            Log::error('PayMongo payment intent creation exception', [
                'request_id' => $request->id,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Payment service unavailable',
            ];
        }
    }

    /**
     * Handle PayMongo webhook for payment events.
     */
    public function handleWebhook(array $payload): bool
    {
        $eventId = $payload['data']['id'] ?? null;
        $eventType = $payload['data']['attributes']['type'] ?? null;

        // Log incoming webhook
        $webhookLog = PaymentWebhook::create([
            'event_id' => $eventId ?? 'unknown-'.uniqid(),
            'event_type' => $eventType ?? 'unknown',
            'payload' => $payload,
            'processed' => false,
        ]);

        try {
            $checkoutId = $payload['data']['attributes']['data']['id'] ?? null;

            if (! $eventType || ! $checkoutId) {
                $errorMessage = 'Invalid webhook payload: missing event type or checkout ID';
                Log::warning($errorMessage, ['payload' => $payload]);
                $webhookLog->markAsFailed($errorMessage);

                return false;
            }

            // Find payment by checkout ID
            $payment = Payment::where('paymongo_checkout_id', $checkoutId)->first();

            if (! $payment) {
                $errorMessage = "Payment not found for checkout ID: {$checkoutId}";
                Log::warning($errorMessage, ['checkout_id' => $checkoutId]);
                $webhookLog->markAsFailed($errorMessage);

                return false;
            }

            switch ($eventType) {
                case 'checkout_session.payment.paid':
                    $this->handlePaymentSuccess($payment, $payload);
                    break;

                case 'checkout_session.payment.failed':
                    $this->handlePaymentFailed($payment, $payload);
                    break;

                default:
                    Log::info('Unhandled webhook event type', ['event_type' => $eventType]);
                    break;
            }

            $webhookLog->markAsProcessed();

            return true;

        } catch (\Exception $e) {
            $errorMessage = "Webhook handling failed: {$e->getMessage()}";
            Log::error($errorMessage, [
                'error' => $e->getMessage(),
                'payload' => $payload,
            ]);
            $webhookLog->markAsFailed($errorMessage);

            return false;
        }
    }

    /**
     * Generate payment reference number for cash payments
     */
    public function generatePaymentReference(DocumentRequest $request): string
    {
        do {
            $prn = 'PRN-'.now()->format('Ymd').'-'.str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        } while (Payment::where('payment_reference_number', $prn)->exists());

        return $prn;
    }

    /**
     * Confirm cash payment
     */
    public function confirmCashPayment(string $paymentReference, string $confirmedBy): bool
    {
        $payment = Payment::where('payment_reference_number', $paymentReference)->first();

        if (! $payment || $payment->status !== 'pending') {
            return false;
        }

        $oldPayment = $payment->toArray();

        $payment->update([
            'status' => 'completed',
            'confirmed_by' => $confirmedBy,
            'paid_at' => now(),
        ]);

        // Log cash payment confirmation
        AuditLog::log(
            'payment_confirmed',
            $payment->documentRequest->student->user_id, // Log under the student who made the payment
            Payment::class,
            $payment->id,
            $oldPayment,
            $payment->fresh()->toArray(),
            "Cash payment confirmed for document request {$payment->documentRequest->request_number}",
            [
                'request_number' => $payment->documentRequest->request_number,
                'amount' => $payment->amount,
                'confirmed_by' => $confirmedBy,
                'payment_reference_number' => $paymentReference,
            ]
        );

        // Update document request
        $request = $payment->documentRequest;
        if ($request) {
            $request->update([
                'status' => 'paid',
                'payment_method' => 'cash',
            ]);

            // Send notification
            $this->notificationService->notifyPaymentConfirmed($request);
        }

        return true;
    }

    /**
     * Create a PayMongo checkout session for a document request.
     */
    public function createCheckout(DocumentRequest $request): array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Basic '.base64_encode($this->secretKey.':'),
                'Content-Type' => 'application/json',
            ])->post("{$this->baseUrl}/checkout_sessions", [
                'data' => [
                    'attributes' => [
                        'billing' => [
                            'name' => $request->student->user->full_name ?? 'Student',
                            'email' => $request->student->user->email,
                        ],
                        'line_items' => [
                            [
                                'amount' => (int) ($request->amount * 100), // Convert to centavos
                                'currency' => 'PHP',
                                'description' => "Document Request: {$request->document_type}",
                                'name' => $request->document_type,
                                'quantity' => $request->quantity,
                            ],
                        ],
                        'payment_method_types' => [
                            'card',
                            'gcash',
                            'paymaya',
                            'grab_pay',
                        ],
                        'success_url' => route('registrar.payments.success', $request->id),
                        'cancel_url' => route('registrar.document-requests.show', $request->id),
                        'reference_number' => $request->request_number,
                        'description' => "Document Request #{$request->request_number}",
                    ],
                ],
            ]);

            if ($response->successful()) {
                $data = $response->json()['data'];

                return [
                    'success' => true,
                    'checkout_id' => $data['id'],
                    'checkout_url' => $data['attributes']['checkout_url'],
                    'reference_number' => $data['attributes']['reference_number'],
                ];
            }

            Log::error('PayMongo checkout creation failed', [
                'request_id' => $request->id,
                'response' => $response->body(),
            ]);

            return [
                'success' => false,
                'error' => 'Failed to create checkout session',
            ];

        } catch (\Exception $e) {
            Log::error('PayMongo checkout creation exception', [
                'request_id' => $request->id,
                'error' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'error' => 'Payment service temporarily unavailable',
            ];
        }
    }

    /**
     * Retrieve checkout session details.
     */
    public function getCheckoutSession(string $checkoutId): ?array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Basic '.base64_encode($this->secretKey.':'),
            ])->get("{$this->baseUrl}/checkout_sessions/{$checkoutId}");

            if ($response->successful()) {
                return $response->json()['data'];
            }

            return null;

        } catch (\Exception $e) {
            Log::error('PayMongo checkout retrieval failed', [
                'checkout_id' => $checkoutId,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Handle successful payment webhook.
     */
    private function handlePaymentSuccess(Payment $payment, array $payload): void
    {
        $oldPayment = $payment->toArray();

        $paymentIntentId = $payload['data']['attributes']['data']['attributes']['payment_intent']['id'] ?? null;
        $paymentMethod = $payload['data']['attributes']['data']['attributes']['payment_intent']['attributes']['payments'][0]['attributes']['source']['type'] ?? 'card';

        $payment->update([
            'status' => 'paid',
            'paymongo_payment_intent_id' => $paymentIntentId,
            'paymongo_payment_method' => $paymentMethod,
            'paid_at' => now(),
        ]);

        // Log successful digital payment
        AuditLog::log(
            'payment_completed',
            $payment->documentRequest->student->user_id,
            Payment::class,
            $payment->id,
            $oldPayment,
            $payment->fresh()->toArray(),
            "Digital payment completed for document request {$payment->documentRequest->request_number}",
            [
                'request_number' => $payment->documentRequest->request_number,
                'amount' => $payment->amount,
                'payment_method' => $paymentMethod,
                'paymongo_payment_intent_id' => $paymentIntentId,
            ]
        );

        // Update document request status
        $payment->request->update(['status' => 'paid']);

        // Send notification
        $this->notificationService->notifyPaymentConfirmed($payment->request);

        Log::info('Payment marked as paid', [
            'payment_id' => $payment->id,
            'request_id' => $payment->request_id,
        ]);
    }

    /**
     * Handle failed payment webhook.
     */
    private function handlePaymentFailed(Payment $payment, array $payload): void
    {
        $oldPayment = $payment->toArray();

        $payment->update([
            'status' => 'failed',
        ]);

        // Log failed payment
        AuditLog::log(
            'payment_failed',
            $payment->documentRequest->student->user_id,
            Payment::class,
            $payment->id,
            $oldPayment,
            $payment->fresh()->toArray(),
            "Digital payment failed for document request {$payment->documentRequest->request_number}",
            [
                'request_number' => $payment->documentRequest->request_number,
                'amount' => $payment->amount,
                'failure_reason' => $payload['data']['attributes']['data']['attributes']['failure_reason'] ?? 'Unknown',
            ]
        );

        Log::info('Payment marked as failed', [
            'payment_id' => $payment->id,
            'request_id' => $payment->request_id,
        ]);
    }

    /**
     * Verify webhook signature (for production security).
     */
    public function verifyWebhookSignature(string $signature, string $payload): bool
    {
        if (! $this->webhookSecret) {
            Log::warning('Webhook secret not configured - skipping signature verification');

            return true; // Allow webhook in development mode
        }

        // PayMongo uses HMAC SHA256 for webhook signature verification
        $expectedSignature = hash_hmac('sha256', $payload, $this->webhookSecret);

        $isValid = hash_equals($expectedSignature, $signature);

        if (! $isValid) {
            Log::warning('Webhook signature verification failed', [
                'expected' => substr($expectedSignature, 0, 10).'...',
                'received' => substr($signature, 0, 10).'...',
            ]);
        }

        return $isValid;
    }
}
