<?php

namespace Modules\Accounting\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Models\Payment;
use Modules\Accounting\Services\AccountingService;

class PaymentController extends Controller
{
    public function __construct(
        protected AccountingService $accountingService
    ) {}

    public function index(Request $request): InertiaResponse
    {
        $payments = Payment::with(['assessment.assessable', 'user'])
            ->when($request->method, fn ($q, $m) => $q->where('payment_method', $m))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return inertia('accounting/admin/payments/index', [
            'payments' => $payments,
            'filters' => $request->only(['method']),
        ]);
    }

    public function create(): InertiaResponse
    {
        return inertia('accounting/admin/payments/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'assessment_id' => 'required|exists:acc_assessments,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|in:cash,check,bank_transfer,gcash,paymaya',
            'reference_number' => 'nullable|string|max:100',
            'payment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $payment = $this->accountingService->recordPayment($validated);

        return redirect()->route('accounting.admin.payments.show', $payment)->with('success', 'Payment recorded.');
    }

    public function show(Payment $payment): InertiaResponse
    {
        $payment->load(['assessment.assessable', 'user', 'allocations.assessmentLine.feeItem']);
        return inertia('accounting/admin/payments/show', compact('payment'));
    }
}