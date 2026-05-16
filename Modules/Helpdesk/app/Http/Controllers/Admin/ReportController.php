<?php

namespace Modules\Helpdesk\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Helpdesk\Models\Ticket;
use Modules\Helpdesk\Models\TicketCategory;

class ReportController extends Controller
{
    public function index()
    {
        $stats = [
            'by_category' => TicketCategory::withCount('tickets')->get(),
            'by_priority' => Ticket::selectRaw('priority, count(*) as count')
                ->groupBy('priority')->pluck('count', 'priority'),
            'by_status' => Ticket::selectRaw('status, count(*) as count')
                ->groupBy('status')->pluck('count', 'status'),
            'weekly_trend' => Ticket::selectRaw('DATE(created_at) as date, count(*) as count')
                ->where('created_at', '>=', now()->subDays(30))
                ->groupBy('date')->orderBy('date')->get(),
        ];
        return inertia('helpdesk/admin/reports/index', $stats);
    }
}