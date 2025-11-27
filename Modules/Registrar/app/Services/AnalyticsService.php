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
            'pending_requests' => $this->getPendingRequests($startDate),
            'processing_requests' => $this->getProcessingRequests($startDate),
            'completed_requests' => $this->getCompletedRequests($startDate),
            'total_revenue' => $this->getTotalRevenue($startDate),
            'average_processing_time' => $this->getAverageProcessingTime($startDate),
            'requests_by_type' => $this->getRequestsByType($startDate),
            'requests_by_status' => $this->getRequestsByStatus($startDate),
            'revenue_by_type' => $this->getRevenueByType($startDate),
            'request_trends' => $this->getRequestTrends($startDate),
            'revenue_trends' => $this->getRevenueTrends($startDate),
            'top_requested_documents' => $this->getTopRequestedDocuments(5, $startDate),
            'completion_rate' => $this->getCompletionRate($startDate),
        ];
    }

    protected function getPendingRequests(Carbon $startDate): int
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->where('status', 'pending_payment')
            ->count();
    }

    protected function getProcessingRequests(Carbon $startDate): int
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->where('status', 'processing')
            ->count();
    }

    protected function getCompletedRequests(Carbon $startDate): int
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->where('status', 'claimed')
            ->count();
    }

    protected function getTotalRevenue(Carbon $startDate): float
    {
        return (float) DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->sum('amount');
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
    public function getRequestsByType(?Carbon $startDate = null): \Illuminate\Support\Collection
    {
        $startDate = $startDate ?? now()->subDays(30);

        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->select('document_type', DB::raw('COUNT(*) as count'))
            ->groupBy('document_type')
            ->get();
    }

    /**
     * Get requests grouped by status.
     */
    public function getRequestsByStatus(?Carbon $startDate = null): \Illuminate\Support\Collection
    {
        $startDate = $startDate ?? now()->subDays(30);

        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();
    }

    /**
     * Get revenue grouped by document type.
     */
    public function getRevenueByType(?Carbon $startDate = null): \Illuminate\Support\Collection
    {
        $startDate = $startDate ?? now()->subDays(30);

        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('amount')
            ->select('document_type', DB::raw('SUM(amount) as total_revenue'))
            ->groupBy('document_type')
            ->get();
    }

    /**
     * Get average processing time in hours.
     */
    public function getAverageProcessingTime(?Carbon $startDate = null): float
    {
        $startDate = $startDate ?? now()->subDays(30);

        // Use database-agnostic calculation: (released_at - created_at) in hours
        $result = DocumentRequest::query()
            ->where('status', 'released')
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('released_at')
            ->selectRaw('AVG((julianday(released_at) - julianday(created_at)) * 24) as avg_hours')
            ->value('avg_hours');

        return $result ? round((float) $result, 2) : 0.0;
    }

    /**
     * Get request trends over time (daily).
     */
    public function getRequestTrends(Carbon $startDate): \Illuminate\Support\Collection
    {
        $start = $startDate->copy()->startOfDay();
        $end = now()->startOfDay();
        $days = $start->diffInDays($end) + 1;

        return collect(range(0, $days - 1))->map(function (int $offset) use ($start): array {
            $date = $start->copy()->addDays($offset)->format('Y-m-d');
            $count = DocumentRequest::whereDate('created_at', $date)->count();

            return ['date' => $date, 'count' => $count];
        });
    }

    /**
     * Get revenue trends over time (daily).
     */
    public function getRevenueTrends(Carbon $startDate): \Illuminate\Support\Collection
    {
        $start = $startDate->copy()->startOfDay();
        $end = now()->startOfDay();
        $days = $start->diffInDays($end) + 1;

        return collect(range(0, $days - 1))->map(function (int $offset) use ($start): array {
            $date = $start->copy()->addDays($offset)->format('Y-m-d');
            $revenue = DocumentRequest::whereDate('created_at', $date)->sum('amount');

            return ['date' => $date, 'revenue' => (float) $revenue];
        });
    }

    /**
     * Get top requested documents.
     */
    public function getTopRequestedDocuments(int $limit = 5, ?Carbon $startDate = null): \Illuminate\Support\Collection
    {
        $startDate = $startDate ?? now()->subDays(30);

        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->selectRaw('document_type, COUNT(*) as count')
            ->groupBy('document_type')
            ->orderByDesc('count')
            ->limit($limit)
            ->get();
    }

    /**
     * Get completion rate percentage.
     */
    public function getCompletionRate(?Carbon $startDate = null): float
    {
        $startDate = $startDate ?? now()->subDays(30);
        $total = DocumentRequest::where('created_at', '>=', $startDate)->count();

        if ($total === 0) {
            return 0.0;
        }

        $completed = DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->where('status', 'claimed')
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
