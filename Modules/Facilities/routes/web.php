<?php

use Illuminate\Support\Facades\Route;
use Modules\Facilities\Http\Controllers\Admin\DashboardController;
use Modules\Facilities\Http\Controllers\Admin\FacilityController;
use Modules\Facilities\Http\Controllers\Admin\ReservationController;
use Modules\Facilities\Http\Controllers\Admin\EquipmentController;
use Modules\Facilities\Http\Controllers\Admin\MaintenanceController;

Route::prefix('admin/facilities')->name('facilities.admin.')->middleware(['web', 'auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('facilities', FacilityController::class)->names([
        'index' => 'facilities.index',
        'create' => 'facilities.create',
        'store' => 'facilities.store',
        'show' => 'facilities.show',
        'edit' => 'facilities.edit',
        'update' => 'facilities.update',
        'destroy' => 'facilities.destroy',
    ]);
    Route::resource('equipment', EquipmentController::class)->only(['index', 'store', 'update', 'destroy'])->names([
        'index' => 'equipment.index',
        'store' => 'equipment.store',
        'update' => 'equipment.update',
        'destroy' => 'equipment.destroy',
    ]);
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
    Route::get('/reservations/{reservation}', [ReservationController::class, 'show'])->name('reservations.show');
    Route::post('/reservations/{reservation}/approve', [ReservationController::class, 'approve'])->name('reservations.approve');
    Route::post('/reservations/{reservation}/reject', [ReservationController::class, 'reject'])->name('reservations.reject');
    Route::post('/reservations/{reservation}/complete', [ReservationController::class, 'complete'])->name('reservations.complete');
    Route::get('/maintenance', [MaintenanceController::class, 'index'])->name('maintenance.index');
    Route::post('/maintenance', [MaintenanceController::class, 'store'])->name('maintenance.store');
    Route::put('/maintenance/{maintenance}', [MaintenanceController::class, 'update'])->name('maintenance.update');
});