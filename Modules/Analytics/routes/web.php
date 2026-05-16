<?php

use Illuminate\Support\Facades\Route;
use Modules\Analytics\Http\Controllers\Admin\AnalyticsController;

Route::prefix('admin')->middleware(['web', 'auth'])->group(function () {
    Route::get('/analytics/dashboard', [AnalyticsController::class, 'index'])->name('analytics.admin.dashboard');
});