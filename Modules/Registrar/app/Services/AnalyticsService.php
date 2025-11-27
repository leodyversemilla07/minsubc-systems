<?php

namespace Modules\Registrar\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\Registrar\Models\DocumentRequest;

class AnalyticsService
{
    /**
     * Get comprehensive dashboard statistics.
     */
    public function getDashboardStats(string $period = '30days'): array
    {
        $startDate = $this->getStartDate($period);

        return [
            'total_requests' => $this->getTotalRequests($startDate),
            'requests_by_type' => $this->getRequestsByType($startDate),
            'requests_by_status' => $this->getRequestsByStatus($startDate),
            'revenue_by_type' => $this->getRevenueByType($startDate),
            'average_processing_time' => $this->getAverageProcessingTime($startDate),
            'request_trends' => $this->getRequestTrends($startDate),
            'revenue_trends' => $this->getRevenueTrends($startDate),
            'top_requested_documents' => $this->getTopRequestedDocuments($startDate, 5),
            'completion_rate' => $this->getCompletionRate($startDate),
        ];
    }

    /**
     * Get total requests count.
     */
    protected function getTotalRequests(Carbon $startDate): int
    {
        return DocumentRequest::where('created_at', '>=', $startDate)->count();
    }

    /**
     * Get requests grouped by document type.
     */
    protected function getRequestsByType(Carbon $startDate): array
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->select('document_type', DB::raw('COUNT(*) as count'))
            ->groupBy('document_type')
            ->pluck('count', 'document_type')
            ->toArray();
    }

    /**
     * Get requests grouped by status.
     */
    protected function getRequestsByStatus(Carbon $startDate): array
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();
    }

    /**
     * Get revenue grouped by document type.
     */
    protected function getRevenueByType(Carbon $startDate): array
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('payment_amount')
            ->where('payment_status', 'paid')
            ->select('document_type', DB::raw('SUM(payment_amount) as total'))
            ->groupBy('document_type')
            ->pluck('total', 'document_type')
            ->map(fn ($value) => (float) $value)
            ->toArray();
    }

    /**
     * Get average processing time in hours.
     */
    protected function getAverageProcessingTime(Carbon $startDate): float
    {
        $result = DocumentRequest::query()
            ->where('status', 'released')
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('released_at')
            ->selectRaw('AVG(TIMESTAMPDIFF(HOUR, created_at, released_at)) as avg_hours')
            ->value('avg_hours');

        return $result ? round((float) $result, 2) : 0.0;
    }

    /**
     * Get request trends over time (daily).
     */
    protected function getRequestTrends(Carbon $startDate): array
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('count', 'date')
            ->toArray();
    }

    /**
     * Get revenue trends over time (daily).
     */
    protected function getRevenueTrends(Carbon $startDate): array
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('payment_amount')
            ->where('payment_status', 'paid')
            ->selectRaw('DATE(created_at) as date, SUM(payment_amount) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('total', 'date')
            ->map(fn ($value) => (float) $value)
            ->toArray();
    }

    /**
     * Get top requested documents.
     */
    protected function getTopRequestedDocuments(Carbon $startDate, int $limit = 5): array
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->select('document_type', DB::raw('COUNT(*) as count'))
            ->groupBy('document_type')
            ->orderByDesc('count')
            ->limit($limit)
            ->pluck('count', 'document_type')
            ->toArray();
    }

    /**
     * Get completion rate percentage.
     */
    protected function getCompletionRate(Carbon $startDate): float
    {
        $total = DocumentRequest::where('created_at', '>=', $startDate)->count();

        if ($total === 0) {
            return 0.0;
        }

        $completed = DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->where('status', 'released')
            ->count();

        return round(($completed / $total) * 100, 2);
    }

    /**
     * Get start date based on period.
     */
    protected function getStartDate(string $period): Carbon
    {
        return match ($period) {
            '7days' => now()->subDays(7),
            '30days' => now()->subDays(30),
            '90days' => now()->subDays(90),
            'year' => now()->subYear(),
            'all' => Carbon::parse('2000-01-01'),
            default => now()->subDays(30),
        };
    }

    /**
     * Get revenue statistics.
     */
    public function getRevenueStats(string $period = '30days'): array
    {
        $startDate = $this->getStartDate($period);

        $totalRevenue = DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->where('payment_status', 'paid')
            ->sum('payment_amount');

        $pendingRevenue = DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->where('payment_status', 'pending')
            ->sum('payment_amount');

        return [
            'total_revenue' => (float) $totalRevenue,
            'pending_revenue' => (float) $pendingRevenue,
            'paid_requests' => DocumentRequest::where('created_at', '>=', $startDate)
                ->where('payment_status', 'paid')
                ->count(),
            'pending_payments' => DocumentRequest::where('created_at', '>=', $startDate)
                ->where('payment_status', 'pending')
                ->count(),
        ];
    }
}
