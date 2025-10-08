<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = Auth::user();

        // Get stats for the user
        $stats = [
            'total_requests' => 0,
            'pending_payment' => 0,
            'processing' => 0,
            'ready_for_pickup' => 0,
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
                'ready_for_pickup' => (clone $studentRequests)->where('status', 'ready_for_pickup')->count(),
                'completed' => (clone $studentRequests)->whereIn('status', ['released'])->count(),
            ];

            $recentRequests = $studentRequests->latest()->take(5)->get([
                'id', 'request_number', 'document_type', 'status', 'created_at', 'amount',
            ]);
        }

        return Inertia::render('dashboard', [
            'user' => $user->only(['first_name', 'last_name', 'email']) + [
                'student' => $user->student?->only(['student_id', 'course', 'year_level']),
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
