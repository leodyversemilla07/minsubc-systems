<?php

namespace Modules\Library\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;
use Modules\Library\Models\BookBorrowing;
use Modules\Library\Models\Book;
use Modules\Library\Models\BookFine;
use Modules\Library\Services\LibraryService;

class DashboardController extends Controller
{
    public function __construct(
        protected LibraryService $libraryService
    ) {}

    public function index(): InertiaResponse
    {
        $stats = $this->libraryService->getAdminStats();
        $recentBorrowings = BookBorrowing::with(['book:id,title,isbn', 'user:id,name'])
            ->latest()->take(10)->get();
        $overdueCount = BookBorrowing::where('status', 'active')
            ->where('due_date', '<', now())->count();

        return inertia('library/admin/dashboard', compact('stats', 'recentBorrowings', 'overdueCount'));
    }

    public function statistics(): InertiaResponse
    {
        $stats = $this->libraryService->getDetailedStats();
        return inertia('library/admin/statistics', compact('stats'));
    }
}