<?php

namespace Modules\Admission\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentPayment;

class PayMongoService
{
    protected ?string $secretKey;
    protected string $baseUrl = 'https://api.paymongo.com/v1';

    public function __construct()
    {
        $this->secretKey = config('services.paymongo.secret_key');
    }

    /**
     * Create a payment intent
     */
    public function createPaymentIntent(float $amount, array $metadata = []): ?array
    {
        $data = [
            'data' => [
                'attributes' => [
                    'amount' => (int) ($amount * 100), // Convert to cents
                    'currency' => 'PHP',
                    'metadata' => $metadata,
                ],
            ],
        ];

        try {
            $response = Http::withBasicAuth($this->secretKey, '')
                ->post("{$this->baseUrl}/payment_intents", $data);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('PayMongo payment intent error', [
                'status' => $response->status(),
                'body' => $response->json(),
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('PayMongo exception', ['message' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Create a checkout session/payment link
     */
    public function createPaymentLink(float $amount, string $description, array $metadata = []): ?array
    {
        $data = [
            'data' => [
                'attributes' => [
                    'amount' => (int) ($amount * 100),
                    'currency' => 'PHP',
                    'description' => $description,
                    'metadata' => $metadata,
                ],
            ],
        ];

        try {
            $response = Http::withBasicAuth($this->secretKey, '')
                ->post("{$this->baseUrl}/links", $data);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('PayMongo link error', [
                'status' => $response->status(),
                'body' => $response->json(),
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('PayMongo link exception', ['message' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Retrieve a payment intent
     */
    public function retrievePaymentIntent(string $paymentIntentId): ?array
    {
        try {
            $response = Http::withBasicAuth($this->secretKey, '')
                ->get("{$this->baseUrl}/payment_intents/{$paymentIntentId}");

            if ($response->successful()) {
                return $response->json();
            }

            return null;
        } catch (\Exception $e) {
            Log::error('PayMongo retrieve error', ['message' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Handle PayMongo webhook
     */
    public function handleWebhook(array $payload): ?string
    {
        $event = $payload['data']['attributes']['type'] ?? null;
        $resource = $payload['data']['attributes']['data'] ?? null;

        if (!$event || !$resource) {
            return null;
        }

        return match ($event) {
            'payment_intent.succeeded' => $this->handlePaymentSucceeded($resource),
            'payment_intent.payment_failed' => $this->handlePaymentFailed($resource),
            'payment_link.paid' => $this->handleLinkPaid($resource),
            default => null,
        };
    }

    /**
     * Handle successful payment
     */
    protected function handlePaymentSucceeded(array $resource): string
    {
        $paymentIntentId = $resource['id'] ?? null;
        $metadata = $resource['attributes']['metadata'] ?? [];
        $amount = ($resource['attributes']['amount'] ?? 0) / 100;

        if (!$metadata || !isset($metadata['enrollment_id'])) {
            return 'No enrollment found';
        }

        $enrollment = Enrollment::find($metadata['enrollment_id']);

        if (!$enrollment) {
            return 'Enrollment not found';
        }

        // Find pending payment and mark as verified
        $payment = EnrollmentPayment::where('enrollment_id', $enrollment->id)
            ->where('status', 'pending')
            ->where('reference_number', $paymentIntentId)
            ->first();

        if ($payment) {
            $payment->update([
                'status' => 'verified',
                'verified_by' => null,
                'verified_at' => now(),
            ]);
        } else {
            // Create new verified payment
            EnrollmentPayment::create([
                'enrollment_id' => $enrollment->id,
                'payment_number' => 'PAY-' . date('Ymd') . '-' . strtoupper(substr(md5($paymentIntentId), 0, 6)),
                'type' => 'full',
                'amount' => $amount,
                'method' => 'online',
                'reference_number' => $paymentIntentId,
                'status' => 'verified',
                'verified_at' => now(),
            ]);
        }

        return 'Payment processed successfully';
    }

    /**
     * Handle failed payment
     */
    protected function handlePaymentFailed(array $resource): string
    {
        $paymentIntentId = $resource['id'] ?? null;
        $metadata = $resource['attributes']['metadata'] ?? [];

        if (!$metadata || !isset($metadata['enrollment_id'])) {
            return 'No enrollment found';
        }

        $enrollment = Enrollment::find($metadata['enrollment_id']);

        if (!$enrollment) {
            return 'Enrollment not found';
        }

        // Mark pending payment as rejected
        EnrollmentPayment::where('enrollment_id', $enrollment->id)
            ->where('status', 'pending')
            ->where('reference_number', $paymentIntentId)
            ->update([
                'status' => 'rejected',
                'notes' => 'Payment failed on PayMongo',
            ]);

        return 'Payment failure recorded';
    }

    /**
     * Handle paid payment link
     */
    protected function handleLinkPaid(array $resource): string
    {
        $linkId = $resource['id'] ?? null;
        $metadata = $resource['attributes']['metadata'] ?? [];
        $amount = ($resource['attributes']['amount'] ?? 0) / 100;

        if (!$metadata || !isset($metadata['enrollment_id'])) {
            return 'No enrollment found';
        }

        $enrollment = Enrollment::find($metadata['enrollment_id']);

        if (!$enrollment) {
            return 'Enrollment not found';
        }

        // Create verified payment
        EnrollmentPayment::updateOrCreate(
            [
                'enrollment_id' => $enrollment->id,
                'reference_number' => $linkId,
            ],
            [
                'type' => 'full',
                'amount' => $amount,
                'method' => 'online',
                'status' => 'verified',
                'verified_at' => now(),
            ]
        );

        return 'Payment link paid';
    }

    /**
     * Create a GCash payment source
     */
    public function createGCashSource(float $amount, string $description, array $metadata = []): ?array
    {
        $data = [
            'data' => [
                'attributes' => [
                    'amount' => (int) ($amount * 100),
                    'currency' => 'PHP',
                    'type' => 'gcash',
                    'description' => $description,
                    'metadata' => $metadata,
                ],
            ],
        ];

        try {
            $response = Http::withBasicAuth($this->secretKey, '')
                ->post("{$this->baseUrl}/sources", $data);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('PayMongo GCash source error', [
                'status' => $response->status(),
                'body' => $response->json(),
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('PayMongo GCash exception', ['message' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Create a GrabPay payment source
     */
    public function createGrabPaySource(float $amount, string $description, array $metadata = []): ?array
    {
        $data = [
            'data' => [
                'attributes' => [
                    'amount' => (int) ($amount * 100),
                    'currency' => 'PHP',
                    'type' => 'grab_pay',
                    'description' => $description,
                    'metadata' => $metadata,
                ],
            ],
        ];

        try {
            $response = Http::withBasicAuth($this->secretKey, '')
                ->post("{$this->baseUrl}/sources", $data);

            if ($response->successful()) {
                return $response->json();
            }

            return null;
        } catch (\Exception $e) {
            Log::error('PayMongo GrabPay exception', ['message' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Check if PayMongo is configured
     */
    public function isConfigured(): bool
    {
        return !empty($this->secretKey) && $this->secretKey !== 'your_paymongo_secret_key';
    }
}