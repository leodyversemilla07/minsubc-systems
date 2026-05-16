<?php

use Illuminate\Support\Facades\Route;
use Modules\Discipline\Http\Controllers\Admin\OffenseController;

Route::prefix('discipline')->name('discipline.api.')->middleware('api')->group(function () {
    Route::get('/offenses', [OffenseController::class, 'index'])->name('offenses.index');
});