<?php

use Illuminate\Support\Facades\Route;
use Modules\Admission\Http\Controllers\AdmissionController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('admissions', AdmissionController::class)->names('admission');
});
