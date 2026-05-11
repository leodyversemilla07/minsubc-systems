<?php

use Illuminate\Support\Facades\Route;
use Modules\Guidance\Http\Controllers\Admin\DashboardController;
use Modules\Guidance\Http\Controllers\Admin\CounselorController;
use Modules\Guidance\Http\Controllers\Admin\AppointmentController;
use Modules\Guidance\Http\Controllers\Admin\CounselingSessionController;
use Modules\Guidance\Http\Controllers\Admin\AssessmentController;
use Modules\Guidance\Http\Controllers\Admin\ReferralController;
use Modules\Guidance\Http\Controllers\Admin\InterventionController;
use Modules\Guidance\Http\Controllers\Admin\IncidentReportController;
use Modules\Guidance\Http\Controllers\Admin\ReportController;
use Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController;

Route::prefix('guidance')->name('guidance.')->group(function () {
    // Public
    Route::get('/', [\Modules\Guidance\Http\Controllers\GuidanceController::class, 'index'])->name('index');

    // Student self-service
    Route::middleware(['auth', 'verified'])->prefix('my')->name('my.')->group(function () {
        Route::get('/dashboard', [\Modules\Guidance\Http\Controllers\Student\StudentDashboardController::class, 'index'])->name('dashboard');
        Route::get('/appointments', [\Modules\Guidance\Http\Controllers\Student\StudentDashboardController::class, 'appointments'])->name('appointments');
        Route::get('/appointments/create', [\Modules\Guidance\Http\Controllers\Student\StudentDashboardController::class, 'createAppointment'])->name('appointments.create');
        Route::post('/appointments', [\Modules\Guidance\Http\Controllers\Student\StudentDashboardController::class, 'storeAppointment'])->name('appointments.store');
        Route::post('/appointments/{appointment}/cancel', [\Modules\Guidance\Http\Controllers\Student\StudentDashboardController::class, 'cancelAppointment'])->name('appointments.cancel');
        Route::get('/assessments', [\Modules\Guidance\Http\Controllers\Student\StudentDashboardController::class, 'assessments'])->name('assessments');
        Route::post('/assessments/{assessment}/submit', [\Modules\Guidance\Http\Controllers\Student\StudentDashboardController::class, 'submitAssessment'])->name('assessments.submit');
        Route::get('/counselors', [\Modules\Guidance\Http\Controllers\Student\StudentDashboardController::class, 'counselors'])->name('counselors');
    });

    // Admin routes (+ counselor role)
    Route::middleware(['auth', 'role:guidance-admin|guidance-counselor|super-admin'])
        ->prefix('admin')->name('admin.')->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Counselors
        Route::resource('counselors', CounselorController::class);

        // Appointment Slots
        Route::get('slots', [\Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::class, 'index'])->name('slots.index');
        Route::get('slots/create', [\Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::class, 'create'])->name('slots.create');
        Route::post('slots', [\Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::class, 'store'])->name('slots.store');
        Route::get('slots/{slot}', [\Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::class, 'show'])->name('slots.show');
        Route::delete('slots/{slot}', [\Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::class, 'destroy'])->name('slots.destroy');

        // Appointments
        Route::get('appointments', [AppointmentController::class, 'index'])->name('appointments.index');
        Route::get('appointments/{appointment}', [AppointmentController::class, 'show'])->name('appointments.show');
        Route::post('appointments/{appointment}/confirm', [AppointmentController::class, 'confirm'])->name('appointments.confirm');
        Route::post('appointments/{appointment}/complete', [AppointmentController::class, 'complete'])->name('appointments.complete');
        Route::post('appointments/{appointment}/cancel', [AppointmentController::class, 'cancel'])->name('appointments.cancel');
        Route::post('appointments/{appointment}/no-show', [AppointmentController::class, 'noShow'])->name('appointments.no-show');

        // Counseling Sessions
        Route::resource('sessions', CounselingSessionController::class);
        Route::get('sessions/{session}/print', [CounselingSessionController::class, 'print'])->name('sessions.print');

        // Assessments
        Route::get('assessments', [AssessmentController::class, 'index'])->name('assessments.index');
        Route::get('assessments/{assessment}', [AssessmentController::class, 'show'])->name('assessments.show');
        Route::post('assessments/{assessment}/review', [AssessmentController::class, 'review'])->name('assessments.review');
        Route::get('assessments/{assessment}/print', [AssessmentController::class, 'printReport'])->name('assessments.print');

        // Referrals
        Route::resource('referrals', ReferralController::class);
        Route::post('referrals/{referral}/accept', [ReferralController::class, 'accept'])->name('referrals.accept');
        Route::post('referrals/{referral}/complete', [ReferralController::class, 'complete'])->name('referrals.complete');

        // Interventions
        Route::resource('interventions', InterventionController::class);
        Route::post('interventions/{intervention}/manage-participants', [InterventionController::class, 'manageParticipants'])->name('interventions.manage-participants');

        // Incident Reports
        Route::resource('incident-reports', IncidentReportController::class);
        Route::post('incident-reports/{incidentReport}/resolve', [IncidentReportController::class, 'resolve'])->name('incident-reports.resolve');

        // Reports
        Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('reports/appointments', [ReportController::class, 'appointmentsReport'])->name('reports.appointments');
        Route::get('reports/sessions', [ReportController::class, 'sessionsReport'])->name('reports.sessions');
        Route::get('reports/incidents', [ReportController::class, 'incidentsReport'])->name('reports.incidents');
    });

    // Counselor-only dashboard
    Route::middleware(['auth', 'role:guidance-counselor|guidance-admin|super-admin'])
        ->prefix('counselor')->name('counselor.')->group(function () {
        Route::get('/dashboard', [CounselorDashboardController::class, 'index'])->name('dashboard');
        Route::get('/appointments', [CounselorDashboardController::class, 'appointments'])->name('appointments');
        Route::get('/students', [CounselorDashboardController::class, 'students'])->name('students');
        Route::get('/students/{student}', [CounselorDashboardController::class, 'studentProfile'])->name('students.show');
    });
});