<?php

use App\Modules\Registrar\Http\Controllers\AdminController;
use App\Modules\Registrar\Http\Controllers\DocumentRequestController;
use App\Modules\Registrar\Http\Controllers\PaymentController;
use App\Modules\Registrar\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Student routes - accessible to students
    Route::middleware(['permission:submit_requests'])->group(function () {
        Route::get('document-requests/create', [DocumentRequestController::class, 'create'])
            ->name('registrar.document-requests.create');
        Route::post('document-requests', [DocumentRequestController::class, 'store'])
            ->name('registrar.document-requests.store');
        Route::get('document-requests/{document_request}/edit', [DocumentRequestController::class, 'edit'])
            ->name('registrar.document-requests.edit');
        Route::patch('document-requests/{document_request}', [DocumentRequestController::class, 'update'])
            ->name('registrar.document-requests.update');
        Route::delete('document-requests/{document_request}', [DocumentRequestController::class, 'destroy'])
            ->name('registrar.document-requests.destroy');
    });

    Route::middleware(['permission:view_own_requests'])->group(function () {
        Route::get('document-requests', [DocumentRequestController::class, 'index'])
            ->name('registrar.document-requests.index');
        Route::get('document-requests/{document_request}', [DocumentRequestController::class, 'show'])
            ->name('registrar.document-requests.show');
    });

    Route::middleware(['permission:make_payments'])->group(function () {
        Route::get('document-requests/{document_request}/payment/method', [PaymentController::class, 'selectPaymentMethod'])
            ->name('registrar.payments.method');
        Route::post('document-requests/{document_request}/payment/initiate', [PaymentController::class, 'initiatePayment'])
            ->name('registrar.payments.initiate');
        Route::post('document-requests/{document_request}/payment/cash', [PaymentController::class, 'generateCashPayment'])
            ->name('registrar.payments.cash');
        Route::get('document-requests/{document_request}/payment/success', [PaymentController::class, 'paymentSuccess'])
            ->name('registrar.payments.success');
    });

    Route::middleware(['permission:track_status'])->group(function () {
        Route::get('document-requests/{document_request}/payment/status', [PaymentController::class, 'showPaymentStatus'])
            ->name('registrar.payments.status');
    });

    // Cashier routes - accessible to cashiers
    Route::middleware(['role:cashier'])->group(function () {
        Route::get('cashier', [PaymentController::class, 'cashierDashboard'])->name('registrar.cashier.dashboard');
        Route::post('cashier/verify-payment', [PaymentController::class, 'verifyPaymentReference'])->name('registrar.cashier.verify-payment');
        Route::post('cashier/confirm-payment', [PaymentController::class, 'confirmCashPayment'])->name('registrar.cashier.confirm-payment');
    });

    // Admin routes - accessible to registrar staff and admins
    Route::middleware(['role:registrar-staff|registrar-admin|system-admin'])->group(function () {
        Route::get('admin', [AdminController::class, 'dashboard'])->name('registrar.admin.dashboard');
        Route::get('admin/requests', [AdminController::class, 'requests'])->name('registrar.admin.requests');
        Route::patch('admin/requests/{document_request}/status', [AdminController::class, 'updateStatus'])
            ->name('registrar.admin.requests.update-status');
        Route::post('admin/requests/{document_request}/ready', [AdminController::class, 'markReady'])
            ->name('registrar.admin.requests.mark-ready');
        Route::post('admin/requests/{document_request}/release', [AdminController::class, 'releaseDocument'])
            ->name('registrar.admin.requests.release');
        Route::get('admin/requests/{document_request}/generate', [AdminController::class, 'generateDocument'])
            ->name('registrar.admin.requests.generate');
        Route::get('admin/requests/{document_request}/download', [AdminController::class, 'downloadDocument'])
            ->name('registrar.admin.requests.download');

        // Audit log routes - accessible to registrar admin and system admin
        Route::get('admin/audit-logs', [AdminController::class, 'auditLogs'])->name('registrar.admin.audit-logs');
        Route::get('admin/audit-logs/{audit_log}', [AdminController::class, 'showAuditLog'])->name('registrar.admin.audit-logs.show');
    });

    // Student management - accessible to registrar admin and system admin
    Route::middleware(['role:registrar-admin|system-admin'])->group(function () {
        Route::resource('students', StudentController::class)
            ->names('registrar.students');
    });
});

// Webhook route (no auth required)
Route::post('webhooks/paymongo', [PaymentController::class, 'handleWebhook'])
    ->name('registrar.webhooks.paymongo');
