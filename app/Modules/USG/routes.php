<?php

use App\Modules\USG\Http\Controllers\Admin\AnnouncementController;
use App\Modules\USG\Http\Controllers\Admin\DashboardController;
use App\Modules\USG\Http\Controllers\Admin\DocumentController;
use App\Modules\USG\Http\Controllers\Admin\EventController;
use App\Modules\USG\Http\Controllers\Admin\OfficerController;
use App\Modules\USG\Http\Controllers\Admin\ResolutionController;
use App\Modules\USG\Http\Controllers\Admin\VMGOController;
use App\Modules\USG\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| USG Information Portal Routes
|--------------------------------------------------------------------------
|
| Routes for the University Student Government Information and
| Transparency Portal module.
|
*/

// Public Routes (No Authentication Required)
Route::prefix('usg')->name('usg.')->group(function () {
    // Homepage
    Route::get('/', [PageController::class, 'index'])->name('index');

    // Vision, Mission, Goals, Objectives
    Route::get('/vmgo', [PageController::class, 'vmgo'])->name('vmgo.show');

    // Officers
    Route::get('/officers', [PageController::class, 'officers'])->name('officers.index');

    // Announcements
    Route::get('/announcements', [PageController::class, 'announcements'])->name('announcements.index');
    Route::get('/announcements/{announcement:slug}', [PageController::class, 'announcementShow'])->name('announcements.show');
    Route::get('/announcements/category/{category}', [PageController::class, 'announcementCategory'])->name('announcements.category');

    // Events
    Route::get('/events', [PageController::class, 'events'])->name('events.index');
    Route::get('/events/calendar', [PageController::class, 'eventsCalendar'])->name('events.calendar');
    Route::get('/events/{event:slug}', [PageController::class, 'eventShow'])->name('events.show');
    Route::get('/events/calendar/data', [PageController::class, 'eventsCalendarData'])->name('events.calendar.data');

    // Resolutions
    Route::get('/resolutions', [PageController::class, 'resolutions'])->name('resolutions.index');
    Route::get('/resolutions/{resolution}', [PageController::class, 'resolutionShow'])->name('resolutions.show');
    Route::get('/resolutions/{resolution}/download', [PageController::class, 'resolutionDownload'])->name('resolutions.download');
    Route::get('/resolutions/category/{category}', [PageController::class, 'resolutionCategory'])->name('resolutions.category');

    // Transparency Reports
    Route::get('/transparency', [PageController::class, 'transparency'])->name('transparency.index');
    Route::get('/transparency/{transparencyReport:slug}', [PageController::class, 'transparencyShow'])->name('transparency.show');
    Route::get('/transparency/{transparencyReport:slug}/download', [PageController::class, 'transparencyDownload'])->name('transparency.download');

    // Search
    Route::get('/search', [PageController::class, 'search'])->name('search');
});

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {

    // USG Admin Routes - accessible to USG Officers and System Admins
    Route::prefix('usg/admin')->name('usg.admin.')->group(function () {

        // Dashboard - accessible to all USG members
        Route::middleware(['role:usg-officer|usg-admin|system-admin'])->group(function () {
            Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        });

        // VMGO Management - restricted to USG Admins and System Admins
        Route::middleware(['role:usg-admin|system-admin'])->group(function () {
            Route::get('/vmgo/edit', [VMGOController::class, 'edit'])->name('vmgo.edit');
            Route::patch('/vmgo', [VMGOController::class, 'update'])->name('vmgo.update');
            Route::get('/vmgo/history', [VMGOController::class, 'history'])->name('vmgo.history');
        });

        // Officer Management - restricted to USG Admins and System Admins
        Route::middleware(['role:usg-admin|system-admin'])->group(function () {
            Route::resource('officers', OfficerController::class)->except(['show']);
            Route::post('officers/reorder', [OfficerController::class, 'reorder'])->name('officers.reorder');
            Route::patch('officers/{officer}/toggle-active', [OfficerController::class, 'toggleActive'])->name('officers.toggle-active');
        });

        // Announcement Management
        Route::middleware(['role:usg-officer|usg-admin|system-admin'])->group(function () {
            Route::resource('announcements', AnnouncementController::class);
            Route::get('announcements/{announcement:slug}/preview', [AnnouncementController::class, 'preview'])->name('announcements.preview');
            Route::patch('announcements/{announcement}/publish', [AnnouncementController::class, 'publish'])->name('announcements.publish');
            Route::patch('announcements/{announcement}/unpublish', [AnnouncementController::class, 'unpublish'])->name('announcements.unpublish');
            Route::patch('announcements/{announcement}/archive', [AnnouncementController::class, 'archive'])->name('announcements.archive');
        });

        // Event Management
        Route::middleware(['role:usg-officer|usg-admin|system-admin'])->group(function () {
            Route::resource('events', EventController::class);
            Route::patch('events/{event}/publish', [EventController::class, 'publish'])->name('events.publish');
            Route::patch('events/{event}/cancel', [EventController::class, 'cancel'])->name('events.cancel');
            Route::patch('events/{event}/archive', [EventController::class, 'archive'])->name('events.archive');
        });

        // Resolution Management
        Route::middleware(['role:usg-officer|usg-admin|system-admin'])->group(function () {
            Route::resource('resolutions', ResolutionController::class);
            Route::patch('resolutions/{resolution}/submit', [ResolutionController::class, 'submit'])->name('resolutions.submit');
        });

        // Resolution Approval - restricted to USG Admins and System Admins
        Route::middleware(['role:usg-admin|system-admin'])->group(function () {
            Route::get('resolutions/pending', [ResolutionController::class, 'pending'])->name('resolutions.pending');
            Route::patch('resolutions/{resolution}/approve', [ResolutionController::class, 'approve'])->name('resolutions.approve');
            Route::patch('resolutions/{resolution}/reject', [ResolutionController::class, 'reject'])->name('resolutions.reject');
            Route::patch('resolutions/{resolution}/archive', [ResolutionController::class, 'archive'])->name('resolutions.archive');
        });

        // Document Management - restricted to USG Admins and System Admins
        Route::middleware(['role:usg-admin|system-admin'])->group(function () {
            Route::resource('documents', DocumentController::class);
            Route::get('documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');
        });
    });
});
