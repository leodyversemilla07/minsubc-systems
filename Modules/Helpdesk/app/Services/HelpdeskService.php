<?php

namespace Modules\Helpdesk\Services;

use Modules\Helpdesk\Models\Ticket;
use Modules\Helpdesk\Models\TicketCategory;

class HelpdeskService
{
    public function getStats(): array
    {
        return [
            'open' => Ticket::whereIn('status', ['open', 'in_progress'])->count(),
            'resolved' => Ticket::where('status', 'resolved')->count(),
            'total' => Ticket::count(),
        ];
    }

    public function getCategoryStats(): array
    {
        return TicketCategory::withCount('tickets')->get()->toArray();
    }
}