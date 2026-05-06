<?php

namespace Modules\Admission\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Admission\Services\PayMongoService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Crypt;

class PayMongoWebhookController extends Controller
{
    public function __construct(
        private PayMongoService $payMongoService
    ) {}

    /**
     * Handle PayMongo webhook
     */
    public function handle(Request $request)
    {
        $signature = $request->header('Paymongo-Signature');

        if (!$signature) {
            return response()->json(['error' => 'Missing signature'], 401);
        }

        $webhookSecret = config('services.paymongo.webhook_secret');

        // Verify webhook signature
        if ($webhookSecret) {
            $computedSignature = hash_hmac('sha256', $request->getContent(), $webhookSecret);
            
            // PayMongo signature format: t=timestamp,v1=signature
            $parts = explode(',', $signature);
            $timestamp = null;
            $sig = null;

            foreach ($parts as $part) {
                if (str_starts_with($part, 't=')) {
                    $timestamp = substr($part, 2);
                }
                if (str_starts_with($part, 'v1=')) {
                    $sig = substr($part, 3);
                }
            }

            $expectedSignature = hash_hmac('sha256', "{$timestamp}.{$request->getContent()}", $webhookSecret);

            if ($sig !== $expectedSignature) {
                Log::warning('Invalid PayMongo webhook signature', [
                    'expected' => $expectedSignature,
                    'received' => $sig,
                ]);
                return response()->json(['error' => 'Invalid signature'], 401);
            }
        }

        try {
            $payload = $request->all();
            
            Log::info('PayMongo webhook received', [
                'event' => $payload['data']['attributes']['type'] ?? 'unknown',
            ]);

            $result = $this->payMongoService->handleWebhook($payload);

            if ($result) {
                Log::info('PayMongo webhook processed', ['result' => $result]);
            }

            return response()->json(['received' => true]);
        } catch (\Exception $e) {
            Log::error('PayMongo webhook error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => 'Webhook processing failed'], 500);
        }
    }
}