<?php

namespace Modules\SAS\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\SAS\Services\DashboardService;

class DashboardController extends Controller
{
    public function __construct(
        protected DashboardService $dashboardService
    ) {}

    /**
     * Display the SAS admin dashboard.
     */
    public function index(): Response
    {
        $dashboardData = $this->dashboardService->getAdminDashboardData();

        // Transform data to match frontend expectations
        $statistics = [
            'scholarships' => [
                'total' => $dashboardData['scholarships']['total'] ?? 0,
                'active' => $dashboardData['scholarships']['active_recipients'] ?? 0,
                'expiring_soon' => $dashboardData['scholarships']['expiring_soon'] ?? 0,
                'total_amount' => $dashboardData['scholarships']['total_disbursed'] ?? 0,
            ],
            'insurance' => [
                'total' => $dashboardData['insurance']['total'] ?? 0,
                'pending_review' => $dashboardData['insurance']['pending'] ?? 0,
                'expiring_soon' => $dashboardData['insurance']['expiring_soon'] ?? 0,
                'approved' => $dashboardData['insurance']['active'] ?? 0,
            ],
            'organizations' => [
                'total' => $dashboardData['organizations']['total'] ?? 0,
                'major' => $dashboardData['organizations']['major'] ?? 0,
                'minor' => $dashboardData['organizations']['minor'] ?? 0,
                'active' => $dashboardData['organizations']['active'] ?? 0,
            ],
            'activities' => [
                'total' => $dashboardData['activities']['total'] ?? 0,
                'upcoming' => $dashboardData['activities']['upcoming'] ?? 0,
                'this_month' => $dashboardData['activities']['this_month'] ?? 0,
                'completed' => $dashboardData['activities']['completed'] ?? 0,
            ],
            'documents' => [
                'total' => $dashboardData['documents']['total'] ?? 0,
                'pending_disposal' => $dashboardData['documents']['pending_disposal'] ?? 0,
                'total_size' => $this->formatFileSize($dashboardData['documents']['total_size'] ?? 0),
            ],
        ];

        // Transform recent activities
        $recentActivities = collect($dashboardData['recent_activities'] ?? [])->map(function ($activity) {
            return [
                'id' => $activity->id,
                'type' => 'activity',
                'title' => $activity->title ?? $activity->activity_name ?? 'Activity',
                'description' => $activity->description ?? '',
                'created_at' => $activity->created_at->diffForHumans(),
                'user' => [
                    'name' => 'SAS System',
                ],
            ];
        })->toArray();

        // Generate pending tasks from the data
        $pendingTasks = [];

        if (($dashboardData['insurance']['pending'] ?? 0) > 0) {
            $pendingTasks[] = [
                'id' => 1,
                'type' => 'insurance',
                'title' => ($dashboardData['insurance']['pending'] ?? 0).' Insurance Applications Pending Review',
                'priority' => 'high',
                'action_url' => route('sas.admin.insurance.index'),
            ];
        }

        if (($dashboardData['documents']['pending_disposal'] ?? 0) > 0) {
            $pendingTasks[] = [
                'id' => 2,
                'type' => 'document',
                'title' => ($dashboardData['documents']['pending_disposal'] ?? 0).' Documents Pending Disposal Approval',
                'priority' => 'medium',
                'action_url' => route('sas.admin.documents.manage-disposal'),
            ];
        }

        return Inertia::render('sas/admin/dashboard', [
            'statistics' => $statistics,
            'recentActivities' => $recentActivities,
            'pendingTasks' => $pendingTasks,
        ]);
    }

    /**
     * Format file size to human readable format.
     */
    private function formatFileSize(int $bytes): string
    {
        if ($bytes >= 1073741824) {
            return number_format($bytes / 1073741824, 2).' GB';
        } elseif ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2).' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2).' KB';
        } else {
            return $bytes.' B';
        }
    }

    /**
     * Get statistics data for charts and reports.
     */
    public function statistics(Request $request)
    {
        $year = $request->input('year', now()->year);
        $dashboardData = $this->dashboardService->getAdminDashboardData();

        return response()->json([
            'scholarships' => $dashboardData['scholarships'],
            'insurance' => $dashboardData['insurance'],
            'organizations' => $dashboardData['organizations'],
            'activities' => $dashboardData['activities'],
            'monthly_activities' => $this->dashboardService->getMonthlyActivityStatistics($year),
            'scholarship_distribution' => $this->dashboardService->getScholarshipDistribution(),
        ]);
    }
}
