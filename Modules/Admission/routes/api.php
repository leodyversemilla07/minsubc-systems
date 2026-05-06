<?php

use Illuminate\Support\Facades\Route;
use Modules\Admission\Http\Controllers\Admin\SubjectController;
use Modules\Admission\Http\Controllers\Admin\EnrollmentController;

/*
|--------------------------------------------------------------------------
| Admission API Routes
|--------------------------------------------------------------------------
|
| These routes are prefixed with /api/admission
|
*/

Route::middleware('auth:sanctum')->prefix('admission')->name('admission.')->group(function () {

    // ==================== SUBJECTS ====================
    Route::get('/subjects', [SubjectController::class, 'index'])->name('subjects.index');
    Route::get('/subjects/by-course/{courseId}', [SubjectController::class, 'byCourse'])->name('subjects.by-course');
    Route::get('/subjects/by-course-level', [SubjectController::class, 'byCourseAndLevel'])->name('subjects.by-course-level');

    // ==================== ENROLLMENTS ====================
    Route::get('/enrollments/by-section/{sectionId}', [EnrollmentController::class, 'bySection'])->name('enrollments.by-section');
});