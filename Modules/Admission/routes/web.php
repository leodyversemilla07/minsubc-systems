<?php

use Illuminate\Support\Facades\Route;

// ==================== PUBLIC ROUTES ====================
Route::prefix('admission')->name('admission.')->group(function () {

    Route::get('/apply', [\Modules\Admission\Http\Controllers\ApplicationController::class, 'create'])
        ->name('application.create');
    Route::post('/apply', [\Modules\Admission\Http\Controllers\ApplicationController::class, 'store'])
        ->name('application.store');
    Route::get('/apply/{applicationNumber}', [\Modules\Admission\Http\Controllers\ApplicationController::class, 'show'])
        ->name('application.show');
    Route::post('/apply/{applicationNumber}/submit', [\Modules\Admission\Http\Controllers\ApplicationController::class, 'submit'])
        ->name('application.submit');
    Route::post('/apply/{applicationNumber}/documents', [\Modules\Admission\Http\Controllers\ApplicationController::class, 'uploadDocument'])
        ->name('application.documents.upload');

    Route::get('/track', [\Modules\Admission\Http\Controllers\ApplicationController::class, 'trackForm'])
        ->name('track');
    Route::post('/track', [\Modules\Admission\Http\Controllers\ApplicationController::class, 'trackStatus'])
        ->name('track.lookup');

    // ==================== ADMIN ROUTES ====================
    Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified', 'permission:admission_view_dashboard'])->group(function () {

        Route::get('/dashboard', [\Modules\Admission\Http\Controllers\Admin\DashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/applicants', [\Modules\Admission\Http\Controllers\Admin\ApplicantController::class, 'index'])
            ->name('applicants.index');
        Route::get('/applicants/{id}', [\Modules\Admission\Http\Controllers\Admin\ApplicantController::class, 'show'])
            ->name('applicants.show');
        Route::patch('/applicants/{id}/status', [\Modules\Admission\Http\Controllers\Admin\ApplicantController::class, 'updateStatus'])
            ->name('applicants.update-status');
        Route::delete('/applicants/{id}', [\Modules\Admission\Http\Controllers\Admin\ApplicantController::class, 'destroy'])
            ->name('applicants.destroy');

        Route::post('/applicants/{applicantId}/evaluate', [\Modules\Admission\Http\Controllers\Admin\EvaluationController::class, 'store'])
            ->name('evaluations.store');

        Route::get('/enrollments', [\Modules\Admission\Http\Controllers\Admin\EnrollmentController::class, 'index'])
            ->name('enrollments.index');
        Route::post('/enrollments/confirm', [\Modules\Admission\Http\Controllers\Admin\EnrollmentController::class, 'confirm'])
            ->name('enrollments.confirm');

        Route::get('/programs', [\Modules\Admission\Http\Controllers\Admin\ProgramController::class, 'index'])
            ->name('programs.index');
        Route::get('/programs/create', [\Modules\Admission\Http\Controllers\Admin\ProgramController::class, 'create'])
            ->name('programs.create');
        Route::post('/programs', [\Modules\Admission\Http\Controllers\Admin\ProgramController::class, 'store'])
            ->name('programs.store');
        Route::get('/programs/{id}/edit', [\Modules\Admission\Http\Controllers\Admin\ProgramController::class, 'edit'])
            ->name('programs.edit');
        Route::put('/programs/{id}', [\Modules\Admission\Http\Controllers\Admin\ProgramController::class, 'update'])
            ->name('programs.update');
    });
});
