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
        $monthlyData = BookBorrowing::selectRaw("strftime('%Y-%m', borrowed_at) as month, count(*) as total")
            ->whereNotNull('borrowed_at')
            ->where('borrowed_at', '>=', now()->subMonths(12))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $categoryData = BookCategory::withCount('books')->get();

        return inertia('library/admin/reports/borrowing-trends', [
            'monthlyData' => $monthlyData,
            'categoryData' => $categoryData,
        ]);
    }
}