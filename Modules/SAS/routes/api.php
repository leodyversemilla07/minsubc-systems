<?php

use Illuminate\Support\Facades\Route;
use Modules\SAS\Http\Controllers\SASController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('sas', SASController::class)->names('sas');
});
