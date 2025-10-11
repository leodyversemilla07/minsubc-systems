<?php

namespace App\Modules\Registrar\Http\Controllers;

use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Payment;
use App\Modules\Registrar\Services\NotificationService;
use App\Modules\Registrar\Services\PaymentService;
use Barryvdh\DomPDF\Facade\Pdf;
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
    public function selectPaymentMethod(DocumentRequest $documentRequest)
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
    public function initiatePayment(DocumentRequest $documentRequest)
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
            \App\Models\AuditLog::log(
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
    public function generateCashPayment(DocumentRequest $documentRequest)
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
        \App\Models\AuditLog::log(
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
    public function showCashPaymentReference(Payment $payment)
    {
        // Load the relationship first
        $payment->load(['documentRequest.student.user']);

        // Ensure this is a cash payment and belongs to the authenticated user
        if ($payment->payment_method !== 'cash') {
            abort(404);
        }

        if ($payment->documentRequest->student->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('registrar/payments/cash-reference', [
            'payment' => $payment,
        ]);
    }

    /**
     * Show payment status page
     */
    public function showPaymentStatus(DocumentRequest $documentRequest)
    {
        return Inertia::render('registrar/payments/status', [
            'request' => $documentRequest->load(['payments', 'student']),
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
        $validated = $request->validate([
            'payment_reference' => 'required|string',
        ]);

        $payment = Payment::where('payment_reference_number', $validated['payment_reference'])
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
    public function paymentSuccess(DocumentRequest $documentRequest)
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
    public function confirmCashPayment(Request $request)
    {
        $validated = $request->validate([
            'payment_reference_number' => 'required|string',
            'official_receipt_number' => 'required|string|unique:payments,official_receipt_number',
        ]);

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

        $user = Auth::user();

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
     * Print official receipt for a confirmed payment
     */
    public function printOfficialReceipt(Payment $payment)
    {
        // Ensure only cashiers can access this and only for cash payments they confirmed
        if (! Auth::user()->hasRole('cashier') || $payment->payment_method !== 'cash') {
            abort(403);
        }

        // Only allow printing receipts for paid cash payments
        if ($payment->status !== 'paid' || ! $payment->official_receipt_number) {
            abort(404);
        }

        $pdf = Pdf::loadView('receipts.official', [
            'payment' => $payment->load(['documentRequest.student.user', 'cashier']),
            'university' => [
                'name' => config('app.name', 'MinSU Document Request System'),
                'address' => 'Address here',
                'contact' => 'Contact here',
            ],
        ]);

        return $pdf->download("{$payment->official_receipt_number}.pdf");
    }
}
