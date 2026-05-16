<?php

use Illuminate\Support\Facades\Route;
use Modules\Scheduling\Http\Controllers\Admin\EventController;

Route::prefix('scheduling')->name('scheduling.api.')->middleware('api')->group(function () {
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
});