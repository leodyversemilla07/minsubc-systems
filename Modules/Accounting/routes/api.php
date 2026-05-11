<?php

use Illuminate\Support\Facades\Route;
use Modules\Accounting\Http\Controllers\Admin\AssessmentController;
use Modules\Accounting\Http\Controllers\Admin\PaymentController;

Route::get('/students/search', [AssessmentController::class, 'searchStudents'])->name('accounting.api.students.search');
Route::get('/fee-items', [\Modules\Accounting\Http\Controllers\Admin\FeeItemController::class, 'list'])->name('accounting.api.fee-items');
Route::get('/chart-accounts', [\Modules\Accounting\Http\Controllers\Admin\ChartAccountController::class, 'list'])->name('accounting.api.chart-accounts');