<?php

namespace App\Modules\Registrar\Http\Controllers;

use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Payment;
use App\Modules\Registrar\Services\NotificationService;
use App\Modules\Registrar\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function __construct(
        private PaymentService $paymentService
    ) {}

    /**
     * Show payment method selection page
     */
    public function selectPaymentMethod(DocumentRequest $request)
    {
        return Inertia::render('registrar/payments/method', [
            'request' => $request->load('student.user'),
        ]);
    }

    /**
     * Initiate digital payment for a document request
     */
    public function initiatePayment(DocumentRequest $request)
    {
        if ($request->status !== 'pending_payment') {
            return back()->withErrors([
                'payment' => 'Payment cannot be initiated for this request. Only requests with pending payment status can be paid.',
            ]);
        }

        $result = $this->paymentService->createCheckout($request);

        if ($result['success']) {
            // Create payment record
            $payment = Payment::create([
                'request_id' => $request->id,
                'payment_method' => 'digital',
                'paymongo_checkout_id' => $result['checkout_id'],
                'amount' => $request->amount,
                'status' => 'pending',
            ]);

            // Log checkout payment creation
            \App\Models\AuditLog::log(
                'payment_created',
                $request->student->user_id,
                Payment::class,
                $payment->id,
                null,
                $payment->toArray(),
                "Digital payment checkout initiated for document request {$request->request_number}",
                [
                    'request_number' => $request->request_number,
                    'amount' => $request->amount,
                    'payment_method' => 'digital',
                    'checkout_id' => $result['checkout_id'],
                ]
            );

            // Redirect to PayMongo checkout URL
            return redirect()->away($result['checkout_url']);
        }

        return back()->withErrors([
            'payment' => $result['error'] ?? 'Failed to initiate payment. Please try again.',
        ]);
    }

    public function handleWebhook(Request $request): JsonResponse
    {
        $payload = $request->all();

        // Verify webhook signature (implement proper verification)
        // $signature = $request->header('paymongo-signature');
        // if (!$this->payMongoService->verifyWebhookSignature($signature, json_encode($payload))) {
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
    public function generateCashPayment(DocumentRequest $request)
    {
        if ($request->status !== 'pending_payment') {
            return back()->withErrors([
                'payment' => 'Cash payment cannot be generated for this request.',
            ]);
        }

        $prn = $this->paymentService->generatePaymentReference($request);

        // Create payment record for cash payment
        $payment = Payment::create([
            'request_id' => $request->id,
            'payment_method' => 'cash',
            'payment_reference' => $prn,
            'amount' => $request->amount,
            'status' => 'pending',
        ]);

        // Log cash payment reference generation
        \App\Models\AuditLog::log(
            'payment_created',
            $request->student->user_id,
            Payment::class,
            $payment->id,
            null,
            $payment->toArray(),
            "Cash payment reference generated for document request {$request->request_number}",
            [
                'request_number' => $request->request_number,
                'amount' => $request->amount,
                'payment_method' => 'cash',
                'payment_reference' => $prn,
            ]
        );

        return back()->with([
            'payment_reference' => $prn,
            'payment_amount' => $request->amount,
            'payment_deadline' => $request->payment_deadline,
        ]);
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

    /**
     * Handle successful payment return from PayMongo
     */
    public function paymentSuccess(DocumentRequest $request)
    {
        // Check if payment was successful
        $payment = $request->payments()->where('status', 'paid')->first();

        if ($payment) {
            return Inertia::render('registrar/payments/success', [
                'request' => $request->load(['student.user', 'payments']),
                'payment' => $payment,
            ]);
        }

        // Payment still processing, show waiting page
        return Inertia::render('registrar/payments/processing', [
            'request' => $request->load(['student.user', 'payments']),
        ]);
    }

    /**
     * Confirm cash payment by cashier
     */
    public function confirmCashPayment(Request $request)
    {
        $request->validate([
            'payment_reference_number' => 'required|string',
            'official_receipt_number' => 'required|string',
        ]);

        $payment = Payment::where('payment_reference_number', $request->payment_reference_number)
            ->where('payment_method', 'cash')
            ->where('status', 'pending')
            ->with('documentRequest')
            ->first();

        if (! $payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment reference not found or already processed.',
            ], 404);
        }

        $user = Auth::user();

        // Update payment
        $payment->update([
            'status' => 'paid',
            'cashier_id' => $user->id,
            'official_receipt_number' => $request->official_receipt_number,
            'paid_at' => now(),
        ]);

        // Update document request status
        $payment->documentRequest->update([
            'status' => 'paid',
            'payment_method' => 'cash',
        ]);

        // Log the action
        \App\Models\AuditLog::log(
            'payment_confirmed',
            $user->id,
            Payment::class,
            $payment->id,
            ['status' => 'pending'],
            $payment->toArray(),
            "Cash payment confirmed for request {$payment->documentRequest->request_number}",
            [
                'payment_reference' => $payment->payment_reference_number,
                'official_receipt' => $request->official_receipt_number,
                'amount' => $payment->amount,
            ]
        );

        // Send notification to student
        app(NotificationService::class)->notifyPaymentConfirmed($payment->documentRequest);

        return response()->json([
            'success' => true,
            'message' => 'Payment confirmed successfully',
            'request' => [
                'request_number' => $payment->documentRequest->request_number,
                'status' => 'paid',
            ],
        ]);
    }
}
