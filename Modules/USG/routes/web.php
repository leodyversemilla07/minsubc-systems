<?php

use Illuminate\Support\Facades\Route;
use Modules\USG\Http\Controllers\Admin\AnalyticsController;
use Modules\USG\Http\Controllers\Admin\AnnouncementController;
use Modules\USG\Http\Controllers\Admin\DashboardController;
use Modules\USG\Http\Controllers\Admin\DocumentController;
use Modules\USG\Http\Controllers\Admin\EventController;
use Modules\USG\Http\Controllers\Admin\OfficerController;
use Modules\USG\Http\Controllers\Admin\ResolutionController;
use Modules\USG\Http\Controllers\Admin\TransparencyReportController;
use Modules\USG\Http\Controllers\Admin\VMGOController;
use Modules\USG\Http\Controllers\PageController;
use Modules\USG\Http\Controllers\SearchController;

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
    Route::get('/officers/{id}', [PageController::class, 'officerShow'])->name('officers.show');

    // Announcements
    Route::get('/announcements', [PageController::class, 'announcements'])->name('announcements.index');
    Route::get('/announcements/{announcement:slug}', [PageController::class, 'announcementShow'])->name('announcements.show');
    Route::get('/announcements/category/{category}', [PageController::class, 'announcementCategory'])->name('announcements.category');

    // Events
    Route::get('/events', [PageController::class, 'events'])->name('events.index');
    Route::get('/events/calendar', [PageController::class, 'eventsCalendar'])->name('events.calendar');
    Route::get('/events/export/all.ics', [PageController::class, 'eventsExportAllICal'])->name('events.export.all');
    Route::get('/events/{event:slug}', [PageController::class, 'eventShow'])->name('events.show');
    Route::get('/events/{event:slug}/export.ics', [PageController::class, 'eventExportICal'])->name('events.export');
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
    Route::get('/search', [SearchController::class, 'index'])->name('search');
    Route::get('/search/suggestions', [SearchController::class, 'suggestions'])->name('search.suggestions');
    Route::get('/search/quick', [SearchController::class, 'quickSearch'])->name('search.quick');
});

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // USG Admin Routes - accessible to USG Officers and System Admins
    Route::prefix('usg/admin')->name('usg.admin.')->group(function () {
        // Dashboard - accessible to all USG members
        Route::middleware(['role:usg-officer|usg-admin|super-admin'])->group(function () {
            Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        });

        // Analytics - accessible to USG Admins and System Admins
        Route::middleware(['role:usg-admin|super-admin'])->group(function () {
            Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics');
            Route::get('/analytics/export/pdf', [AnalyticsController::class, 'exportPdf'])->name('analytics.export.pdf');
            Route::get('/analytics/export/excel', [AnalyticsController::class, 'exportExcel'])->name('analytics.export.excel');
        });

        // VMGO Management - restricted to USG Admins and System Admins
        Route::middleware(['role:usg-admin|super-admin'])->group(function () {
            Route::get('/vmgo/edit', [VMGOController::class, 'edit'])->name('vmgo.edit');
            Route::patch('/vmgo', [VMGOController::class, 'update'])->name('vmgo.update');
            Route::get('/vmgo/history', [VMGOController::class, 'history'])->name('vmgo.history');
        });

        // Officer Management - restricted to USG Admins and System Admins
        Route::middleware(['role:usg-admin|super-admin'])->group(function () {
            Route::resource('officers', OfficerController::class)->except(['show']);
            Route::post('officers/reorder', [OfficerController::class, 'reorder'])->name('officers.reorder');
            Route::patch('officers/{officer}/toggle-active', [OfficerController::class, 'toggleActive'])->name('officers.toggle-active');
        });

        // Announcement Management
        Route::middleware(['role:usg-officer|usg-admin|super-admin'])->group(function () {
            Route::resource('announcements', AnnouncementController::class);
            Route::get('announcements/{announcement:slug}/preview', [AnnouncementController::class, 'preview'])->name('announcements.preview');
            Route::patch('announcements/{announcement}/publish', [AnnouncementController::class, 'publish'])->name('announcements.publish');
            Route::patch('announcements/{announcement}/unpublish', [AnnouncementController::class, 'unpublish'])->name('announcements.unpublish');
            Route::patch('announcements/{announcement}/archive', [AnnouncementController::class, 'archive'])->name('announcements.archive');
        });

        // Event Management
        Route::middleware(['role:usg-officer|usg-admin|super-admin'])->group(function () {
            Route::resource('events', EventController::class);
            Route::patch('events/{event}/publish', [EventController::class, 'publish'])->name('events.publish');
            Route::patch('events/{event}/cancel', [EventController::class, 'cancel'])->name('events.cancel');
            Route::patch('events/{event}/archive', [EventController::class, 'archive'])->name('events.archive');
        });

        // Resolution Management
        Route::middleware(['role:usg-officer|usg-admin|super-admin'])->group(function () {
            Route::resource('resolutions', ResolutionController::class);
            Route::patch('resolutions/{resolution}/archive', [ResolutionController::class, 'archive'])->name('resolutions.archive');
            Route::patch('resolutions/{resolution}/unarchive', [ResolutionController::class, 'unarchive'])->name('resolutions.unarchive');
        });

        // Document Management - restricted to USG Admins and System Admins
        Route::middleware(['role:usg-admin|super-admin'])->group(function () {
            Route::resource('documents', DocumentController::class);
            Route::get('documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');
        });

        // Transparency Report Management - restricted to USG Admins and System Admins
        Route::middleware(['role:usg-admin|super-admin'])->group(function () {
            Route::resource('transparency', TransparencyReportController::class)->parameters([
                'transparency' => 'transparencyReport',
            ]);
            Route::get('transparency/{transparencyReport}/download', [TransparencyReportController::class, 'download'])->name('transparency.download');
            Route::patch('transparency/{transparencyReport}/publish', [TransparencyReportController::class, 'publish'])->name('transparency.publish');
            Route::patch('transparency/{transparencyReport}/unpublish', [TransparencyReportController::class, 'unpublish'])->name('transparency.unpublish');
        });
    });
});
