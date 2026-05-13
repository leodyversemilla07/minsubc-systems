<?php

use Illuminate\Support\Facades\Route;
use Modules\Alumni\Http\Controllers\AlumniController;
use Modules\Alumni\Http\Controllers\Admin\AlumnusController;
use Modules\Alumni\Http\Controllers\Admin\DashboardController;
use Modules\Alumni\Http\Controllers\Admin\DonationController;
use Modules\Alumni\Http\Controllers\Admin\EmploymentRecordController;
use Modules\Alumni\Http\Controllers\Admin\EventController;
use Modules\Alumni\Http\Controllers\Admin\ReportController;
use Modules\Alumni\Http\Controllers\Admin\SurveyController;

/*
|--------------------------------------------------------------------------
| Alumni Module Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::prefix('alumni')->name('alumni.')->group(function () {
    Route::get('/', [AlumniController::class, 'index'])->name('index');
    Route::get('/directory', [AlumniController::class, 'directory'])->name('directory');
    Route::get('/events', [AlumniController::class, 'events'])->name('events.index');
    Route::get('/events/{event}', [AlumniController::class, 'eventShow'])->name('events.show');
});

// Admin Routes
Route::prefix('alumni/admin')->name('alumni.admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['role:alumni-admin|alumni-staff|super-admin'])->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('alumni', AlumnusController::class);
        Route::resource('events', EventController::class);
        Route::resource('donations', DonationController::class)->except(['edit', 'update']);
        Route::resource('employment-records', EmploymentRecordController::class);
        Route::resource('surveys', SurveyController::class);

        // Reports
        Route::prefix('reports')->name('reports.')->group(function () {
            Route::get('/', [ReportController::class, 'index'])->name('index');
            Route::get('/employment', [ReportController::class, 'employment'])->name('employment');
            Route::get('/donations', [ReportController::class, 'donations'])->name('donations');
            Route::get('/tracer', [ReportController::class, 'tracer'])->name('tracer');
        });
    });
});