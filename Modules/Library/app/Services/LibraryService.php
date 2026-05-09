<?php

namespace Modules\Library\Services;

use Modules\Library\Models\Book;
use Modules\Library\Models\BookBorrowing;
use Modules\Library\Models\BookCategory;
use Modules\Library\Models\BookFine;
use Modules\Library\Models\BookReservation;

class LibraryService
{
    public function getDashboardStats(): array
    {
        return [
            'total_books' => Book::where('is_active', true)->count(),
            'total_categories' => BookCategory::where('is_active', true)->count(),
            'total_copies' => Book::sum('total_copies'),
            'available_copies' => Book::sum('available_copies'),
        ];
    }

    public function getAdminStats(): array
    {
        return [
            'total_books' => Book::count(),
            'active_borrowings' => BookBorrowing::where('status', 'active')->count(),
            'overdue_borrowings' => BookBorrowing::where('status', 'active')->where('due_date', '<', now())->count(),
            'pending_borrowings' => BookBorrowing::where('status', 'pending')->count(),
            'total_users_borrowed' => BookBorrowing::distinct('user_id')->count('user_id'),
            'unpaid_fines' => BookFine::where('status', 'unpaid')->sum('amount'),
            'total_fines_collected' => BookFine::where('status', 'paid')->sum('paid_amount'),
            'active_reservations' => BookReservation::where('status', 'active')->count(),
        ];
    }

    public function getDetailedStats(): array
    {
        $popularBooks = Book::withCount('borrowings')
            ->orderByDesc('borrowings_count')
            ->take(10)
            ->get();

        $categoryDistribution = BookCategory::withCount('books')->get();

        $monthlyBorrowings = BookBorrowing::selectRaw("strftime('%Y-%m', borrowed_at) as month, count(*) as total")
            ->whereNotNull('borrowed_at')
            ->where('borrowed_at', '>=', now()->subMonths(12))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return compact('popularBooks', 'categoryDistribution', 'monthlyBorrowings');
    }
}