<?php

namespace Modules\Library\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\Library\Models\Book;
use Modules\Library\Models\BookBorrowing;
use Modules\Library\Models\BookCategory;

class ReportController extends Controller
{
    public function index(): InertiaResponse
    {
        return inertia('library/admin/reports/index');
    }

    public function popularBooks(): InertiaResponse
    {
        $books = Book::with('category')
            ->withCount('borrowings')
            ->orderByDesc('borrowings_count')
            ->take(20)
            ->get();

        return inertia('library/admin/reports/popular-books', compact('books'));
    }

    public function borrowingTrends(): InertiaResponse
    {
        // Grouped in PHP (DB-agnostic: strftime is SQLite-only)
        $monthlyData = BookBorrowing::whereNotNull('borrowed_at')
            ->where('borrowed_at', '>=', now()->subMonths(12))
            ->orderBy('borrowed_at')
            ->pluck('borrowed_at')
            ->map(fn ($date) => $date->format('Y-m'))
            ->countBy()
            ->map(fn ($total, $month) => ['month' => $month, 'total' => $total])
            ->values();

        $categoryData = BookCategory::withCount('books')->get();

        return inertia('library/admin/reports/borrowing-trends', [
            'monthlyData' => $monthlyData,
            'categoryData' => $categoryData,
        ]);
    }
}
