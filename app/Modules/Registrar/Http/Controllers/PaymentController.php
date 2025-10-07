<?php

namespace App\Modules\Registrar\Http\Controllers;

use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Payment;
use App\Modules\Registrar\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function __construct(
        private PaymentService $paymentService
    ) {}

    /**
     * Initiate digital payment for a document request
     */
    public function initiatePayment(DocumentRequest $request): JsonResponse
    {
        if ($request->status !== 'pending_payment') {
            return response()->json([
                'success' => false,
                'message' => 'Payment cannot be initiated for this request.',
            ], 400);
        }

        $result = $this->paymentService->createPaymentIntent($request);

        if ($result['success']) {
            return response()->json([
                'success' => true,
                'client_key' => $result['client_key'],
                'payment_intent_id' => $result['payment_intent_id'],
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => $result['error'] ?? 'Failed to initiate payment.',
        ], 500);
    }

    /**
     * Handle PayMongo webhook
     */
    public function handleWebhook(Request $request): JsonResponse
    {
        $payload = $request->all();

        // Verify webhook signature (implement proper verification)
        // $signature = $request->header('paymongo-signature');
        // if (!$this->paymentService->verifyWebhookSignature($signature, json_encode($payload))) {
        //     return response()->json(['error' => 'Invalid signature'], 401);
        // }

        $processed = $this->paymentService->handleWebhook($payload);

        if ($processed) {
            return response()->json(['status' => 'ok']);
        }

        return response()->json(['error' => 'Webhook processing failed'], 500);
    }

    /**
     * Generate payment reference for cash payment
     */
    public function generateCashPayment(DocumentRequest $request): JsonResponse
    {
        if ($request->status !== 'pending_payment') {
            return response()->json([
                'success' => false,
                'message' => 'Cash payment cannot be generated for this request.',
            ], 400);
        }

        $prn = $this->paymentService->generatePaymentReference($request);

        return response()->json([
            'success' => true,
            'payment_reference' => $prn,
            'amount' => $request->amount,
            'expires_at' => $request->payment_deadline,
        ]);
    }

    /**
     * Confirm cash payment (for cashier)
     */
    public function confirmCashPayment(Request $request): JsonResponse
    {
        $request->validate([
            'payment_reference' => 'required|string',
        ]);

        $confirmed = $this->paymentService->confirmCashPayment(
            $request->payment_reference,
            auth()->user()?->email ?? 'system'
        );

        if ($confirmed) {
            return response()->json([
                'success' => true,
                'message' => 'Cash payment confirmed successfully.',
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Payment reference not found or already processed.',
        ], 404);
    }

    /**
     * Show payment status page
     */
    public function showPaymentStatus(DocumentRequest $request)
    {
        return Inertia::render('registrar/payments/status', [
            'request' => $request->load(['payments', 'student']),
        ]);
    }

    /**
     * Show cashier dashboard
     */
    public function cashierDashboard()
    {
        return Inertia::render('registrar/cashier/dashboard');
    }

    /**
     * Verify payment reference and return payment details
     */
    public function verifyPaymentReference(Request $request)
    {
        $request->validate([
            'payment_reference' => 'required|string',
        ]);

        $payment = Payment::where('payment_reference', $request->payment_reference)
            ->where('payment_method', 'cash')
            ->where('status', 'pending')
            ->with(['documentRequest.student.user'])
            ->first();

        if (! $payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment reference not found or already processed.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'payment' => [
                'id' => $payment->id,
                'reference' => $payment->payment_reference,
                'amount' => $payment->amount,
                'request_number' => $payment->documentRequest->request_number,
                'student_name' => $payment->documentRequest->student->user->name,
                'student_id' => $payment->documentRequest->student->student_id,
                'document_type' => $payment->documentRequest->document_type,
                'created_at' => $payment->created_at,
            ],
        ]);
    }
}
