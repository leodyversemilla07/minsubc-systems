<?php

use Illuminate\Support\Facades\Route;
use Modules\Registrar\Http\Controllers\RegistrarController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('registrars', RegistrarController::class)->names('registrar');
});
