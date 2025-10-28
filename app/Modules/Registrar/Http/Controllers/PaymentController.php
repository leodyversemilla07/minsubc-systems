<?php

namespace App\Modules\Registrar\Http\Controllers;

use App\Models\AuditLog;
use App\Modules\Registrar\Http\Requests\ConfirmCashPaymentRequest;
use App\Modules\Registrar\Http\Requests\VerifyPaymentReferenceRequest;
use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Payment;
use App\Modules\Registrar\Services\NotificationService;
use App\Modules\Registrar\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function __construct(
        private PaymentService $paymentService
    ) {}

    /**
     * Show payment method selection page
     */
    public function selectPaymentMethod(DocumentRequest $documentRequest): Response
    {
        // Check if there's an existing pending cash payment
        $existingCashPayment = Payment::where('request_id', $documentRequest->id)
            ->where('payment_method', 'cash')
            ->where('status', 'pending')
            ->latest()
            ->first();

        return Inertia::render('registrar/payments/method', [
            'request' => $documentRequest->load('student.user'),
            'existingCashPayment' => $existingCashPayment,
        ]);
    }

    /**
     * Initiate digital payment for a document request
     */
    public function initiatePayment(DocumentRequest $documentRequest): RedirectResponse
    {
        if ($documentRequest->status !== 'pending_payment') {
            return back()->withErrors([
                'payment' => 'Payment cannot be initiated for this request. Only requests with pending payment status can be paid.',
            ]);
        }

        $result = $this->paymentService->createCheckout($documentRequest);

        if ($result['success']) {
            // Create payment record
            $payment = Payment::create([
                'request_id' => $documentRequest->id,
                'payment_method' => 'digital',
                'paymongo_checkout_id' => $result['checkout_id'],
                'amount' => $documentRequest->amount,
                'status' => 'pending',
            ]);

            // Log checkout payment creation
            AuditLog::log(
                'payment_created',
                $documentRequest->student->user_id,
                Payment::class,
                $payment->id,
                null,
                $payment->toArray(),
                "Digital payment checkout initiated for document request {$documentRequest->request_number}",
                [
                    'request_number' => $documentRequest->request_number,
                    'amount' => $documentRequest->amount,
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

        // Verify webhook signature for security
        $signature = $request->header('paymongo-signature');
        if ($signature && ! $this->paymentService->verifyWebhookSignature($signature, json_encode($payload))) {
            return response()->json(['error' => 'Invalid signature'], 401);
        }

        $processed = $this->paymentService->handleWebhook($payload);

        if ($processed) {
            return response()->json(['status' => 'ok']);
        }

        return response()->json(['error' => 'Webhook processing failed'], 500);
    }

    /**
     * Generate payment reference for cash payment
     */
    public function generateCashPayment(DocumentRequest $documentRequest): RedirectResponse
    {
        if ($documentRequest->status->value !== 'pending_payment') {
            return back()->withErrors([
                'payment' => 'Cash payment cannot be generated for this request.',
            ]);
        }

        // Check if payment already exists
        $existingPayment = Payment::where('request_id', $documentRequest->id)
            ->where('payment_method', 'cash')
            ->where('status', 'pending')
            ->latest()
            ->first();

        if ($existingPayment) {
            return back()->with([
                'payment_reference' => $existingPayment->payment_reference_number,
                'payment_amount' => $existingPayment->amount,
                'payment_deadline' => $documentRequest->payment_deadline,
            ])->with('success', 'Payment reference already exists!');
        }

        $prn = $this->paymentService->generatePaymentReference($documentRequest);

        // Create payment record for cash payment
        $payment = Payment::create([
            'request_id' => $documentRequest->id,
            'payment_method' => 'cash',
            'payment_reference_number' => $prn,
            'amount' => $documentRequest->amount,
            'status' => 'pending',
        ]);

        // Log cash payment reference generation
        AuditLog::log(
            'payment_created',
            $documentRequest->student->user_id,
            Payment::class,
            $payment->id,
            null,
            $payment->toArray(),
            "Cash payment reference generated for document request {$documentRequest->request_number}",
            [
                'request_number' => $documentRequest->request_number,
                'amount' => $documentRequest->amount,
                'payment_method' => 'cash',
                'payment_reference_number' => $prn,
            ]
        );

        return redirect()->route('registrar.payments.cash-reference', $payment);
    }

    /**
     * Show cash payment reference details page
     */
    public function showCashPaymentReference(Payment $payment, Request $request): Response
    {
        // Load the relationship first
        $payment->load(['documentRequest.student.user']);

        // Ensure this is a cash payment and belongs to the authenticated user
        if ($payment->payment_method !== 'cash') {
            abort(404);
        }

        if ($payment->documentRequest->student->user_id !== $request->user()->id) {
            abort(403);
        }

        return Inertia::render('registrar/payments/cash-reference', [
            'payment' => $payment,
        ]);
    }

    /**
     * Show payment status page
     */
    public function showPaymentStatus(DocumentRequest $documentRequest): Response
    {
        return Inertia::render('registrar/payments/status', [
            'request' => $documentRequest->load(['payments', 'student']),
        ]);
    }

    /**
     * Show cashier dashboard
     */
    public function cashierDashboard(): Response
    {
        return Inertia::render('registrar/cashier/dashboard');
    }

    /**
     * Verify payment reference and return payment details
     */
    public function verifyPaymentReference(VerifyPaymentReferenceRequest $request): JsonResponse
    {
        $payment = Payment::where('payment_reference_number', $request->validated('payment_reference'))
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
                'reference' => $payment->payment_reference_number,
                'amount' => $payment->amount,
                'request_number' => $payment->documentRequest->request_number,
                'student_name' => $payment->documentRequest->student->user->full_name ?? 'N/A',
                'student_id' => $payment->documentRequest->student->student_id,
                'document_type' => $payment->documentRequest->document_type,
                'created_at' => $payment->created_at->toISOString(),
            ],
        ]);
    }

    /**
     * Handle successful payment return from PayMongo
     */
    public function paymentSuccess(DocumentRequest $documentRequest): Response
    {
        // Check if payment was successful
        $payment = $documentRequest->payments()->where('status', 'paid')->first();

        if ($payment) {
            return Inertia::render('registrar/payments/success', [
                'request' => $documentRequest->load(['student.user', 'payments']),
                'payment' => $payment,
            ]);
        }

        // Payment still processing, show waiting page
        return Inertia::render('registrar/payments/processing', [
            'request' => $documentRequest->load(['student.user', 'payments']),
        ]);
    }

    /**
     * Confirm cash payment by cashier
     */
    public function confirmCashPayment(ConfirmCashPaymentRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $payment = Payment::where('payment_reference_number', $validated['payment_reference_number'])
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

        $user = $request->user();

        // Update payment
        $payment->update([
            'status' => 'paid',
            'cashier_id' => $user->id,
            'official_receipt_number' => $validated['official_receipt_number'],
            'paid_at' => now(),
        ]);

        // Update document request status
        $payment->documentRequest->update([
            'status' => 'paid',
            'payment_method' => 'cash',
        ]);

        // Log the action
        AuditLog::log(
            'payment_confirmed',
            $user->id,
            Payment::class,
            $payment->id,
            ['status' => 'pending'],
            $payment->toArray(),
            "Cash payment confirmed for request {$payment->documentRequest->request_number}",
            [
                'payment_reference' => $payment->payment_reference_number,
                'official_receipt' => $validated['official_receipt_number'],
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
            'payment' => [
                'reference' => $payment->payment_reference_number,
                'official_receipt' => $payment->official_receipt_number,
                'amount' => $payment->amount,
            ],
        ]);
    }

    /**
     * Display official receipt information for a confirmed payment
     * Note: Since registrar has their own software for receipt generation,
     * this displays receipt data that can be integrated with their existing system
     */
    public function printOfficialReceipt(Payment $payment, Request $request): JsonResponse
    {
        // Ensure only cashiers can access this and only for cash payments they confirmed
        if (! $request->user()->hasRole('cashier') || $payment->payment_method !== 'cash') {
            abort(403);
        }

        // Only allow viewing receipts for paid cash payments
        if ($payment->status !== 'paid' || ! $payment->official_receipt_number) {
            abort(404);
        }

        // Load related data
        $payment->load(['documentRequest.student.user', 'cashier']);

        // Return receipt data as JSON for integration with registrar's existing software
        return response()->json([
            'official_receipt_number' => $payment->official_receipt_number,
            'payment' => [
                'id' => $payment->id,
                'amount' => $payment->amount,
                'payment_method' => $payment->payment_method,
                'status' => $payment->status,
                'paid_at' => $payment->paid_at,
                'reference_number' => $payment->reference_number,
            ],
            'document_request' => [
                'request_number' => $payment->documentRequest->request_number,
                'document_type' => $payment->documentRequest->document_type,
                'purpose' => $payment->documentRequest->purpose,
            ],
            'student' => [
                'student_id' => $payment->documentRequest->student->student_id,
                'name' => $payment->documentRequest->student->user->full_name,
                'email' => $payment->documentRequest->student->user->email,
            ],
            'cashier' => [
                'name' => $payment->cashier->full_name ?? 'N/A',
            ],
            'university' => [
                'name' => config('app.name', 'MinSU Document Request System'),
                'address' => 'Address here',
                'contact' => 'Contact here',
            ],
        ]);
    }
}
