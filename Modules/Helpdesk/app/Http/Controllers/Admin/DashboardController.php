<?php

namespace Modules\Helpdesk\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Helpdesk\Models\Ticket;
use Modules\Helpdesk\Models\TicketCategory;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'open_tickets' => Ticket::where('status', 'open')->count(),
            'in_progress' => Ticket::where('status', 'in_progress')->count(),
            'resolved' => Ticket::where('status', 'resolved')->count(),
            'total' => Ticket::count(),
            'categories' => TicketCategory::where('is_active', true)->count(),
        ];
        $recentTickets = Ticket::with('category', 'reporter', 'assignee')
            ->latest()->take(10)->get();
        return inertia('helpdesk/admin/dashboard', compact('stats', 'recentTickets'));
    }
}