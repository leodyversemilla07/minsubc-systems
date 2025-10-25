<?php

use Illuminate\Support\Facades\Auth;
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();
        $userRoles = $user->roles->pluck('name')->toArray();

        // Redirect USG admins and officers to USG admin dashboard
        if (array_intersect($userRoles, ['usg-admin', 'usg-officer'])) {
            return redirect()->route('usg.admin.dashboard');
        }

        // Redirect super admin to super admin dashboard
        if (in_array('super_admin', $userRoles)) {
            return redirect()->route('super-admin.dashboard');
        }

        // Redirect registrar staff and admins to registrar admin dashboard
        if (array_intersect($userRoles, ['registrar-admin', 'registrar-staff'])) {
            return redirect()->route('registrar.admin.dashboard');
        }

        // Get stats for the user
        $stats = [
            'total_requests' => 0,
            'pending_payment' => 0,
            'processing' => 0,
            'ready_for_claim' => 0,
            'completed' => 0,
        ];

        $recentRequests = collect();

        if ($user->student) {
            // Student stats
            $studentRequests = \App\Modules\Registrar\Models\DocumentRequest::where('student_id', $user->student->student_id);

            $stats = [
                'total_requests' => $studentRequests->count(),
                'pending_payment' => (clone $studentRequests)->where('status', 'pending_payment')->count(),
                'processing' => (clone $studentRequests)->whereIn('status', ['paid', 'processing'])->count(),
                'ready_for_claim' => (clone $studentRequests)->whereIn('status', ['ready_for_claim', 'claimed'])->count(),
                'completed' => (clone $studentRequests)->whereIn('status', ['released'])->count(),
            ];

            $recentRequests = $studentRequests->latest()->take(5)->get([
                'id',
                'request_number',
                'document_type',
                'status',
                'created_at',
                'amount',
            ]);
        }

        return Inertia::render('dashboard', [
            'user' => [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'student' => $user->student ? [
                    'student_id' => $user->student->student_id,
                    'course' => $user->student->course,
                    'year_level' => $user->student->year_level,
                ] : null,
            ],
            'stats' => $stats,
            'recent_requests' => $recentRequests,
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Super Admin Routes
Route::middleware(['auth', 'verified', 'permission:super_admin_access'])->prefix('super-admin')->name('super-admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\SuperAdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/users', [App\Http\Controllers\SuperAdminController::class, 'users'])->name('users');
    Route::get('/users/{user}', [App\Http\Controllers\SuperAdminController::class, 'showUser'])->name('users.show');
    Route::patch('/users/{user}/roles', [App\Http\Controllers\SuperAdminController::class, 'updateUserRoles'])->name('users.update-roles');
    Route::patch('/users/{user}/reset-password', [App\Http\Controllers\SuperAdminController::class, 'resetUserPassword'])->name('users.reset-password');
    Route::patch('/users/{user}/disable', [App\Http\Controllers\SuperAdminController::class, 'disableUser'])->name('users.disable');
    Route::patch('/users/{user}/enable', [App\Http\Controllers\SuperAdminController::class, 'enableUser'])->name('users.enable');
    Route::get('/system-settings', [App\Http\Controllers\SuperAdminController::class, 'systemSettings'])->name('system-settings');
    Route::patch('/system-settings/{systemSetting}', [App\Http\Controllers\SuperAdminController::class, 'updateSystemSetting'])->name('system-settings.update');
    Route::get('/audit-logs', [App\Http\Controllers\SuperAdminController::class, 'auditLogs'])->name('audit-logs');
    Route::get('/audit-logs/{auditLog}', [App\Http\Controllers\SuperAdminController::class, 'showAuditLog'])->name('audit-logs.show');
    Route::get('/reports', [App\Http\Controllers\SuperAdminController::class, 'reports'])->name('reports');
    Route::get('/system-config', [App\Http\Controllers\SuperAdminController::class, 'systemConfig'])->name('system-config');
});

// Registrar Module Routes
require __DIR__.'/../app/Modules/Registrar/routes.php';

// USG Module Routes
require __DIR__.'/../app/Modules/USG/routes.php';

// SAS Module Routes
require __DIR__.'/../app/Modules/SAS/routes.php';
