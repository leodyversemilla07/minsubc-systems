<?php

namespace Modules\Admission\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Modules\Admission\Services\PayMongoService;

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

        if (! $signature) {
            return response()->json(['error' => 'Missing signature'], 401);
        }

        $webhookSecret = config('services.paymongo.webhook_secret');
        if (! is_string($webhookSecret) || $webhookSecret === '') {
            Log::error('PayMongo webhook secret is not configured');

            return response()->json(['error' => 'Webhook unavailable'], 503);
        }

        // PayMongo signature format: t=unix_timestamp,v1=signature
        $parts = [];
        foreach (explode(',', $signature) as $part) {
            $pair = explode('=', trim($part), 2);
            if (count($pair) === 2) {
                $parts[$pair[0]] = $pair[1];
            }
        }

        $timestamp = $parts['t'] ?? null;
        $providedSignature = $parts['v1'] ?? null;
        if (! is_string($timestamp) || ! ctype_digit($timestamp)
            || abs(time() - (int) $timestamp) > 300
            || ! is_string($providedSignature)
            || ! preg_match('/^[a-f0-9]{64}$/i', $providedSignature)) {
            return response()->json(['error' => 'Invalid signature'], 401);
        }

        $expectedSignature = hash_hmac('sha256', "{$timestamp}.{$request->getContent()}", $webhookSecret);
        if (! hash_equals($expectedSignature, $providedSignature)) {
            Log::warning('Invalid PayMongo webhook signature');

            return response()->json(['error' => 'Invalid signature'], 401);
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
