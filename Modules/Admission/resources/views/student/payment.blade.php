@extends('admission::components.layouts.master')

@section('content')
<div class="container mx-auto max-w-4xl px-4 py-8">
    <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Payment</h1>
        <p class="mt-1 text-sm text-gray-500">Pay your enrollment fees</p>
    </div>

    <!-- Payment Summary -->
    <div class="mb-8 grid gap-6 md:grid-cols-2">
        <!-- Fees Breakdown -->
        <div class="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Fees Breakdown</h3>
            <div class="space-y-3">
                @foreach($fees as $fee)
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">{{ $fee['name'] }}</span>
                        <span class="font-medium text-gray-900 dark:text-white">₱{{ number_format($fee['amount'], 2) }}</span>
                    </div>
                @endforeach
                <div class="border-t pt-3 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <span class="font-semibold text-gray-900 dark:text-white">Total</span>
                        <span class="text-xl font-bold text-blue-600">₱{{ number_format($totalFees, 2) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment Status -->
        <div class="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Payment Status</h3>
            
            <div class="mb-4">
                <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Total Fees</span>
                    <span class="font-medium">₱{{ number_format($totalFees, 2) }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Amount Paid</span>
                    <span class="font-medium text-green-600">₱{{ number_format($totalPaid, 2) }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Balance</span>
                    <span class="text-xl font-bold {{ $balance > 0 ? 'text-red-600' : 'text-green-600' }}">
                        ₱{{ number_format($balance, 2) }}
                    </span>
                </div>
            </div>

            <div class="mb-4">
                <div class="overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div class="h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500" 
                         style="width: {{ $totalFees > 0 ? min(100, ($totalPaid / $totalFees) * 100) : 0 }}%"></div>
                </div>
                <p class="mt-1 text-center text-xs text-gray-500">
                    {{ $totalFees > 0 ? round(($totalPaid / $totalFees) * 100) : 0 }}% Paid
                </p>
            </div>

            @if($balance > 0)
                <div class="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                    <p class="text-sm text-blue-800 dark:text-blue-200">
                        Please pay your remaining balance of <strong>₱{{ number_format($balance, 2) }}</strong> to complete your enrollment.
                    </p>
                </div>
            @else
                <div class="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                    <p class="text-sm text-green-800 dark:text-green-200">
                        ✓ Your enrollment is fully paid!
                    </p>
                </div>
            @endif
        </div>
    </div>

    @if($balance > 0)
        <!-- Payment Options -->
        <div class="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Payment Options</h3>

            <div class="grid gap-4 md:grid-cols-2">
                <!-- Online Payment -->
                <form action="{{ route('student.enrollment.payment.submit', $enrollment) }}" method="POST" class="rounded-lg border p-4 hover:border-blue-300 dark:border-gray-700">
                    @csrf
                    <input type="hidden" name="method" value="online">
                    <input type="hidden" name="amount" value="{{ $balance }}">
                    
                    <div class="mb-3 flex items-center gap-3">
                        <div class="rounded-lg bg-blue-100 p-2">
                            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900 dark:text-white">Pay Online (GCash/GrabPay)</h4>
                            <p class="text-sm text-gray-500">Pay via PayMongo</p>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="mb-1 block text-sm text-gray-600">Amount to Pay</label>
                        <input type="number" name="custom_amount" value="{{ $balance }}" 
                               min="1" max="{{ $balance }}" step="0.01"
                               class="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
                    </div>
                    
                    <button type="submit" class="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        Pay ₱{{ number_format($balance, 2) }}
                    </button>
                </form>

                <!-- Bank Deposit / Over the Counter -->
                <div class="rounded-lg border p-4 dark:border-gray-700">
                    <div class="mb-3 flex items-center gap-3">
                        <div class="rounded-lg bg-green-100 p-2">
                            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900 dark:text-white">Bank Deposit / OTC</h4>
                            <p class="text-sm text-gray-500">Manual payment with reference</p>
                        </div>
                    </div>
                    
                    <div class="mb-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                        <p class="text-sm"><strong>Bank:</strong> BDO</p>
                        <p class="text-sm"><strong>Account Name:</strong> MinSU BC Systems</p>
                        <p class="text-sm"><strong>Account Number:</strong> 1234-5678-9012</p>
                    </div>
                    
                    <form action="{{ route('student.enrollment.payment.submit', $enrollment) }}" method="POST">
                        @csrf
                        <input type="hidden" name="method" value="bank_deposit">
                        
                        <div class="mb-3">
                            <label class="mb-1 block text-sm text-gray-600">Reference Number</label>
                            <input type="text" name="reference_number" required
                                   placeholder="Enter deposit reference"
                                   class="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
                        </div>
                        
                        <div class="mb-3">
                            <label class="mb-1 block text-sm text-gray-600">Amount</label>
                            <input type="number" name="amount" value="{{ $balance }}" 
                                   min="1" step="0.01" required
                                   class="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
                        </div>
                        
                        <div class="mb-3">
                            <label class="mb-1 block text-sm text-gray-600">Deposit Date</label>
                            <input type="date" name="deposit_date" required
                                   class="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800">
                        </div>
                        
                        <button type="submit" class="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                            Submit Payment Details
                        </button>
                    </form>
                </div>
            </div>
        </div>
    @endif

    <!-- Payment History -->
    @if($payments->isNotEmpty())
        <div class="mt-8">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Payment History</h3>
            <div class="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Date</th>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Reference</th>
                            <th class="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Method</th>
                            <th class="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Amount</th>
                            <th class="px-4 py-3 text-center text-xs font-medium uppercase text-gray-500">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                        @foreach($payments as $payment)
                            <tr>
                                <td class="px-4 py-3 text-sm">{{ $payment->created_at->format('M d, Y H:i') }}</td>
                                <td class="px-4 py-3 text-sm font-mono">{{ $payment->reference_number ?? 'N/A' }}</td>
                                <td class="px-4 py-3 text-sm capitalize">{{ str_replace('_', ' ', $payment->payment_method ?? 'N/A') }}</td>
                                <td class="px-4 py-3 text-right font-medium">₱{{ number_format($payment->amount, 2) }}</td>
                                <td class="px-4 py-3 text-center">
                                    @if($payment->status === 'verified')
                                        <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                            Verified
                                        </span>
                                    @elseif($payment->status === 'pending')
                                        <span class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                            Pending
                                        </span>
                                    @elseif($payment->status === 'rejected')
                                        <span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                            Rejected
                                        </span>
                                    @else
                                        <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                            {{ ucfirst($payment->status) }}
                                        </span>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
</div>
@endsection