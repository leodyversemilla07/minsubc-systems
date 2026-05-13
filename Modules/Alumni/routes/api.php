<?php

use Illuminate\Support\Facades\Route;
use Modules\Alumni\Models\Alumnus;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/alumni', function () {
        return Alumnus::withCount(['employmentRecords', 'donations'])->paginate(20);
    });
    Route::get('/alumni/{alumnus}', function (Alumnus $alumnus) {
        return $alumnus->load(['employmentRecords', 'educations', 'donations']);
    });
});