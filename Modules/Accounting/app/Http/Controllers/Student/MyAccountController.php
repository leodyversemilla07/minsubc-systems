<?php

namespace Modules\Accounting\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Models\Assessment;
use Modules\Accounting\Models\Payment;
use Modules\Accounting\Models\Invoice;
use Modules\Accounting\Models\JournalEntry;

class MyAccountController extends Controller
{
    public function assessments(): InertiaResponse
    {
        $assessments = Assessment::where('assessable_type', 'App\Models\Student')
            ->where('assessable_id', auth()->user()->student?->id)
            ->with('lines.feeItem')
            ->latest()
            ->paginate(10);

        return inertia('accounting/student/assessments', compact('assessments'));
    }

    public function payments(): InertiaResponse
    {
        $payments = Payment::whereHas('assessment', fn ($q) => $q->where('assessable_type', 'App\Models\Student')
            ->where('assessable_id', auth()->user()->student?->id))
            ->latest()->paginate(10);

        return inertia('accounting/student/payments', compact('payments'));
    }

    public function invoices(): InertiaResponse
    {
        $invoices = Invoice::whereHas('assessment', fn ($q) => $q->where('assessable_type', 'App\Models\Student')
            ->where('assessable_id', auth()->user()->student?->id))
            ->latest()->paginate(10);

        return inertia('accounting/student/invoices', compact('invoices'));
    }

    public function ledger(): InertiaResponse
    {
        $entries = JournalEntry::where('referenceable_type', 'Modules\Accounting\Models\Assessment')
            ->latest()->paginate(20);

        return inertia('accounting/student/ledger', compact('entries'));
    }
}