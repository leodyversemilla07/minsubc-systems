<?php

use Illuminate\Support\Facades\Route;
use Modules\Scheduling\Http\Controllers\Admin\DashboardController;
use Modules\Scheduling\Http\Controllers\Admin\EventController;
use Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController;

Route::prefix('admin/scheduling')->name('scheduling.admin.')->middleware(['web', 'auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('events', EventController::class)->names([
        'index' => 'events.index',
        'create' => 'events.create',
        'store' => 'events.store',
        'show' => 'events.show',
        'edit' => 'events.edit',
        'update' => 'events.update',
        'destroy' => 'events.destroy',
    ]);
    Route::resource('academic-schedules', AcademicScheduleController::class)->only(['index', 'store', 'update', 'destroy'])->names([
        'index' => 'academic-schedules.index',
        'store' => 'academic-schedules.store',
        'update' => 'academic-schedules.update',
        'destroy' => 'academic-schedules.destroy',
    ]);
});