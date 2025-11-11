<?php

use Illuminate\Support\Facades\Route;
use Modules\SAS\Http\Controllers\Admin\ActivityController as AdminActivityController;
use Modules\SAS\Http\Controllers\Admin\DashboardController;
use Modules\SAS\Http\Controllers\Admin\DocumentController;
use Modules\SAS\Http\Controllers\Admin\InsuranceController as AdminInsuranceController;
use Modules\SAS\Http\Controllers\Admin\OrganizationController as AdminOrganizationController;
use Modules\SAS\Http\Controllers\Admin\ScholarshipController as AdminScholarshipController;
use Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController;
use Modules\SAS\Http\Controllers\Adviser\OrganizationController as AdviserOrganizationController;
use Modules\SAS\Http\Controllers\PageController;
use Modules\SAS\Http\Controllers\Student\InsuranceController as StudentInsuranceController;
use Modules\SAS\Http\Controllers\Student\ScholarshipController as StudentScholarshipController;

/*
|--------------------------------------------------------------------------
| Student Affairs and Services (SAS) Routes
|--------------------------------------------------------------------------
|
| This file contains all routes for the Student Affairs and Services module.
| Routes are organized by access level: Public, Student, Adviser, Admin.
|
*/

// ==================== PUBLIC ROUTES (No Authentication Required) ====================
Route::prefix('sas')->name('sas.')->group(function () {
    // Homepage
    Route::get('/', [PageController::class, 'index'])->name('index');

    // Organizations
    Route::get('/organizations', [PageController::class, 'organizations'])->name('organizations.index');
    Route::get('/organizations/{code}', [PageController::class, 'organizationShow'])->name('organizations.show');

    // Activities
    Route::get('/activities', [PageController::class, 'activities'])->name('activities.index');
    Route::get('/activities/calendar', [PageController::class, 'activitiesCalendar'])->name('activities.calendar');
    Route::get('/activities/export', [PageController::class, 'exportCalendar'])->name('activities.export');
    Route::get('/activities/{slug}', [PageController::class, 'activityShow'])->name('activities.show');
    Route::get('/activities/{slug}/export', [PageController::class, 'exportActivity'])->name('activities.export-single');

    // Scholarships (Public View)
    Route::get('/scholarships', [PageController::class, 'scholarships'])->name('scholarships.index');
    Route::get('/scholarships/{id}', [PageController::class, 'scholarshipShow'])->name('scholarships.show');
});

// ==================== STUDENT ROUTES ====================
Route::prefix('sas/student')->name('sas.student.')->middleware(['auth', 'role:student|sas-admin|super-admin'])->group(function () {
    // My Scholarships
    Route::get('/scholarships', [StudentScholarshipController::class, 'index'])->name('scholarships.index');
    Route::get('/scholarships/{id}', [StudentScholarshipController::class, 'show'])->name('scholarships.show');
    Route::get('/scholarships/{id}/requirements', [StudentScholarshipController::class, 'requirements'])->name('scholarships.requirements');
    Route::post('/scholarships/{id}/upload-requirement', [StudentScholarshipController::class, 'uploadRequirement'])->name('scholarships.upload-requirement');

    // My Insurance
    Route::get('/insurance', [StudentInsuranceController::class, 'index'])->name('insurance.index');
    Route::get('/insurance/create', [StudentInsuranceController::class, 'create'])->name('insurance.create');
    Route::post('/insurance', [StudentInsuranceController::class, 'store'])->name('insurance.store');
    Route::get('/insurance/{id}', [StudentInsuranceController::class, 'show'])->name('insurance.show');
});

// ==================== ORGANIZATION ADVISER ROUTES ====================
Route::prefix('sas/adviser')->name('sas.adviser.')->middleware(['auth', 'role:org_adviser|sas-admin|super-admin'])->group(function () {
    Route::get('/organization', [AdviserOrganizationController::class, 'dashboard'])->name('organization.dashboard');
    Route::get('/organization/edit', [AdviserOrganizationController::class, 'edit'])->name('organization.edit');
    Route::put('/organization', [AdviserOrganizationController::class, 'update'])->name('organization.update');
    Route::get('/organization/officers', [AdviserOrganizationController::class, 'officers'])->name('organization.officers');
    Route::post('/organization/officers', [AdviserOrganizationController::class, 'storeOfficer'])->name('organization.store-officer');
    Route::put('/organization/officers/{id}', [AdviserOrganizationController::class, 'updateOfficer'])->name('organization.update-officer');
    Route::post('/organization/documents', [AdviserOrganizationController::class, 'uploadDocument'])->name('organization.upload-document');
});

// ==================== SAS ADMIN ROUTES ====================
Route::prefix('sas/admin')->name('sas.admin.')->middleware(['auth', 'role:sas-staff|sas-admin|super-admin'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/statistics', [DashboardController::class, 'statistics'])->name('statistics');

    // Scholarships
    Route::resource('scholarships', AdminScholarshipController::class);

    // Scholarship Recipients
    Route::resource('scholarship-recipients', ScholarshipRecipientController::class);

    // Insurance
    Route::get('insurance', [AdminInsuranceController::class, 'index'])->name('insurance.index');
    Route::get('insurance/{id}', [AdminInsuranceController::class, 'show'])->name('insurance.show');
    Route::get('insurance/{id}/edit', [AdminInsuranceController::class, 'edit'])->name('insurance.edit');
    Route::put('insurance/{id}', [AdminInsuranceController::class, 'update'])->name('insurance.update');
    Route::delete('insurance/{id}', [AdminInsuranceController::class, 'destroy'])->name('insurance.destroy');
    Route::post('insurance/{id}/approve', [AdminInsuranceController::class, 'approve'])->name('insurance.approve');
    Route::post('insurance/{id}/reject', [AdminInsuranceController::class, 'reject'])->name('insurance.reject');

    // Organizations
    Route::resource('organizations', AdminOrganizationController::class);
    Route::get('organizations-compliance', [AdminOrganizationController::class, 'compliance'])->name('organizations.compliance');

    // Activities
    Route::resource('activities', AdminActivityController::class);
    Route::post('activities/{id}/complete', [AdminActivityController::class, 'complete'])->name('activities.complete');
    Route::post('activities/{id}/cancel', [AdminActivityController::class, 'cancel'])->name('activities.cancel');

    // Documents
    Route::get('documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::get('documents/create', [DocumentController::class, 'create'])->name('documents.create');
    Route::post('documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::get('documents/{id}', [DocumentController::class, 'show'])->name('documents.show');
    Route::get('documents/{id}/edit', [DocumentController::class, 'edit'])->name('documents.edit');
    Route::put('documents/{id}', [DocumentController::class, 'update'])->name('documents.update');
    Route::delete('documents/{id}', [DocumentController::class, 'destroy'])->name('documents.destroy');
    Route::get('documents-manage-disposal', [DocumentController::class, 'manageDisposal'])->name('documents.manage-disposal');
    Route::post('documents/{id}/disposal-status', [DocumentController::class, 'updateDisposalStatus'])->name('documents.update-disposal-status');

    // Reports
    Route::prefix('reports')->name('reports.')->group(function () {
        Route::get('/', [\Modules\SAS\Http\Controllers\ReportController::class, 'index'])->name('index');

        // Scholarship Reports
        Route::get('scholarships/recipients', [\Modules\SAS\Http\Controllers\ReportController::class, 'scholarshipRecipients'])->name('scholarships.recipients');
        Route::get('scholarships/approved/{semester}/{academicYear}', [\Modules\SAS\Http\Controllers\ReportController::class, 'approvedScholars'])->name('scholarships.approved');
        Route::get('scholarships/statistics/{academicYear}', [\Modules\SAS\Http\Controllers\ReportController::class, 'scholarshipStatistics'])->name('scholarships.statistics');

        // Insurance Reports
        Route::get('insurance/records', [\Modules\SAS\Http\Controllers\ReportController::class, 'insuranceRecords'])->name('insurance.records');
        Route::get('insurance/statistics/{academicYear}', [\Modules\SAS\Http\Controllers\ReportController::class, 'insuranceStatistics'])->name('insurance.statistics');
    });
});
