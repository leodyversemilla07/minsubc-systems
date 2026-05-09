<?php

namespace Modules\Library\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Library\Models\Book;
use Modules\Library\Models\BookBorrowing;
use Modules\Library\Models\BookFine;
use App\Models\User;

class BorrowingController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $borrowings = BookBorrowing::with(['book:id,title,isbn', 'user:id,name', 'processor:id,name', 'fine'])
            ->when($request->search, fn ($q, $s) => $q->whereHas('user', fn ($q) => $q->where('name', 'like', "%{$s}%"))
                ->orWhereHas('book', fn ($q) => $q->where('title', 'like', "%{$s}%")->orWhere('isbn', 'like', "%{$s}%")))
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $stats = [
            'active' => BookBorrowing::where('status', 'active')->count(),
            'overdue' => BookBorrowing::where('status', 'active')->where('due_date', '<', now())->count(),
            'pending' => BookBorrowing::where('status', 'pending')->count(),
            'returned_today' => BookBorrowing::where('status', 'returned')->whereDate('returned_at', today())->count(),
        ];

        return inertia('library/admin/borrowings/index', [
            'borrowings' => $borrowings,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function active(): InertiaResponse
    {
        return $this->index(request()->merge(['status' => 'active']));
    }

    public function overdue(): InertiaResponse
    {
        $borrowings = BookBorrowing::with(['book:id,title,isbn', 'user:id,name'])
            ->where('status', 'active')->where('due_date', '<', now())
            ->latest()->paginate(15)->withQueryString();

        return inertia('library/admin/borrowings/index', [
            'borrowings' => $borrowings,
            'filters' => ['status' => 'overdue'],
            'stats' => [],
        ]);
    }

    public function history(): InertiaResponse
    {
        return $this->index(request()->merge(['status' => 'returned']));
    }

    public function create(): InertiaResponse
    {
        $books = Book::where('is_active', true)->where('available_copies', '>', 0)->get(['id', 'title', 'isbn', 'author']);
        return inertia('library/admin/borrowings/create', compact('books'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'due_date' => 'required|date|after_or_equal:today',
            'notes' => 'nullable|string',
        ]);

        $book = Book::findOrFail($validated['book_id']);
        if ($book->available_copies < 1) {
            return redirect()->back()->with('error', 'No available copies of this book.');
        }

        $borrowing = BookBorrowing::create([
            'book_id' => $validated['book_id'],
            'user_id' => $validated['user_id'],
            'borrow_code' => 'LIB-' . strtoupper(uniqid()),
            'borrowed_at' => now(),
            'due_date' => $validated['due_date'],
            'status' => 'active',
            'notes' => $validated['notes'],
            'processed_by' => $request->user()->id,
        ]);

        $book->decrement('available_copies');

        return redirect()->route('library.admin.borrowings.show', $borrowing)
            ->with('success', 'Book borrowed successfully.');
    }

    public function show(BookBorrowing $borrowing): InertiaResponse
    {
        $borrowing->load(['book.category', 'user', 'processor', 'fine']);
        return inertia('library/admin/borrowings/show', compact('borrowing'));
    }

    public function approve(BookBorrowing $borrowing): RedirectResponse
    {
        if ($borrowing->status !== 'pending') {
            return redirect()->back()->with('error', 'Borrowing is not in pending status.');
        }

        $book = $borrowing->book;
        if ($book->available_copies < 1) {
            return redirect()->back()->with('error', 'No available copies.');
        }

        $borrowing->update(['status' => 'active', 'borrowed_at' => now(), 'processed_by' => request()->user()->id]);
        $book->decrement('available_copies');

        return redirect()->route('library.admin.borrowings.show', $borrowing)
            ->with('success', 'Borrowing approved.');
    }

    public function returnBook(BookBorrowing $borrowing): RedirectResponse
    {
        if (!in_array($borrowing->status, ['active', 'overdue'])) {
            return redirect()->back()->with('error', 'Book cannot be returned.');
        }

        $isOverdue = $borrowing->due_date->isPast();
        $borrowing->update(['status' => 'returned', 'returned_at' => now()]);
        $borrowing->book()->increment('available_copies');

        if ($isOverdue) {
            $daysOverdue = now()->diffInDays($borrowing->due_date);
            $fineAmount = $daysOverdue * 10; // 10 pesos per day

            BookFine::create([
                'borrowing_id' => $borrowing->id,
                'amount' => $fineAmount,
                'reason' => 'overdue',
                'status' => 'unpaid',
                'notes' => "{$daysOverdue} day(s) overdue.",
            ]);
        }

        return redirect()->route('library.admin.borrowings.show', $borrowing)
            ->with('success', 'Book returned successfully.');
    }

    public function markLost(BookBorrowing $borrowing): RedirectResponse
    {
        $borrowing->update(['status' => 'lost']);
        $book = $borrowing->book;
        $book->decrement('total_copies');

        BookFine::create([
            'borrowing_id' => $borrowing->id,
            'amount' => $book->price ?? 500,
            'reason' => 'lost',
            'status' => 'unpaid',
        ]);

        return redirect()->route('library.admin.borrowings.show', $borrowing)
            ->with('success', 'Book marked as lost.');
    }
}