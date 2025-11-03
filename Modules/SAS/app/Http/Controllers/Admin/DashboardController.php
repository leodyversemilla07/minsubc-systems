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

        return Inertia::render('sas/admin/dashboard', [
            'dashboardData' => $dashboardData,
        ]);
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
