<?php

namespace Modules\Accounting\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\Accounting\Models\Assessment;
use Modules\Accounting\Models\AssessmentLine;
use Modules\Accounting\Models\Payment;
use Modules\Accounting\Models\PaymentAllocation;
use Modules\Accounting\Models\Invoice;
use Modules\Accounting\Models\JournalEntry;
use Modules\Accounting\Models\JournalLine;
use Modules\Accounting\Models\ChartAccount;
use Modules\Accounting\Models\AppliedDiscount;

class AccountingService
{
    public function getDashboardStats(): array
    {
        $totalAssessed = Assessment::sum('total_amount');
        $totalCollected = Payment::where('status', 'completed')->sum('amount');
        $pendingAmount = Assessment::whereIn('status', ['pending', 'partial'])
            ->selectRaw('SUM(total_amount - paid_amount) as balance')->value('balance') ?? 0;

        return [
            'total_assessments' => Assessment::count(),
            'total_amount_assessed' => $totalAssessed,
            'total_collected' => $totalCollected,
            'pending_balance' => $pendingAmount,
            'total_students_assessed' => Assessment::distinct('assessable_id')->count('assessable_id'),
            'payment_methods' => Payment::where('status', 'completed')
                ->selectRaw('payment_method, SUM(amount) as total')
                ->groupBy('payment_method')
                ->pluck('total', 'payment_method'),
            'recent_payments' => Payment::with('assessment.assessable')
                ->latest()->take(5)->get(),
        ];
    }

    public function createAssessment(array $data): Assessment
    {
        return DB::transaction(function () use ($data) {
            $totalAmount = array_sum(array_column($data['lines'], 'amount'));
            $code = 'ASM-' . now()->format('Y') . '-' . str_pad((Assessment::max('id') ?? 0) + 1, 6, '0', STR_PAD_LEFT);

            $assessment = Assessment::create([
                'assessment_code' => $code,
                'assessable_type' => $data['assessable_type'],
                'assessable_id' => $data['assessable_id'],
                'academic_year' => $data['academic_year'] ?? null,
                'semester' => $data['semester'] ?? null,
                'total_amount' => $totalAmount,
                'paid_amount' => 0,
                'status' => 'pending',
                'due_date' => $data['due_date'] ?? null,
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($data['lines'] as $line) {
                AssessmentLine::create([
                    'assessment_id' => $assessment->id,
                    'fee_item_id' => $line['fee_item_id'],
                    'amount' => $line['amount'],
                    'paid_amount' => 0,
                ]);
            }

            // Create invoice
            Invoice::create([
                'invoice_number' => 'INV-' . $assessment->assessment_code,
                'assessment_id' => $assessment->id,
                'status' => 'sent',
                'issued_date' => now(),
                'due_date' => $data['due_date'] ?? now()->addMonth(),
                'total_amount' => $totalAmount,
                'paid_amount' => 0,
            ]);

            return $assessment;
        });
    }

    public function recordPayment(array $data): Payment
    {
        return DB::transaction(function () use ($data) {
            $code = 'PAY-' . now()->format('Ymd') . '-' . str_pad((Payment::max('id') ?? 0) + 1, 5, '0', STR_PAD_LEFT);

            $payment = Payment::create([
                'payment_code' => $code,
                'assessment_id' => $data['assessment_id'],
                'user_id' => auth()->id(),
                'amount' => $data['amount'],
                'payment_method' => $data['payment_method'],
                'reference_number' => $data['reference_number'] ?? null,
                'payment_date' => $data['payment_date'],
                'notes' => $data['notes'] ?? null,
                'status' => 'completed',
            ]);

            // Update assessment paid amount
            $assessment = Assessment::findOrFail($data['assessment_id']);
            $assessment->increment('paid_amount', $data['amount']);
            $assessment->update(['status' => $assessment->paid_amount >= $assessment->total_amount ? 'paid' : 'partial']);

            // Update invoice
            $assessment->invoices()->update(['paid_amount' => $assessment->paid_amount]);
            if ($assessment->status === 'paid') {
                $assessment->invoices()->update(['status' => 'paid']);
            }

            // Create journal entry
            $this->createPaymentJournalEntry($payment, $assessment);

            return $payment;
        });
    }

    protected function createPaymentJournalEntry(Payment $payment, Assessment $assessment): void
    {
        $entryNumber = 'JE-' . now()->format('Ymd') . '-' . str_pad((JournalEntry::max('id') ?? 0) + 1, 5, '0', STR_PAD_LEFT);

        $entry = JournalEntry::create([
            'entry_number' => $entryNumber,
            'entry_date' => $payment->payment_date,
            'description' => "Payment {$payment->payment_code} for {$assessment->assessment_code}",
            'type' => 'payment',
            'referenceable_type' => Assessment::class,
            'referenceable_id' => $assessment->id,
            'total_debit' => $payment->amount,
            'total_credit' => $payment->amount,
            'status' => 'posted',
        ]);

        // Debit: Cash/Bank account
        $cashAccount = ChartAccount::where('account_code', 'CASH')
            ->orWhere('type', 'asset')->first();
        if ($cashAccount) {
            JournalLine::create([
                'journal_entry_id' => $entry->id,
                'chart_account_id' => $cashAccount->id,
                'debit' => $payment->amount,
                'credit' => 0,
                'description' => "Payment received",
            ]);
        }

        // Credit: Tuition/Assessment Receivable
        $receivableAccount = $this->getReceivableAccount($assessment);
        if ($receivableAccount) {
            JournalLine::create([
                'journal_entry_id' => $entry->id,
                'chart_account_id' => $receivableAccount->id,
                'debit' => 0,
                'credit' => $payment->amount,
                'description' => "Payment applied",
            ]);
        }
    }

    protected function getReceivableAccount(Assessment $assessment): ?ChartAccount
    {
        return ChartAccount::where('account_code', 'AR')
            ->orWhere('type', 'asset')->first();
    }

    public function getCollectionsReport(?string $from, ?string $to): array
    {
        $from = $from ? Carbon::parse($from) : now()->startOfMonth();
        $to = $to ? Carbon::parse($to) : now()->endOfMonth();

        $dailyCollections = Payment::where('status', 'completed')
            ->whereBetween('payment_date', [$from, $to])
            ->selectRaw('DATE(payment_date) as date, SUM(amount) as total, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $byMethod = Payment::where('status', 'completed')
            ->whereBetween('payment_date', [$from, $to])
            ->selectRaw('payment_method, SUM(amount) as total, COUNT(*) as count')
            ->groupBy('payment_method')
            ->get();

        $totalCollected = Payment::where('status', 'completed')
            ->whereBetween('payment_date', [$from, $to])->sum('amount');

        return compact('dailyCollections', 'byMethod', 'totalCollected', 'from', 'to');
    }

    public function getAgingReport(): array
    {
        $now = now();
        $buckets = [
            'current' => [$now->copy()->subDays(30), $now],
            '30_days' => [$now->copy()->subDays(60), $now->copy()->subDays(31)],
            '60_days' => [$now->copy()->subDays(90), $now->copy()->subDays(61)],
            '90_plus' => [null, $now->copy()->subDays(91)],
        ];

        $aging = [];
        foreach ($buckets as $label => [$start, $end]) {
            $query = Assessment::where('status', '!=', 'paid')
                ->whereRaw('total_amount > paid_amount');

            if ($end) {
                $query->where('due_date', '<=', $end);
            }
            if ($start) {
                $query->where('due_date', '>=', $start);
            }

            $total = $query->sum(DB::raw('total_amount - paid_amount'));
            $count = $query->count();

            $aging[$label] = ['total' => $total, 'count' => $count];
        }

        return $aging;
    }

    public function getLedgerReport(?string $from, ?string $to, ?int $chartAccountId): array
    {
        $query = JournalEntry::with('lines.chartAccount')->where('status', 'posted');

        if ($from) $query->whereDate('entry_date', '>=', $from);
        if ($to) $query->whereDate('entry_date', '<=', $to);
        if ($chartAccountId) {
            $query->whereHas('lines', fn ($q) => $q->where('chart_account_id', $chartAccountId));
        }

        $entries = $query->latest()->paginate(20);

        $totalDebit = $entries->sum('total_debit');
        $totalCredit = $entries->sum('total_credit');

        return compact('entries', 'totalDebit', 'totalCredit');
    }
}