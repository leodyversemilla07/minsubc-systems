<?php

use Illuminate\Support\Facades\Route;
use Modules\Accounting\Http\Controllers\Admin\DashboardController;
use Modules\Accounting\Http\Controllers\Admin\FeeCategoryController;
use Modules\Accounting\Http\Controllers\Admin\FeeItemController;
use Modules\Accounting\Http\Controllers\Admin\AssessmentController;
use Modules\Accounting\Http\Controllers\Admin\PaymentController;
use Modules\Accounting\Http\Controllers\Admin\InvoiceController;
use Modules\Accounting\Http\Controllers\Admin\ReportController;
use Modules\Accounting\Http\Controllers\Admin\ChartAccountController;
use Modules\Accounting\Http\Controllers\Admin\DiscountController;

Route::prefix('accounting')->name('accounting.')->group(function () {
    // Public/student routes
    Route::get('/', [\Modules\Accounting\Http\Controllers\AccountingController::class, 'index'])->name('index');

    // Student self-service
    Route::middleware(['auth', 'verified'])->prefix('my')->name('my.')->group(function () {
        Route::get('/assessments', [\Modules\Accounting\Http\Controllers\Student\MyAccountController::class, 'assessments'])->name('assessments');
        Route::get('/payments', [\Modules\Accounting\Http\Controllers\Student\MyAccountController::class, 'payments'])->name('payments');
        Route::get('/invoices', [\Modules\Accounting\Http\Controllers\Student\MyAccountController::class, 'invoices'])->name('invoices');
        Route::get('/ledger', [\Modules\Accounting\Http\Controllers\Student\MyAccountController::class, 'ledger'])->name('ledger');
    });

    // Admin routes
    Route::middleware(['auth', 'role:accounting-admin|accounting-staff|super-admin'])
        ->prefix('admin')->name('admin.')->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Fee Categories
        Route::resource('fee-categories', FeeCategoryController::class);

        // Fee Items
        Route::resource('fee-items', FeeItemController::class);

        // Assessments
        Route::get('assessments', [AssessmentController::class, 'index'])->name('assessments.index');
        Route::get('assessments/create', [AssessmentController::class, 'create'])->name('assessments.create');
        Route::post('assessments', [AssessmentController::class, 'store'])->name('assessments.store');
        Route::get('assessments/{assessment}', [AssessmentController::class, 'show'])->name('assessments.show');
        Route::get('assessments/{assessment}/edit', [AssessmentController::class, 'edit'])->name('assessments.edit');
        Route::put('assessments/{assessment}', [AssessmentController::class, 'update'])->name('assessments.update');
        Route::delete('assessments/{assessment}', [AssessmentController::class, 'destroy'])->name('assessments.destroy');
        Route::post('assessments/{assessment}/apply-discount', [AssessmentController::class, 'applyDiscount'])->name('assessments.apply-discount');
        Route::post('assessments/{assessment}/waive', [AssessmentController::class, 'waive'])->name('assessments.waive');

        // Payments
        Route::get('payments', [PaymentController::class, 'index'])->name('payments.index');
        Route::get('payments/create', [PaymentController::class, 'create'])->name('payments.create');
        Route::post('payments', [PaymentController::class, 'store'])->name('payments.store');
        Route::get('payments/{payment}', [PaymentController::class, 'show'])->name('payments.show');
        Route::get('payments/{payment}/receipt', [PaymentController::class, 'receipt'])->name('payments.receipt');
        Route::post('payments/{payment}/refund', [PaymentController::class, 'refund'])->name('payments.refund');

        // Invoices
        Route::get('invoices', [InvoiceController::class, 'index'])->name('invoices.index');
        Route::get('invoices/{invoice}', [InvoiceController::class, 'show'])->name('invoices.show');
        Route::post('invoices/{invoice}/send', [InvoiceController::class, 'send'])->name('invoices.send');
        Route::get('invoices/{invoice}/pdf', [InvoiceController::class, 'downloadPdf'])->name('invoices.pdf');

        // Chart of Accounts
        Route::get('chart-accounts', [ChartAccountController::class, 'index'])->name('chart-accounts.index');
        Route::post('chart-accounts', [ChartAccountController::class, 'store'])->name('chart-accounts.store');
        Route::put('chart-accounts/{chartAccount}', [ChartAccountController::class, 'update'])->name('chart-accounts.update');

        // Discounts
        Route::resource('discounts', DiscountController::class);

        // Reports
        Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('reports/collections', [ReportController::class, 'collections'])->name('reports.collections');
        Route::get('reports/aging', [ReportController::class, 'aging'])->name('reports.aging');
        Route::get('reports/ledger', [ReportController::class, 'ledger'])->name('reports.ledger');
        Route::get('reports/journal', [ReportController::class, 'journal'])->name('reports.journal');
        Route::get('reports/trial-balance', [ReportController::class, 'trialBalance'])->name('reports.trial-balance');
    });
});