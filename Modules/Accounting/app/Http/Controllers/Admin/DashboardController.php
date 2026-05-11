<?php

namespace Modules\Accounting\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Services\AccountingService;

class DashboardController extends Controller
{
    public function __construct(
        protected AccountingService $accountingService
    ) {}

    public function index(): InertiaResponse
    {
        $stats = $this->accountingService->getDashboardStats();
        return inertia('accounting/admin/dashboard/index', compact('stats'));
    }
}