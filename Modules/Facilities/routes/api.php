<?php

use Illuminate\Support\Facades\Route;
use Modules\Facilities\Http\Controllers\Admin\FacilityController;

Route::prefix('facilities')->name('facilities.api.')->middleware('api')->group(function () {
    Route::get('/facilities', [FacilityController::class, 'index'])->name('facilities.index');
});