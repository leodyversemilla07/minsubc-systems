<?php

use App\Modules\SAS\Http\Controllers\Admin\ActivityController as AdminActivityController;
use App\Modules\SAS\Http\Controllers\Admin\DashboardController;
use App\Modules\SAS\Http\Controllers\Admin\DocumentController;
use App\Modules\SAS\Http\Controllers\Admin\InsuranceController as AdminInsuranceController;
use App\Modules\SAS\Http\Controllers\Admin\OrganizationController as AdminOrganizationController;
use App\Modules\SAS\Http\Controllers\Admin\ScholarshipController as AdminScholarshipController;
use App\Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController;
use App\Modules\SAS\Http\Controllers\Adviser\OrganizationController as AdviserOrganizationController;
use App\Modules\SAS\Http\Controllers\Public\ActivityController as PublicActivityController;
use App\Modules\SAS\Http\Controllers\Public\OrganizationController as PublicOrganizationController;
use App\Modules\SAS\Http\Controllers\Student\InsuranceController as StudentInsuranceController;
use App\Modules\SAS\Http\Controllers\Student\ScholarshipController as StudentScholarshipController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Student Affairs System (SAS) Routes
|--------------------------------------------------------------------------
|
| This file contains all routes for the Student Affairs System module.
| Routes are organized by access level: Public, Student, Adviser, Admin.
|
*/

// ==================== PUBLIC ROUTES ====================
Route::prefix('sas')->name('sas.')->group(function () {
    // Home/Landing Page
    Route::get('/', function () {
        return Inertia::render('SAS/index');
    })->name('index');

    // Organizations
    Route::get('/organizations', [PublicOrganizationController::class, 'index'])->name('organizations.index');
    Route::get('/organizations/{code}', [PublicOrganizationController::class, 'show'])->name('organizations.show');

    // Activities
    Route::get('/activities', [PublicActivityController::class, 'index'])->name('activities.index');
    Route::get('/activities/calendar', [PublicActivityController::class, 'calendar'])->name('activities.calendar');
    Route::get('/activities/{slug}', [PublicActivityController::class, 'show'])->name('activities.show');
});

// ==================== STUDENT ROUTES ====================
Route::prefix('sas/student')->name('sas.student.')->middleware(['auth', 'role:student|admin'])->group(function () {
    // My Scholarships
    Route::get('/scholarships', [StudentScholarshipController::class, 'index'])->name('scholarships.index');
    Route::get('/scholarships/{id}', [StudentScholarshipController::class, 'show'])->name('scholarships.show');
    Route::post('/scholarships/{id}/upload-requirement', [StudentScholarshipController::class, 'uploadRequirement'])->name('scholarships.upload-requirement');

    // My Insurance
    Route::get('/insurance', [StudentInsuranceController::class, 'index'])->name('insurance.index');
    Route::get('/insurance/create', [StudentInsuranceController::class, 'create'])->name('insurance.create');
    Route::post('/insurance', [StudentInsuranceController::class, 'store'])->name('insurance.store');
    Route::get('/insurance/{id}', [StudentInsuranceController::class, 'show'])->name('insurance.show');
});

// ==================== ORGANIZATION ADVISER ROUTES ====================
Route::prefix('sas/adviser')->name('sas.adviser.')->middleware(['auth', 'role:org_adviser|admin'])->group(function () {
    Route::get('/organization', [AdviserOrganizationController::class, 'dashboard'])->name('organization.dashboard');
    Route::get('/organization/edit', [AdviserOrganizationController::class, 'edit'])->name('organization.edit');
    Route::put('/organization', [AdviserOrganizationController::class, 'update'])->name('organization.update');
    Route::get('/organization/officers', [AdviserOrganizationController::class, 'officers'])->name('organization.officers');
    Route::post('/organization/officers', [AdviserOrganizationController::class, 'storeOfficer'])->name('organization.store-officer');
    Route::put('/organization/officers/{id}', [AdviserOrganizationController::class, 'updateOfficer'])->name('organization.update-officer');
    Route::post('/organization/documents', [AdviserOrganizationController::class, 'uploadDocument'])->name('organization.upload-document');
});

// ==================== SAS ADMIN ROUTES ====================
Route::prefix('sas/admin')->name('sas.admin.')->middleware(['auth', 'role:sas_officer|sas_admin|admin'])->group(function () {
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
});
