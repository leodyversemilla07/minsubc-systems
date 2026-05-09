<?php

use Illuminate\Support\Facades\Route;
use Modules\Library\Http\Controllers\Admin\BookCategoryController;
use Modules\Library\Http\Controllers\Admin\BookController;
use Modules\Library\Http\Controllers\Admin\BorrowingController;
use Modules\Library\Http\Controllers\Admin\DashboardController;
use Modules\Library\Http\Controllers\Admin\FineController;
use Modules\Library\Http\Controllers\Admin\ReportController;
use Modules\Library\Http\Controllers\LibraryController;
use Modules\Library\Http\Controllers\Student\StudentBorrowingController;

/*
|--------------------------------------------------------------------------
| Library Module Routes
|--------------------------------------------------------------------------
|
| Public, Student, and Admin routes for the Library management system.
|
*/

// ==================== PUBLIC ROUTES ====================
Route::prefix('library')->name('library.')->group(function () {
    Route::get('/', [LibraryController::class, 'index'])->name('index');
    Route::get('/books', [LibraryController::class, 'books'])->name('books.index');
    Route::get('/books/{book}', [LibraryController::class, 'bookShow'])->name('books.show');
    Route::get('/categories/{category}', [LibraryController::class, 'categoryShow'])->name('categories.show');
});

// ==================== STUDENT ROUTES ====================
Route::prefix('library/student')->name('library.student.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/borrowings', [StudentBorrowingController::class, 'index'])->name('borrowings.index');
    Route::get('/borrowings/{borrowing}', [StudentBorrowingController::class, 'show'])->name('borrowings.show');
    Route::get('/reservations', [StudentBorrowingController::class, 'reservations'])->name('reservations.index');
    Route::post('/books/{book}/reserve', [StudentBorrowingController::class, 'reserve'])->name('books.reserve');
    Route::delete('/reservations/{reservation}', [StudentBorrowingController::class, 'cancelReservation'])->name('reservations.cancel');
    Route::get('/fines', [StudentBorrowingController::class, 'fines'])->name('fines.index');
});

// ==================== ADMIN ROUTES ====================
Route::prefix('library/admin')->name('library.admin.')->middleware(['auth', 'role:library-admin|library-staff|super-admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/statistics', [DashboardController::class, 'statistics'])->name('statistics');

    // Books
    Route::resource('books', BookController::class);
    Route::post('books/{book}/add-copies', [BookController::class, 'addCopies'])->name('books.add-copies');

    // Categories
    Route::resource('categories', BookCategoryController::class);

    // Borrowings
    Route::get('borrowings', [BorrowingController::class, 'index'])->name('borrowings.index');
    Route::get('borrowings/active', [BorrowingController::class, 'active'])->name('borrowings.active');
    Route::get('borrowings/overdue', [BorrowingController::class, 'overdue'])->name('borrowings.overdue');
    Route::get('borrowings/history', [BorrowingController::class, 'history'])->name('borrowings.history');
    Route::get('borrowings/create', [BorrowingController::class, 'create'])->name('borrowings.create');
    Route::post('borrowings', [BorrowingController::class, 'store'])->name('borrowings.store');
    Route::get('borrowings/{borrowing}', [BorrowingController::class, 'show'])->name('borrowings.show');
    Route::post('borrowings/{borrowing}/approve', [BorrowingController::class, 'approve'])->name('borrowings.approve');
    Route::post('borrowings/{borrowing}/return', [BorrowingController::class, 'returnBook'])->name('borrowings.return');
    Route::post('borrowings/{borrowing}/mark-lost', [BorrowingController::class, 'markLost'])->name('borrowings.mark-lost');

    // Fines
    Route::get('fines', [FineController::class, 'index'])->name('fines.index');
    Route::post('fines/{fine}/pay', [FineController::class, 'pay'])->name('fines.pay');
    Route::post('fines/{fine}/waive', [FineController::class, 'waive'])->name('fines.waive');

    // Reports
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('reports/popular-books', [ReportController::class, 'popularBooks'])->name('reports.popular-books');
    Route::get('reports/borrowing-trends', [ReportController::class, 'borrowingTrends'])->name('reports.borrowing-trends');
});