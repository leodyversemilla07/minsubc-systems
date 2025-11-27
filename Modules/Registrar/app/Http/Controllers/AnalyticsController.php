<?php

namespace Modules\Registrar\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Registrar\Services\AnalyticsService;

class AnalyticsController extends Controller
{
    public function __construct(
        protected AnalyticsService $analyticsService
    ) {}

    /**
     * Display analytics dashboard.
     */
    public function index(Request $request): InertiaResponse
    {
        $period = $request->get('period', '30days');

        $stats = $this->analyticsService->getDashboardStats($period);
        $revenueStats = $this->analyticsService->getRevenueStats($period);

        return inertia('registrar/analytics/index', [
            'stats' => $stats,
            'revenueStats' => $revenueStats,
            'period' => $period,
        ]);
    }

    /**
     * Get analytics data as JSON (for AJAX requests).
     */
    public function getData(Request $request)
    {
        $period = $request->get('period', '30days');

        return response()->json([
            'stats' => $this->analyticsService->getDashboardStats($period),
            'revenueStats' => $this->analyticsService->getRevenueStats($period),
        ]);
    }
}
