<?php

use Illuminate\Support\Facades\Route;
use Modules\Helpdesk\Http\Controllers\Admin\DashboardController;
use Modules\Helpdesk\Http\Controllers\Admin\TicketController;
use Modules\Helpdesk\Http\Controllers\Admin\CategoryController;
use Modules\Helpdesk\Http\Controllers\Admin\ReportController;

Route::prefix('admin/helpdesk')->middleware(['web', 'auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('helpdesk.admin.dashboard');
    Route::resource('/tickets', TicketController::class, ['as' => 'helpdesk.admin']);
    Route::patch('/tickets/{ticket}/assign', [TicketController::class, 'assign'])->name('helpdesk.admin.tickets.assign');
    Route::patch('/tickets/{ticket}/resolve', [TicketController::class, 'resolve'])->name('helpdesk.admin.tickets.resolve');
    Route::patch('/tickets/{ticket}/close', [TicketController::class, 'close'])->name('helpdesk.admin.tickets.close');
    Route::patch('/tickets/{ticket}/reopen', [TicketController::class, 'reopen'])->name('helpdesk.admin.tickets.reopen');
    Route::post('/tickets/{ticket}/comments', [TicketController::class, 'comment'])->name('helpdesk.admin.tickets.comment');
    Route::resource('/categories', CategoryController::class, ['as' => 'helpdesk.admin', 'except' => ['show']]);
    Route::get('/reports', [ReportController::class, 'index'])->name('helpdesk.admin.reports');
});