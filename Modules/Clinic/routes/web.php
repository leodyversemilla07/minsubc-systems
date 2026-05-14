<?php

use Illuminate\Support\Facades\Route;
use Modules\Clinic\Http\Controllers\Admin\AppointmentController;
use Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController;
use Modules\Clinic\Http\Controllers\Admin\ConsultationController;
use Modules\Clinic\Http\Controllers\Admin\DentalRecordController;
use Modules\Clinic\Http\Controllers\Admin\ImmunizationController;
use Modules\Clinic\Http\Controllers\Admin\MedicalRecordController;
use Modules\Clinic\Http\Controllers\Admin\PhysicalExamController;
use Modules\Clinic\Http\Controllers\Admin\ReferralController;

Route::prefix('clinic/admin')->name('clinic.admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['role:clinic-admin|clinic-doctor|clinic-nurse|super-admin'])->group(function () {
        Route::get('/', [ClinicDashboardController::class, 'index'])->name('dashboard');
        Route::resource('medical-records', MedicalRecordController::class);
        Route::resource('consultations', ConsultationController::class);
        Route::resource('immunizations', ImmunizationController::class);
        Route::resource('dental-records', DentalRecordController::class);
        Route::resource('physical-exams', PhysicalExamController::class);
        Route::resource('appointments', AppointmentController::class);
        Route::resource('referrals', ReferralController::class);
    });
});