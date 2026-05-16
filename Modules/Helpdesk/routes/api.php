<?php

use Illuminate\Support\Facades\Route;
use Modules\Helpdesk\Http\Controllers\Admin\TicketController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tickets', [TicketController::class, 'index']);
});