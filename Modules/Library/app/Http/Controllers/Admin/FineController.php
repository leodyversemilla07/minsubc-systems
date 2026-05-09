<?php

namespace Modules\Library\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Library\Models\BookFine;

class FineController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $fines = BookFine::with(['borrowing.book:id,title,isbn', 'borrowing.user:id,name'])
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $stats = [
            'total_unpaid' => BookFine::where('status', 'unpaid')->sum('amount'),
            'total_collected' => BookFine::where('status', 'paid')->sum('paid_amount'),
            'unpaid_count' => BookFine::where('status', 'unpaid')->count(),
        ];

        return inertia('library/admin/fines/index', [
            'fines' => $fines,
            'stats' => $stats,
            'filters' => $request->only(['status']),
        ]);
    }

    public function pay(BookFine $fine): RedirectResponse
    {
        if ($fine->status !== 'unpaid' && $fine->status !== 'partial') {
            return redirect()->back()->with('error', 'Fine is already paid or waived.');
        }

        $fine->update([
            'paid_amount' => $fine->amount,
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        return redirect()->route('library.admin.fines.index')
            ->with('success', 'Fine payment recorded.');
    }

    public function waive(BookFine $fine): RedirectResponse
    {
        if ($fine->status !== 'unpaid' && $fine->status !== 'partial') {
            return redirect()->back()->with('error', 'Fine is already paid or waived.');
        }

        $fine->update(['status' => 'waived']);

        return redirect()->route('library.admin.fines.index')
            ->with('success', 'Fine waived successfully.');
    }
}