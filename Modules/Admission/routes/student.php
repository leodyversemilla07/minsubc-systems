<?php

use Illuminate\Support\Facades\Route;
use Modules\Admission\Http\Controllers\Student\StudentEnrollmentController;

/*
|--------------------------------------------------------------------------
| Student Enrollment Routes
|--------------------------------------------------------------------------
|
| These routes are for students to manage their enrollments.
|
*/

Route::middleware(['auth', 'verified'])->prefix('student/enrollment')->name('student.enrollment.')->group(function () {

    // Dashboard
    Route::get('/', [StudentEnrollmentController::class, 'index'])->name('index');

    // Enrollment
    Route::get('/enroll', [StudentEnrollmentController::class, 'create'])->name('create');
    Route::post('/enroll', [StudentEnrollmentController::class, 'store'])->name('store');
    Route::get('/{enrollment}', [StudentEnrollmentController::class, 'show'])->name('show');

    // Subjects management
    Route::get('/{enrollment}/subjects', [StudentEnrollmentController::class, 'subjects'])->name('subjects');
    Route::patch('/{enrollment}/subjects', [StudentEnrollmentController::class, 'updateSubjects'])->name('subjects.update');

    // Payment
    Route::get('/{enrollment}/payment', [StudentEnrollmentController::class, 'payment'])->name('payment');
    Route::post('/{enrollment}/payment', [StudentEnrollmentController::class, 'submitPayment'])->name('payment.submit');

    // History & Grades
    Route::get('/history', [StudentEnrollmentController::class, 'history'])->name('history');
    Route::get('/grades', [StudentEnrollmentController::class, 'grades'])->name('grades');
    Route::get('/schedule', [StudentEnrollmentController::class, 'schedule'])->name('schedule');
});

// Shorter aliases for navigation
Route::middleware(['auth', 'verified'])->prefix('my/enrollment')->name('my.enrollment.')->group(function () {
    Route::get('/', [StudentEnrollmentController::class, 'index'])->name('index');
    Route::get('/enroll', [StudentEnrollmentController::class, 'create'])->name('create');
    Route::post('/enroll', [StudentEnrollmentController::class, 'store'])->name('store');
    Route::get('/{enrollment}', [StudentEnrollmentController::class, 'show'])->name('show');
    Route::get('/{enrollment}/payment', [StudentEnrollmentController::class, 'payment'])->name('payment');
    Route::post('/{enrollment}/payment', [StudentEnrollmentController::class, 'submitPayment'])->name('payment.submit');
    Route::get('/schedule', [StudentEnrollmentController::class, 'schedule'])->name('schedule');
    Route::get('/grades', [StudentEnrollmentController::class, 'grades'])->name('grades');
    Route::get('/history', [StudentEnrollmentController::class, 'history'])->name('history');
});