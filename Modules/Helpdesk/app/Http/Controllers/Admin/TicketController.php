<?php

namespace Modules\Helpdesk\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Helpdesk\Models\Ticket;
use Modules\Helpdesk\Models\TicketCategory;
use Modules\Helpdesk\Models\TicketComment;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::with('category', 'reporter', 'assignee')
            ->latest()->paginate(15);
        return inertia('helpdesk/admin/tickets/index', compact('tickets'));
    }

    public function create()
    {
        $categories = TicketCategory::where('is_active', true)->get();
        return inertia('helpdesk/admin/tickets/create', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:hlp_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high,urgent',
        ]);
        $validated['status'] = 'open';
        $validated['reported_by'] = auth()->id();
        Ticket::create($validated);
        return redirect()->route('helpdesk.admin.tickets.index');
    }

    public function show(Ticket $ticket)
    {
        $ticket->load('category', 'reporter', 'assignee', 'comments.user');
        return inertia('helpdesk/admin/tickets/show', ['ticket' => $ticket]);
    }

    public function assign(Request $request, Ticket $ticket)
    {
        $validated = $request->validate(['assigned_to' => 'required|exists:users,id']);
        $ticket->update(['assigned_to' => $validated['assigned_to'], 'status' => 'in_progress']);
        return back();
    }

    public function resolve(Ticket $ticket)
    {
        $ticket->update(['status' => 'resolved', 'resolved_at' => now()]);
        return back();
    }

    public function close(Ticket $ticket)
    {
        $ticket->update(['status' => 'closed']);
        return back();
    }

    public function reopen(Ticket $ticket)
    {
        $ticket->update(['status' => 'in_progress', 'resolved_at' => null]);
        return back();
    }

    public function comment(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'body' => 'required|string',
            'is_internal' => 'boolean',
        ]);
        TicketComment::create([
            'ticket_id' => $ticket->id,
            'user_id' => auth()->id(),
            'body' => $validated['body'],
            'is_internal' => $validated['is_internal'] ?? false,
        ]);
        return back();
    }
}