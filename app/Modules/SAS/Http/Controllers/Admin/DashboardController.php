<?php

namespace App\Modules\SAS\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\SAS\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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

        return Inertia::render('SAS/admin/dashboard', [
            'dashboardData' => $dashboardData,
        ]);
    }

    /**
     * Get statistics data for charts and reports.
     */
    public function statistics(Request $request)
    {
        $year = $request->input('year', now()->year);

        return response()->json([
            'monthly_activities' => $this->dashboardService->getMonthlyActivityStatistics($year),
            'scholarship_distribution' => $this->dashboardService->getScholarshipDistribution(),
        ]);
    }
}
