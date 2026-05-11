<?php

namespace Modules\Accounting\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\Accounting\Models\Assessment;
use Modules\Accounting\Models\Payment;
use Modules\Accounting\Models\FeeItem;

class AccountingController extends Controller
{
    public function index(): InertiaResponse
    {
        $stats = [
            'total_assessments' => Assessment::count(),
            'total_collected' => Payment::where('status', 'completed')->sum('amount'),
            'pending_payments' => Assessment::whereIn('status', ['pending', 'partial'])->sum('total_amount') - Assessment::whereIn('status', ['pending', 'partial'])->sum('paid_amount'),
            'fee_items' => FeeItem::where('is_active', true)->count(),
        ];

        return inertia('accounting/index', compact('stats'));
    }
}