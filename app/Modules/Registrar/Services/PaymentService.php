<?php

namespace App\Modules\Registrar\Services;

use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Payment;
use App\Modules\Registrar\Models\PaymentWebhook;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentService
{
    private ?string $paymongoSecretKey;

    private ?string $paymongoPublicKey;

    private ?string $webhookSecret;

    public function __construct(
        private NotificationService $notificationService
    ) {
        $this->paymongoSecretKey = config('services.paymongo.secret_key');
        $this->paymongoPublicKey = config('services.paymongo.public_key');
        $this->webhookSecret = config('services.paymongo.webhook_secret');
    }

    /**
     * Create a PayMongo payment intent for digital payment
     */
    public function createPaymentIntent(DocumentRequest $request): array
    {
        if (! $this->paymongoSecretKey) {
            return [
                'success' => false,
                'error' => 'PayMongo configuration not found',
            ];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Basic '.base64_encode($this->paymongoSecretKey.':'),
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
                Payment::create([
                    'document_request_id' => $request->id,
                    'payment_method' => 'digital',
                    'amount' => $request->amount,
                    'paymongo_payment_intent_id' => $data['id'],
                    'status' => 'pending',
                    'metadata' => $data,
                ]);

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
     * Handle PayMongo webhook for payment confirmation
     */
    public function handleWebhook(array $payload): bool
    {
        try {
            $event = $payload['data']['attributes']['type'];
            $paymentIntentId = $payload['data']['attributes']['data']['id'];

            // Store webhook data
            PaymentWebhook::create([
                'paymongo_payment_intent_id' => $paymentIntentId,
                'event_type' => $event,
                'payload' => $payload,
                'processed_at' => now(),
            ]);

            if ($event === 'payment_intent.succeeded') {
                $paymentIntent = $payload['data']['attributes']['data'];

                // Find and update payment
                $payment = Payment::where('paymongo_payment_intent_id', $paymentIntentId)->first();

                if ($payment) {
                    $payment->update([
                        'status' => 'completed',
                        'paid_at' => now(),
                        'metadata' => array_merge($payment->metadata ?? [], [
                            'webhook_data' => $paymentIntent,
                        ]),
                    ]);

                    // Update document request status
                    $request = $payment->documentRequest;
                    if ($request) {
                        $request->update([
                            'status' => 'paid',
                            'payment_method' => 'digital',
                        ]);

                        // Send notification
                        $this->notificationService->notifyPaymentConfirmed($request);
                    }
                }
            }

            return true;
        } catch (\Exception $e) {
            Log::error('PayMongo webhook processing failed', [
                'payload' => $payload,
                'error' => $e->getMessage(),
            ]);

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
        } while (Payment::where('payment_reference', $prn)->exists());

        // Create payment record for cash payment
        Payment::create([
            'document_request_id' => $request->id,
            'payment_method' => 'cash',
            'amount' => $request->amount,
            'payment_reference' => $prn,
            'status' => 'pending',
        ]);

        return $prn;
    }

    /**
     * Confirm cash payment
     */
    public function confirmCashPayment(string $paymentReference, string $confirmedBy): bool
    {
        $payment = Payment::where('payment_reference', $paymentReference)->first();

        if (! $payment || $payment->status !== 'pending') {
            return false;
        }

        $payment->update([
            'status' => 'completed',
            'confirmed_by' => $confirmedBy,
            'paid_at' => now(),
        ]);

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
     * Verify webhook signature
     */
    public function verifyWebhookSignature(string $signature, string $payload): bool
    {
        // PayMongo webhook signature verification
        // This is a simplified version - implement proper HMAC verification
        return true; // TODO: Implement proper signature verification
    }
}
