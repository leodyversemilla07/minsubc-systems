<?php

use Illuminate\Support\Facades\Route;
use Modules\Guidance\Http\Controllers\Admin\CounselorController;
use Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController;

Route::get('/counselors/available', [CounselorController::class, 'listAvailable'])->name('guidance.api.counselors.available');
Route::get('/slots/available', [AppointmentSlotController::class, 'availableSlots'])->name('guidance.api.slots.available');
Route::get('/students/search', [\Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::class, 'searchStudents'])->name('guidance.api.students.search');