<?php

namespace Modules\Library\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Library\Models\Book;
use Modules\Library\Models\BookBorrowing;
use Modules\Library\Models\BookReservation;

class StudentBorrowingController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $borrowings = BookBorrowing::with(['book:id,title,isbn,author', 'fine'])
            ->where('user_id', $request->user()->id)
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $activeCount = BookBorrowing::where('user_id', $request->user()->id)
            ->whereIn('status', ['active', 'pending'])->count();
        $overdueCount = BookBorrowing::where('user_id', $request->user()->id)
            ->where('status', 'active')->where('due_date', '<', now())->count();

        return inertia('library/student/borrowings/index', [
            'borrowings' => $borrowings,
            'stats' => compact('activeCount', 'overdueCount'),
            'filters' => $request->only(['status']),
        ]);
    }

    public function show(BookBorrowing $borrowing, Request $request): InertiaResponse
    {
        if ($borrowing->user_id !== $request->user()->id) {
            abort(403);
        }

        $borrowing->load(['book.category', 'fine']);
        return inertia('library/student/borrowings/show', compact('borrowing'));
    }

    public function reservations(Request $request): InertiaResponse
    {
        $reservations = BookReservation::with('book')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(15);

        return inertia('library/student/reservations/index', compact('reservations'));
    }

    public function reserve(Request $request, Book $book): RedirectResponse
    {
        if (!$book->is_active || $book->available_courses < 1) {
            return redirect()->back()->with('error', 'Book is not available for reservation.');
        }

        $existing = BookReservation::where('user_id', $request->user()->id)
            ->where('book_id', $book->id)
            ->where('status', 'active')
            ->first();

        if ($existing) {
            return redirect()->back()->with('error', 'You already have an active reservation for this book.');
        }

        BookReservation::create([
            'book_id' => $book->id,
            'user_id' => $request->user()->id,
            'reserved_at' => now(),
            'expires_at' => now()->addDays(3),
            'status' => 'active',
        ]);

        return redirect()->route('library.student.reservations.index')
            ->with('success', 'Book reserved successfully.');
    }

    public function cancelReservation(BookReservation $reservation, Request $request): RedirectResponse
    {
        if ($reservation->user_id !== $request->user()->id) {
            abort(403);
        }

        $reservation->update(['status' => 'cancelled']);

        return redirect()->route('library.student.reservations.index')
            ->with('success', 'Reservation cancelled.');
    }

    public function fines(Request $request): InertiaResponse
    {
        $fines = \Modules\Library\Models\BookFine::with(['borrowing.book:id,title,isbn'])
            ->whereHas('borrowing', fn ($q) => $q->where('user_id', $request->user()->id))
            ->latest()
            ->paginate(15);

        $totalUnpaid = \Modules\Library\Models\BookFine::whereHas('borrowing', fn ($q) => $q->where('user_id', $request->user()->id))
            ->where('status', 'unpaid')->sum('amount');

        return inertia('library/student/fines/index', compact('fines', 'totalUnpaid'));
    }
}