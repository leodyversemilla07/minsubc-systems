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

        // Redirect USG admins, officers, and system admins to USG admin dashboard
        if (array_intersect($userRoles, ['usg-admin', 'usg-officer', 'system-admin'])) {
            return redirect()->route('usg.admin.dashboard');
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

// Registrar Module Routes
require __DIR__.'/../app/Modules/Registrar/routes.php';

// USG Module Routes
require __DIR__.'/../app/Modules/USG/routes.php';

// SAS Module Routes
require __DIR__.'/../app/Modules/SAS/routes.php';
