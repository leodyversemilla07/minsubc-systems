<?php

use Illuminate\Support\Facades\Route;
use Modules\Discipline\Http\Controllers\Admin\OffenseController;

Route::prefix('discipline')->name('discipline.api.')->middleware(['web', 'auth', 'role:discipline-admin|discipline-staff|super-admin'])->group(function () {
    Route::get('/offenses', [OffenseController::class, 'index'])->name('offenses.index');
});
