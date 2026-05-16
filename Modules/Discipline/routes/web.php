<?php

use Illuminate\Support\Facades\Route;
use Modules\Discipline\Http\Controllers\Admin\DashboardController;
use Modules\Discipline\Http\Controllers\Admin\OffenseCategoryController;
use Modules\Discipline\Http\Controllers\Admin\OffenseController;
use Modules\Discipline\Http\Controllers\Admin\IncidentController;
use Modules\Discipline\Http\Controllers\Admin\SanctionController;
use Modules\Discipline\Http\Controllers\Admin\AppealController;
use Modules\Discipline\Http\Controllers\Admin\ReportController;

Route::prefix('admin/discipline')->name('discipline.admin.')->middleware(['web', 'auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('offense-categories', OffenseCategoryController::class)->only(['index', 'store', 'update', 'destroy'])->names([
        'index' => 'offense-categories.index',
        'store' => 'offense-categories.store',
        'update' => 'offense-categories.update',
        'destroy' => 'offense-categories.destroy',
    ]);
    Route::resource('offenses', OffenseController::class)->only(['index', 'store', 'update', 'destroy'])->names([
        'index' => 'offenses.index',
        'store' => 'offenses.store',
        'update' => 'offenses.update',
        'destroy' => 'offenses.destroy',
    ]);
    Route::get('/incidents', [IncidentController::class, 'index'])->name('incidents.index');
    Route::get('/incidents/create', [IncidentController::class, 'create'])->name('incidents.create');
    Route::post('/incidents', [IncidentController::class, 'store'])->name('incidents.store');
    Route::get('/incidents/{incident}', [IncidentController::class, 'show'])->name('incidents.show');
    Route::put('/incidents/{incident}', [IncidentController::class, 'update'])->name('incidents.update');
    Route::get('/sanctions', [SanctionController::class, 'index'])->name('sanctions.index');
    Route::post('/sanctions', [SanctionController::class, 'store'])->name('sanctions.store');
    Route::put('/sanctions/{sanction}', [SanctionController::class, 'update'])->name('sanctions.update');
    Route::get('/appeals', [AppealController::class, 'index'])->name('appeals.index');
    Route::get('/appeals/{appeal}', [AppealController::class, 'show'])->name('appeals.show');
    Route::post('/appeals', [AppealController::class, 'store'])->name('appeals.store');
    Route::put('/appeals/{appeal}/review', [AppealController::class, 'review'])->name('appeals.review');
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
});