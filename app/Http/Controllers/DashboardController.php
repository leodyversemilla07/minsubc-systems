<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\EnrollmentFee;
use Modules\Registrar\Models\DocumentRequest;
use Modules\SAS\Models\Insurance;
use Modules\SAS\Models\OrganizationMember;
use Modules\SAS\Models\ScholarshipRecipient;
use Modules\USG\Models\Announcement;
use Modules\USG\Models\Event;
use Modules\USG\Models\Resolution;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Voter;
use Symfony\Component\HttpFoundation\RedirectResponse;

class DashboardController extends Controller
{
    /**
     * Show the role-aware dashboard.
     *
     * Staff roles are redirected to their module dashboards, while any other
     * authenticated user receives the aggregated student dashboard.
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
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

        // Redirect admission admins and staff to admission admin dashboard
        if (array_intersect($userRoles, ['admission-admin', 'admission-staff'])) {
            return redirect()->route('admission.admin.dashboard');
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
            $scholarshipRecipients = ScholarshipRecipient::with(['scholarship', 'requirements'])
                ->where('student_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();

            $sasStats = [
                'active_scholarships' => $scholarshipRecipients->where('status', 'Active')->count(),
                'total_scholarships' => $scholarshipRecipients->count(),
                'insurance_status' => Insurance::where('student_id', $user->id)
                    ->orderBy('created_at', 'desc')
                    ->value('status') ?? 'None',
                'organizations_joined' => OrganizationMember::where('student_id', $user->id)
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
            $orgMemberships = OrganizationMember::with('organization')
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
            $insurance = Insurance::where('student_id', $user->id)
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
        $recentAnnouncements = Announcement::published()
            ->orderBy('publish_date', 'desc')
            ->take(5)
            ->get(['id', 'title', 'slug', 'category', 'publish_date']);

        $upcomingEvents = Event::published()
            ->upcoming()
            ->orderBy('start_date')
            ->take(5)
            ->get(['id', 'title', 'slug', 'start_date', 'location']);

        $usgStats = [
            'recent_announcements' => $recentAnnouncements->count(),
            'upcoming_events' => $upcomingEvents->count(),
            'new_resolutions' => Resolution::where('created_at', '>=', now()->subDays(30))->count(),
        ];

        // Voting Stats
        $votingStats = [
            'active_election' => false,
            'election_name' => null,
            'has_voted' => false,
            'can_vote' => false,
        ];

        // Check for active elections if VotingSystem module exists
        if (class_exists(Election::class)) {
            $activeElection = Election::where('status', true)
                ->where(function ($query) {
                    $query->whereNull('end_time')
                        ->orWhere('end_time', '>', now());
                })
                ->first();

            if ($activeElection) {
                // Check if user is a voter and has voted
                $voter = Voter::where('election_id', $activeElection->id)
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

        // Admission Enrollment
        $currentEnrollment = null;
        $pendingNotification = null;
        if (class_exists(Enrollment::class)) {
            $enrollment = Enrollment::where('user_id', $user->id)
                ->whereIn('status', ['confirmed', 'enrolled'])
                ->with(['section', 'subjects.subject', 'payments'])
                ->orderBy('created_at', 'desc')
                ->first();

            if ($enrollment) {
                $totalUnits = $enrollment->subjects->sum(fn ($es) => $es->subject?->units ?? 0);
                $totalPaid = $enrollment->payments->where('status', 'verified')->sum('amount');
                $totalFees = $enrollment->subjects->count() > 0
                    ? EnrollmentFee::where('academic_term_id', $enrollment->academic_term_id)
                        ->active()
                        ->get()
                        ->sum(fn ($fee) => $fee->calculateAmount($totalUnits, $enrollment->subjects->count()))
                    : 0;

                $currentEnrollment = [
                    'id' => $enrollment->id,
                    'academic_year' => $enrollment->academic_year,
                    'semester' => $enrollment->semester,
                    'year_level' => (string) $enrollment->year_level,
                    'status' => $enrollment->status,
                    'section_name' => $enrollment->section?->name ?? 'Not Assigned',
                    'student_id' => $enrollment->student_id,
                    'total_subjects' => $enrollment->subjects->count(),
                    'total_units' => $totalUnits,
                    'balance' => max(0, $totalFees - $totalPaid),
                    'gpa' => $enrollment->gpa,
                ];

                // Check for pending payment notifications
                $pendingCount = $enrollment->payments->where('status', 'pending')->count();
                if ($pendingCount > 0) {
                    $pendingNotification = [
                        'count' => $pendingCount,
                        'message' => "You have {$pendingCount} payment(s) awaiting verification.",
                    ];
                }
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
            'currentEnrollment' => $currentEnrollment ?? null,
            'hasPendingNotification' => ! empty($pendingNotification),
        ]);
    }
}
