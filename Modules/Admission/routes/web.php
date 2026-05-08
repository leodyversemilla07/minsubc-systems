<?php

use Illuminate\Support\Facades\Route;
use Modules\Admission\Http\Controllers\PageController;
use Modules\Admission\Http\Controllers\ApplicationController;
use Modules\Admission\Http\Controllers\PayMongoWebhookController;
use Modules\Admission\Http\Controllers\Admin\ApplicantController;
use Modules\Admission\Http\Controllers\Admin\DashboardController;
use Modules\Admission\Http\Controllers\Admin\AcademicTermController;
use Modules\Admission\Http\Controllers\Admin\SubjectController;
use Modules\Admission\Http\Controllers\Admin\SectionController;
use Modules\Admission\Http\Controllers\Admin\ScheduleController;
use Modules\Admission\Http\Controllers\Admin\EnrollmentController;
use Modules\Admission\Http\Controllers\Admin\GradeController;
use Modules\Admission\Http\Controllers\Admin\TranscriptController;

// ==================== PUBLIC ROUTES ====================
Route::prefix('admission')->name('admission.')->group(function () {

    Route::get('/', [PageController::class, 'index'])->name('index');

    // ==================== APPLICATION ROUTES ====================
    Route::get('/apply', [ApplicationController::class, 'create'])->name('application.create');
    Route::post('/apply', [ApplicationController::class, 'store'])->name('application.store');
    Route::get('/apply/{applicationNumber}', [ApplicationController::class, 'show'])->name('application.show');
    Route::post('/apply/{applicationNumber}/submit', [ApplicationController::class, 'submit'])->name('application.submit');
    Route::post('/apply/{applicationNumber}/documents', [ApplicationController::class, 'uploadDocument'])->name('application.documents.upload');
    Route::delete('/apply/{applicationNumber}/documents/{documentId}', [ApplicationController::class, 'deleteDocument'])->name('application.documents.delete');

    Route::get('/track', [ApplicationController::class, 'trackForm'])->name('track');
    Route::post('/track', [ApplicationController::class, 'trackStatus'])->name('track.lookup');

    // ==================== ADMIN ROUTES ====================
    Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified', 'permission:admission_view_dashboard'])->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // ==================== APPLICANTS ====================
        Route::get('/applicants', [ApplicantController::class, 'index'])->name('applicants.index');
        Route::get('/applicants/{id}', [ApplicantController::class, 'show'])->name('applicants.show');
        Route::patch('/applicants/{id}/status', [ApplicantController::class, 'updateStatus'])->name('applicants.update-status');
        Route::delete('/applicants/{id}', [ApplicantController::class, 'destroy'])->name('applicants.destroy');
        Route::post('/applicants/{applicantId}/evaluate', [\Modules\Admission\Http\Controllers\Admin\EvaluationController::class, 'store'])->name('evaluations.store');

        // ==================== ENROLLMENTS ====================
        Route::prefix('enrollments')->name('enrollments.')->group(function () {
            Route::get('/', [EnrollmentController::class, 'index'])->name('index');
            Route::get('/create', [EnrollmentController::class, 'create'])->name('create');
            Route::post('/', [EnrollmentController::class, 'store'])->name('store');
            Route::get('/{enrollment}', [EnrollmentController::class, 'show'])->name('show');
            Route::get('/{enrollment}/edit', [EnrollmentController::class, 'edit'])->name('edit');
            Route::patch('/{enrollment}', [EnrollmentController::class, 'update'])->name('update');
            Route::delete('/{enrollment}', [EnrollmentController::class, 'destroy'])->name('destroy');
            Route::post('/{enrollment}/confirm', [EnrollmentController::class, 'confirm'])->name('confirm');
            Route::post('/{enrollment}/assign-subjects', [EnrollmentController::class, 'assignSubjects'])->name('assign-subjects');
            Route::post('/{enrollment}/drop-subject/{subjectId}', [EnrollmentController::class, 'dropSubject'])->name('drop-subject');
            Route::post('/{enrollment}/record-payment', [EnrollmentController::class, 'recordPayment'])->name('record-payment');
            Route::post('/{enrollment}/re-enroll', [EnrollmentController::class, 'reEnroll'])->name('re-enroll');

            // Payments
            Route::post('/payments/{payment}/verify', [EnrollmentController::class, 'verifyPayment'])->name('payments.verify');
            Route::post('/payments/{payment}/reject', [EnrollmentController::class, 'rejectPayment'])->name('payments.reject');

            // API
            Route::get('/by-section/{sectionId}', [EnrollmentController::class, 'bySection'])->name('by-section');
        });

        // Reports
        Route::get('/enrollments/reports', [EnrollmentController::class, 'reports'])->name('enrollments.reports');

        // ==================== PROGRAMS ====================
        Route::get('/programs', [\Modules\Admission\Http\Controllers\Admin\ProgramController::class, 'index'])->name('programs.index');
        Route::get('/programs/create', [\Modules\Admission\Http\Controllers\Admin\ProgramController::class, 'create'])->name('programs.create');
        Route::post('/programs', [\Modules\Admission\Http\Controllers\Admin\ProgramController::class, 'store'])->name('programs.store');
        Route::get('/programs/{id}/edit', [\Modules\Admission\Http\Controllers\Admin\ProgramController::class, 'edit'])->name('programs.edit');
        Route::put('/programs/{id}', [\Modules\Admission\Http\Controllers\Admin\ProgramController::class, 'update'])->name('programs.update');

        // ==================== ACADEMIC TERMS ====================
        Route::prefix('terms')->name('terms.')->group(function () {
            Route::get('/', [AcademicTermController::class, 'index'])->name('index');
            Route::get('/create', [AcademicTermController::class, 'create'])->name('create');
            Route::post('/', [AcademicTermController::class, 'store'])->name('store');
            Route::get('/{term}', [AcademicTermController::class, 'show'])->name('show');
            Route::get('/{term}/edit', [AcademicTermController::class, 'edit'])->name('edit');
            Route::patch('/{term}', [AcademicTermController::class, 'update'])->name('update');
            Route::delete('/{term}', [AcademicTermController::class, 'destroy'])->name('destroy');
            Route::post('/{term}/set-active', [AcademicTermController::class, 'setActive'])->name('set-active');
        });

        // ==================== SUBJECTS ====================
        Route::prefix('subjects')->name('subjects.')->group(function () {
            Route::get('/', [SubjectController::class, 'index'])->name('index');
            Route::get('/create', [SubjectController::class, 'create'])->name('create');
            Route::post('/', [SubjectController::class, 'store'])->name('store');
            Route::get('/{subject}', [SubjectController::class, 'show'])->name('show');
            Route::get('/{subject}/edit', [SubjectController::class, 'edit'])->name('edit');
            Route::patch('/{subject}', [SubjectController::class, 'update'])->name('update');
            Route::delete('/{subject}', [SubjectController::class, 'destroy'])->name('destroy');

            // API endpoints
            Route::get('/by-course/{courseId}', [SubjectController::class, 'byCourse'])->name('by-course');
            Route::get('/by-course-level', [SubjectController::class, 'byCourseAndLevel'])->name('by-course-level');
        });

        // ==================== SECTIONS ====================
        Route::prefix('sections')->name('sections.')->group(function () {
            Route::get('/', [SectionController::class, 'index'])->name('index');
            Route::get('/create', [SectionController::class, 'create'])->name('create');
            Route::post('/', [SectionController::class, 'store'])->name('store');
            Route::get('/{section}', [SectionController::class, 'show'])->name('show');
            Route::get('/{section}/edit', [SectionController::class, 'edit'])->name('edit');
            Route::patch('/{section}', [SectionController::class, 'update'])->name('update');
            Route::delete('/{section}', [SectionController::class, 'destroy'])->name('destroy');
            Route::post('/{section}/add-schedule', [SectionController::class, 'addSchedule'])->name('add-schedule');
            Route::post('/{section}/remove-schedule/{schedule}', [SectionController::class, 'removeSchedule'])->name('remove-schedule');
            Route::get('/{section}/available-subjects', [SectionController::class, 'availableSubjects'])->name('available-subjects');
        });

        // ==================== SCHEDULES ====================
        Route::prefix('schedules')->name('schedules.')->group(function () {
            Route::get('/', [ScheduleController::class, 'index'])->name('index');
            Route::get('/create', [ScheduleController::class, 'create'])->name('create');
            Route::post('/', [ScheduleController::class, 'store'])->name('store');
            Route::get('/{schedule}', [ScheduleController::class, 'show'])->name('show');
            Route::get('/{schedule}/edit', [ScheduleController::class, 'edit'])->name('edit');
            Route::patch('/{schedule}', [ScheduleController::class, 'update'])->name('update');
            Route::delete('/{schedule}', [ScheduleController::class, 'destroy'])->name('destroy');
            Route::get('/instructor/{instructorId}', [ScheduleController::class, 'instructorSchedule'])->name('instructor');
            Route::get('/room/{room}', [ScheduleController::class, 'roomSchedule'])->name('room');
        });

        // ==================== GRADES ====================
        Route::prefix('grades')->name('grades.')->group(function () {
            Route::get('/', [GradeController::class, 'index'])->name('index');
            Route::get('/section/{section}', [GradeController::class, 'sectionGrades'])->name('section');
            Route::post('/{enrollment}', [GradeController::class, 'submitGrades'])->name('submit');
            Route::patch('/{enrollmentSubject}', [GradeController::class, 'updateGrade'])->name('update');
            Route::post('/bulk-upload', [GradeController::class, 'bulkUpload'])->name('bulk-upload');
            Route::get('/export', [GradeController::class, 'export'])->name('export');
            Route::get('/{enrollment}/gpa', [GradeController::class, 'calculateGPA'])->name('gpa');
            Route::get('/sheet/{section}', [GradeController::class, 'gradeSheet'])->name('sheet');
        });

        // ==================== TRANSCRIPTS ====================
        Route::prefix('transcripts')->name('transcripts.')->group(function () {
            Route::get('/', [TranscriptController::class, 'index'])->name('index');
            Route::get('/verify', [TranscriptController::class, 'verify'])->name('verify');
            Route::get('/{studentId}', [TranscriptController::class, 'preview'])->name('preview');
            Route::get('/{studentId}/download', [TranscriptController::class, 'download'])->name('download');
            Route::get('/{studentId}/tcos', [TranscriptController::class, 'trueCopy'])->name('true-copy');
            Route::post('/batch-print', [TranscriptController::class, 'batchPrint'])->name('batch-print');
        });

        });
});

// ==================== PAYMONGO WEBHOOK ====================
Route::prefix('admission')->name('admission.')->group(function () {
    Route::post('/webhook/paymongo', [PayMongoWebhookController::class, 'handle'])->name('webhook.paymongo');
});