<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GlobalSearchController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SuperAdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// USG Public Routes (Clean URLs for welcome page)
Route::redirect('/vmgo', '/usg/vmgo');
Route::redirect('/officers', '/usg/officers');
Route::redirect('/announcements', '/usg/announcements');
Route::redirect('/events', '/usg/events');
Route::redirect('/resolutions', '/usg/resolutions');
Route::redirect('/transparency', '/usg/transparency');

Route::middleware(['auth', 'verified'])->get('dashboard', DashboardController::class)->name('dashboard');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Super Admin Routes
Route::middleware(['auth', 'verified', 'permission:super_admin_access'])->prefix('super-admin')->name('super-admin.')->group(function () {
    Route::get('/dashboard', [SuperAdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/analytics', [SuperAdminController::class, 'analytics'])->name('analytics');
    Route::get('/users', [SuperAdminController::class, 'users'])->name('users');
    Route::get('/users/{user}', [SuperAdminController::class, 'showUser'])->name('users.show');
    Route::patch('/users/{user}/roles', [SuperAdminController::class, 'updateUserRoles'])->name('users.update-roles');
    Route::patch('/users/{user}/reset-password', [SuperAdminController::class, 'resetUserPassword'])->name('users.reset-password');
    Route::patch('/users/{user}/disable', [SuperAdminController::class, 'disableUser'])->name('users.disable');
    Route::patch('/users/{user}/enable', [SuperAdminController::class, 'enableUser'])->name('users.enable');
    Route::get('/system-settings', [SuperAdminController::class, 'systemSettings'])->name('system-settings');
    Route::patch('/system-settings/{systemSetting}', [SuperAdminController::class, 'updateSystemSetting'])->name('system-settings.update');
    Route::get('/audit-logs', [SuperAdminController::class, 'auditLogs'])->name('audit-logs');
    Route::get('/audit-logs/{auditLog}', [SuperAdminController::class, 'showAuditLog'])->name('audit-logs.show');
    Route::get('/reports', [SuperAdminController::class, 'reports'])->name('reports');
    Route::get('/system-config', [SuperAdminController::class, 'systemConfig'])->name('system-config');
});

// Notification Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/api/notifications/unread-count', [NotificationController::class, 'unreadCount'])->name('notifications.unread-count');
    Route::get('/api/notifications/recent', [NotificationController::class, 'recent'])->name('notifications.recent');
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-as-read');
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-as-read');
});

// Module routes are loaded by their enabled module service providers.
// See Modules/*/app/Providers/RouteServiceProvider.php.

// Global Search
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/api/search', [GlobalSearchController::class, 'search']);
});
