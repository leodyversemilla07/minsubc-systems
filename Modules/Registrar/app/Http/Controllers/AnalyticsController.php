<?php

namespace Modules\Registrar\Http\Controllers;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\Registrar\Services\AnalyticsService;
use Modules\Registrar\Services\ReceiptService;
use Symfony\Component\HttpFoundation\Response;

class AnalyticsController extends Controller
{
    public function __construct(
        protected AnalyticsService $analyticsService,
        protected ReceiptService $receiptService
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

    /**
     * Generate daily collection report PDF.
     */
    public function dailyCollectionReport(Request $request): Response
    {
        $date = $request->get('date', now()->format('Y-m-d'));

        return $this->receiptService->generateDailyCollectionReport($date);
    }

    /**
     * Export analytics report as PDF.
     */
    public function exportPdf(Request $request): Response
    {
        $period = $request->get('period', '30days');
        $stats = $this->analyticsService->getDashboardStats($period);
        $revenueStats = $this->analyticsService->getRevenueStats($period);

        $pdf = Pdf::loadView('registrar::analytics.export', [
            'period' => $period,
            'stats' => $stats,
            'revenueStats' => $revenueStats,
            'generatedAt' => now()->format('Y-m-d H:i:s'),
        ]);

        return $pdf->download("registrar-analytics-report-{$period}-".now()->format('Y-m-d').'.pdf');
    }

    /**
     * Export analytics report as Excel.
     */
    public function exportExcel(Request $request)
    {
        $period = $request->get('period', '30days');
        $stats = $this->analyticsService->getDashboardStats($period);
        $revenueStats = $this->analyticsService->getRevenueStats($period);

        return response()->json([
            'period' => $period,
            'stats' => $stats,
            'revenueStats' => $revenueStats,
            'exportedAt' => now()->toIso8601String(),
        ]);
    }
}
