<?php

use Illuminate\Support\Facades\Route;
use Modules\USG\Http\Controllers\USGController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('usgs', USGController::class)->names('usg');
});
