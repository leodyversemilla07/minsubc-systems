<?php

namespace Modules\Accounting\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Models\JournalEntry;
use Modules\Accounting\Services\AccountingService;

class ReportController extends Controller
{
    public function __construct(
        protected AccountingService $accountingService
    ) {}

    public function index(): InertiaResponse
    {
        return inertia('accounting/admin/reports/index');
    }

    public function collections(Request $request): InertiaResponse
    {
        $report = $this->accountingService->getCollectionsReport($request->from, $request->to);
        return inertia('accounting/admin/reports/collections', compact('report'));
    }

    public function aging(): InertiaResponse
    {
        $report = $this->accountingService->getAgingReport();
        return inertia('accounting/admin/reports/aging', compact('report'));
    }

    public function ledger(Request $request): InertiaResponse
    {
        $report = $this->accountingService->getLedgerReport($request->from, $request->to, $request->chart_account_id);
        return inertia('accounting/admin/reports/ledger', compact('report'));
    }

    public function journal(Request $request): InertiaResponse
    {
        $entries = JournalEntry::with('lines.chartAccount')
            ->when($request->from, fn ($q, $d) => $q->whereDate('entry_date', '>=', $d))
            ->when($request->to, fn ($q, $d) => $q->whereDate('entry_date', '<=', $d))
            ->latest()->paginate(20);
        return inertia('accounting/admin/reports/journal', compact('entries'));
    }
}