<?php

use App\Http\Controllers\SuperAdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\Registrar\Models\DocumentRequest;

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
    Route::get('dashboard', function (Request $request) {
        $user = $request->user();
        $userRoles = $user->roles->pluck('name')->toArray();

        // Redirect USG admins and officers to USG admin dashboard
        if (array_intersect($userRoles, ['usg-admin', 'usg-officer'])) {
            return redirect()->route('usg.admin.dashboard');
        }

        // Redirect super admin to super admin dashboard
        if (in_array('super-admin', $userRoles)) {
            return redirect()->route('super-admin.dashboard');
        }

        // Redirect registrar staff and admins to registrar admin dashboard
        if (array_intersect($userRoles, ['registrar-admin', 'registrar-staff'])) {
            return redirect()->route('registrar.admin.dashboard');
        }

        // Redirect cashier to cashier dashboard
        if (in_array('cashier', $userRoles)) {
            return redirect()->route('registrar.cashier.dashboard');
        }

        // Redirect SAS staff and admins to SAS admin dashboard
        if (array_intersect($userRoles, ['sas-admin', 'sas-staff'])) {
            return redirect()->route('sas.admin.dashboard');
        }

        // Redirect voting admins and managers to voting admin dashboard
        if (array_intersect($userRoles, ['voting-admin', 'voting-manager'])) {
            return redirect()->route('voting.admin.dashboard');
        }

        // Get registrar stats for the user
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
            $studentRequests = DocumentRequest::where('student_id', $user->student->student_id);

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

        // SAS Stats
        $sasStats = [
            'active_scholarships' => 0,
            'total_scholarships' => 0,
            'insurance_status' => 'None',
            'organizations_joined' => 0,
        ];

        $scholarships = collect();
        $organizations = collect();
        $insuranceRecord = null;

        if ($user->id) {
            // Get scholarship recipients with details
            $scholarshipRecipients = \Modules\SAS\Models\ScholarshipRecipient::with(['scholarship', 'requirements'])
                ->where('student_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();

            $sasStats = [
                'active_scholarships' => $scholarshipRecipients->where('status', 'Active')->count(),
                'total_scholarships' => $scholarshipRecipients->count(),
                'insurance_status' => \Modules\SAS\Models\Insurance::where('student_id', $user->id)
                    ->orderBy('created_at', 'desc')
                    ->value('status') ?? 'None',
                'organizations_joined' => \Modules\SAS\Models\OrganizationMember::where('student_id', $user->id)
                    ->where('status', 'Active')
                    ->count(),
            ];

            // Get detailed scholarship info
            $scholarships = $scholarshipRecipients->map(function ($recipient) {
                $totalRequirements = $recipient->requirements->count();
                $completedRequirements = $recipient->requirements->where('status', 'Submitted')->count();

                return [
                    'id' => $recipient->id,
                    'name' => $recipient->scholarship->name ?? 'Unknown Scholarship',
                    'type' => $recipient->scholarship->scholarship_type ?? 'N/A',
                    'status' => $recipient->status,
                    'amount' => $recipient->amount,
                    'academic_year' => $recipient->academic_year,
                    'semester' => $recipient->semester,
                    'requirements_complete' => $recipient->requirements_complete,
                    'requirements_progress' => $totalRequirements > 0
                        ? round(($completedRequirements / $totalRequirements) * 100)
                        : 100,
                    'total_requirements' => $totalRequirements,
                    'completed_requirements' => $completedRequirements,
                    'expiration_date' => $recipient->expiration_date?->format('M d, Y'),
                ];
            });

            // Get organization memberships
            $orgMemberships = \Modules\SAS\Models\OrganizationMember::with('organization')
                ->where('student_id', $user->id)
                ->where('status', 'Active')
                ->get();

            $organizations = $orgMemberships->map(function ($membership) {
                return [
                    'id' => $membership->id,
                    'name' => $membership->organization->name ?? 'Unknown Organization',
                    'acronym' => $membership->organization->acronym ?? '',
                    'type' => $membership->organization->type ?? 'N/A',
                    'membership_date' => $membership->membership_date?->format('M d, Y'),
                    'status' => $membership->status,
                ];
            });

            // Get insurance record details
            $insurance = \Modules\SAS\Models\Insurance::where('student_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->first();

            if ($insurance) {
                $insuranceRecord = [
                    'id' => $insurance->id,
                    'status' => $insurance->status,
                    'academic_year' => $insurance->academic_year ?? 'N/A',
                    'semester' => $insurance->semester ?? 'N/A',
                    'amount' => $insurance->amount ?? 0,
                    'payment_status' => $insurance->payment_status ?? 'Unpaid',
                    'created_at' => $insurance->created_at?->format('M d, Y'),
                ];
            }
        }

        // USG Stats
        $recentAnnouncements = \Modules\USG\Models\Announcement::published()
            ->orderBy('publish_date', 'desc')
            ->take(5)
            ->get(['id', 'title', 'slug', 'category', 'publish_date']);

        $upcomingEvents = \Modules\USG\Models\Event::published()
            ->upcoming()
            ->orderBy('start_date')
            ->take(5)
            ->get(['id', 'title', 'slug', 'start_date', 'location']);

        $usgStats = [
            'recent_announcements' => $recentAnnouncements->count(),
            'upcoming_events' => $upcomingEvents->count(),
            'new_resolutions' => \Modules\USG\Models\Resolution::where('created_at', '>=', now()->subDays(30))->count(),
        ];

        // Voting Stats
        $votingStats = [
            'active_election' => false,
            'election_name' => null,
            'has_voted' => false,
            'can_vote' => false,
        ];

        // Check for active elections if VotingSystem module exists
        if (class_exists(\Modules\VotingSystem\Models\Election::class)) {
            $activeElection = \Modules\VotingSystem\Models\Election::where('status', true)
                ->where(function ($query) {
                    $query->whereNull('end_time')
                        ->orWhere('end_time', '>', now());
                })
                ->first();

            if ($activeElection) {
                // Check if user is a voter and has voted
                $voter = \Modules\VotingSystem\Models\Voter::where('election_id', $activeElection->id)
                    ->where('user_id', $user->id)
                    ->first();

                $votingStats = [
                    'active_election' => true,
                    'election_name' => $activeElection->name ?? 'Active Election',
                    'has_voted' => $voter ? $voter->has_voted : false,
                    'can_vote' => $voter !== null && ! $voter->has_voted,
                ];
            }
        }

        return Inertia::render('student/dashboard', [
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
            'sasStats' => $sasStats,
            'scholarships' => $scholarships,
            'organizations' => $organizations,
            'insuranceRecord' => $insuranceRecord,
            'usgStats' => $usgStats,
            'recentAnnouncements' => $recentAnnouncements,
            'upcomingEvents' => $upcomingEvents,
            'votingStats' => $votingStats,
        ]);
    })->name('dashboard');
});

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
    Route::get('/notifications', [App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/api/notifications/unread-count', [App\Http\Controllers\NotificationController::class, 'unreadCount'])->name('notifications.unread-count');
    Route::post('/notifications/{id}/read', [App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.mark-as-read');
    Route::post('/notifications/read-all', [App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-as-read');
});

// Module routes are auto-loaded via their Service Providers
// See Modules/*/app/Providers/*ServiceProvider.php
