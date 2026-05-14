<?php

use Illuminate\Support\Facades\Route;
use Modules\Clinic\Models\MedicalRecord;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/patients', function () {
        return MedicalRecord::withCount('consultations')->paginate(20);
    });
});