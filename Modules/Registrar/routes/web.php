<?php

use Illuminate\Support\Facades\Route;
use Modules\Registrar\Http\Controllers\AdminController;
use Modules\Registrar\Http\Controllers\DocumentRequestController;
use Modules\Registrar\Http\Controllers\PaymentController;
use Modules\Registrar\Http\Controllers\StudentController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Student routes - accessible to students
    Route::middleware(['permission:submit_requests', 'throttle:10,1'])->group(function () {
        Route::get('document-requests/create', [DocumentRequestController::class, 'create'])
            ->name('registrar.document-requests.create');
        Route::post('document-requests', [DocumentRequestController::class, 'store'])
            ->name('registrar.document-requests.store');
        Route::get('document-requests/{documentRequest}/edit', [DocumentRequestController::class, 'edit'])
            ->name('registrar.document-requests.edit');
        Route::patch('document-requests/{documentRequest}', [DocumentRequestController::class, 'update'])
            ->name('registrar.document-requests.update');
        Route::delete('document-requests/{documentRequest}', [DocumentRequestController::class, 'destroy'])
            ->name('registrar.document-requests.destroy');
    });

    Route::middleware(['permission:view_own_requests'])->group(function () {
        Route::get('document-requests', [DocumentRequestController::class, 'index'])
            ->name('registrar.document-requests.index');
        Route::get('document-requests/{documentRequest}', [DocumentRequestController::class, 'show'])
            ->name('registrar.document-requests.show');
        Route::post('document-requests/{documentRequest}/confirm-claim', [DocumentRequestController::class, 'confirmClaim'])
            ->name('registrar.document-requests.confirm-claim');
    });

    Route::middleware(['permission:make_payments', 'throttle:20,1'])->group(function () {
        Route::get('document-requests/{documentRequest}/payment/method', [PaymentController::class, 'selectPaymentMethod'])
            ->name('registrar.payments.method');
        Route::post('document-requests/{documentRequest}/payment/cash', [PaymentController::class, 'generateCashPayment'])
            ->name('registrar.payments.cash');
        Route::get('payments/{payment}/cash-reference', [PaymentController::class, 'showCashPaymentReference'])
            ->name('registrar.payments.cash-reference');
        Route::get('document-requests/{documentRequest}/payment/success', [PaymentController::class, 'paymentSuccess'])
            ->name('registrar.payments.success');
    });

    Route::middleware(['permission:track_status'])->group(function () {
        Route::get('document-requests/{documentRequest}/payment/status', [PaymentController::class, 'showPaymentStatus'])
            ->name('registrar.payments.status');
    });

    // Cashier routes - accessible to cashiers
    Route::middleware(['role:cashier', 'throttle:30,1'])->group(function () {
        Route::get('cashier', [PaymentController::class, 'cashierDashboard'])->name('registrar.cashier.dashboard');
        Route::post('cashier/verify-payment', [PaymentController::class, 'verifyPaymentReference'])->name('registrar.cashier.verify-payment');
        Route::post('cashier/confirm-payment', [PaymentController::class, 'confirmCashPayment'])->name('registrar.cashier.confirm-payment');
        Route::get('cashier/receipt/{payment}', [PaymentController::class, 'printOfficialReceipt'])->name('registrar.cashier.receipt');
    });

    // Admin routes - accessible to registrar staff and admins
    Route::middleware(['role:registrar-staff|registrar-admin|super-admin'])->group(function () {
        Route::get('admin', [AdminController::class, 'dashboard'])->name('registrar.admin.dashboard');
        Route::get('admin/requests/{documentRequest}', [AdminController::class, 'show'])->name('registrar.admin.requests.show');
        Route::patch('admin/requests/{documentRequest}/status', [AdminController::class, 'updateStatus'])
            ->name('registrar.admin.requests.update-status');
        Route::post('admin/requests/{documentRequest}/ready', [AdminController::class, 'markReady'])
            ->name('registrar.admin.requests.mark-ready');
        Route::post('admin/requests/{documentRequest}/release', [AdminController::class, 'releaseDocument'])
            ->name('registrar.admin.requests.release');

        // Audit log routes - accessible to registrar admin and system admin
        Route::get('admin/audit-logs', [AdminController::class, 'auditLogs'])->name('registrar.admin.audit-logs');
        Route::get('admin/audit-logs/{auditLog}', [AdminController::class, 'showAuditLog'])->name('registrar.admin.audit-logs.show');
    });

    // Student management - accessible to registrar admin and system admin
    Route::middleware(['role:registrar-admin|super-admin'])->group(function () {
        Route::resource('students', StudentController::class)
            ->names('registrar.students');
    });
});
