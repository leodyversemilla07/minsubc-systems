<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('sas')->name('sas.')->group(function () {
    // Public routes
    Route::get('/', function () {
        return Inertia::render('sas/index');
    })->name('index');

    // Protected routes (require authentication)
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/scholarships', function () {
            return Inertia::render('sas/scholarships/index');
        })->name('scholarships.index');

        Route::get('/insurance', function () {
            return Inertia::render('sas/insurance/index');
        })->name('insurance.index');

        Route::get('/organizations', function () {
            return Inertia::render('sas/organizations/index');
        })->name('organizations.index');

        Route::get('/calendar', function () {
            return Inertia::render('sas/calendar/index');
        })->name('calendar.index');

        Route::get('/documents', function () {
            return Inertia::render('sas/documents/index');
        })->name('documents.index');

        Route::get('/reports', function () {
            return Inertia::render('sas/reports/index');
        })->name('reports.index');
    });
});
