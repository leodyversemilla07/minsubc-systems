<?php

use Illuminate\Support\Facades\Route;
use Modules\VotingSystem\Http\Controllers\VotingSystemController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('votingsystems', VotingSystemController::class)->names('votingsystem');
});
