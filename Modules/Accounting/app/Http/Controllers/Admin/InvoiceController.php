<?php

namespace Modules\Accounting\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Models\Invoice;

class InvoiceController extends Controller
{
    public function index(): InertiaResponse
    {
        $invoices = Invoice::with('assessment.assessable')
            ->latest()->paginate(15);
        return inertia('accounting/admin/invoices/index', compact('invoices'));
    }

    public function show(Invoice $invoice): InertiaResponse
    {
        $invoice->load(['assessment.assessable', 'assessment.lines.feeItem']);
        return inertia('accounting/admin/invoices/show', compact('invoice'));
    }
}