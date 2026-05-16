<?php

use Illuminate\Support\Facades\Route;
use Modules\Dormitory\Http\Controllers\Admin\DashboardController;
use Modules\Dormitory\Http\Controllers\Admin\HallController;
use Modules\Dormitory\Http\Controllers\Admin\RoomController;
use Modules\Dormitory\Http\Controllers\Admin\AssignmentController;
use Modules\Dormitory\Http\Controllers\Admin\MaintenanceController;
use Modules\Dormitory\Http\Controllers\Admin\ReportController;

Route::prefix('admin/dormitory')->middleware(['web', 'auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dormitory.admin.dashboard');
    Route::resource('/halls', HallController::class, ['as' => 'dormitory.admin']);
    Route::resource('/rooms', RoomController::class, ['as' => 'dormitory.admin', 'except' => ['show', 'edit', 'update']]);
    Route::resource('/assignments', AssignmentController::class, ['as' => 'dormitory.admin', 'except' => ['show', 'edit', 'update']]);
    Route::patch('/assignments/{assignment}/checkout', [AssignmentController::class, 'checkout'])->name('dormitory.admin.assignments.checkout');
    Route::resource('/maintenance', MaintenanceController::class, ['as' => 'dormitory.admin', 'except' => ['show', 'edit', 'update']]);
    Route::patch('/maintenance/{maintenance}/resolve', [MaintenanceController::class, 'resolve'])->name('dormitory.admin.maintenance.resolve');
    Route::get('/reports', [ReportController::class, 'index'])->name('dormitory.admin.reports');
});