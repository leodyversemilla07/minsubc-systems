<?php

namespace Modules\SAS\Services;

use Modules\SAS\Models\DigitalizedDocument;
use Modules\SAS\Models\Organization;
use Modules\SAS\Models\OrganizationOfficer;
use Modules\SAS\Models\SASActivity;
use Modules\SAS\Models\Scholarship;
use Modules\SAS\Models\ScholarshipRecipient;

class DashboardService
{
    /**
     * Get admin dashboard data.
     */
    public function getAdminDashboardData(): array
    {
        return [
            'scholarships' => $this->getScholarshipSummary(),
            'insurance' => $this->getInsuranceSummary(),
            'organizations' => $this->getOrganizationSummary(),
            'activities' => $this->getActivitySummary(),
            'documents' => $this->getDocumentSummary(),
            'recent_activities' => $this->getRecentActivities(),
            'upcoming_events' => $this->getUpcomingEvents(),
        ];
    }

    /**
     * Get student dashboard data.
     */
    public function getStudentDashboardData(int $studentId): array
    {
        return [
            'scholarships' => ScholarshipRecipient::where('student_id', $studentId)
                ->with('scholarship')
                ->orderBy('date_awarded', 'desc')
                ->limit(5)
                ->get(),
            'insurance' => \Modules\SAS\Models\Insurance::where('student_id', $studentId)
                ->orderBy('effective_date', 'desc')
                ->limit(5)
                ->get(),
            'organizations' => OrganizationOfficer::where('student_id', $studentId)
                ->where('is_current', true)
                ->with('organization')
                ->get(),
            'upcoming_activities' => SASActivity::where('start_date', '>=', now())
                ->where('status', 'Scheduled')
                ->orderBy('start_date')
                ->limit(5)
                ->get(),
        ];
    }

    /**
     * Get scholarship summary statistics.
     */
    protected function getScholarshipSummary(): array
    {
        return [
            'total' => Scholarship::count(),
            'active' => Scholarship::where('is_active', true)->count(),
            'recipients' => ScholarshipRecipient::count(),
            'active_recipients' => ScholarshipRecipient::where('status', 'Active')->count(),
            'total_disbursed' => ScholarshipRecipient::sum('amount'),
        ];
    }

    /**
     * Get insurance summary statistics.
     */
    protected function getInsuranceSummary(): array
    {
        $insuranceModel = 'Modules\SAS\Models\Insurance';

        if (! class_exists($insuranceModel)) {
            return [
                'total' => 0,
                'active' => 0,
                'pending' => 0,
                'expiring_soon' => 0,
            ];
        }

        return [
            'total' => $insuranceModel::count(),
            'active' => $insuranceModel::where('status', 'Approved')->count(),
            'pending' => $insuranceModel::where('status', 'Pending Review')->count(),
            'expiring_soon' => $insuranceModel::where('status', 'Approved')
                ->whereBetween('expiration_date', [now(), now()->addDays(30)])
                ->count(),
        ];
    }

    /**
     * Get organization summary statistics.
     */
    protected function getOrganizationSummary(): array
    {
        return [
            'total' => Organization::count(),
            'active' => Organization::where('status', 'Active')->count(),
            'major' => Organization::where('organization_type', 'Major')->count(),
            'minor' => Organization::where('organization_type', 'Minor')->count(),
            'total_officers' => OrganizationOfficer::where('is_current', true)->count(),
        ];
    }

    /**
     * Get activity summary statistics.
     */
    protected function getActivitySummary(): array
    {
        return [
            'total' => SASActivity::count(),
            'scheduled' => SASActivity::where('status', 'Scheduled')->count(),
            'ongoing' => SASActivity::where('status', 'Ongoing')->count(),
            'completed' => SASActivity::where('status', 'Completed')->count(),
            'upcoming' => SASActivity::where('start_date', '>=', now())
                ->where('status', 'Scheduled')
                ->count(),
            'this_month' => SASActivity::whereYear('start_date', now()->year)
                ->whereMonth('start_date', now()->month)
                ->count(),
        ];
    }

    /**
     * Get document summary statistics.
     */
    protected function getDocumentSummary(): array
    {
        return [
            'total' => DigitalizedDocument::count(),
            'this_month' => DigitalizedDocument::whereYear('created_at', now()->year)
                ->whereMonth('created_at', now()->month)
                ->count(),
            'pending_disposal' => DigitalizedDocument::where('disposal_status', 'Pending Disposal Approval')->count(),
            'total_size' => DigitalizedDocument::sum('file_size'),
        ];
    }

    /**
     * Get recent activities.
     */
    protected function getRecentActivities(int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return SASActivity::with('organization')
            ->orderBy('start_date', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get upcoming events.
     */
    protected function getUpcomingEvents(int $limit = 5): \Illuminate\Database\Eloquent\Collection
    {
        return SASActivity::with('organization')
            ->where('start_date', '>=', now())
            ->where('status', 'Scheduled')
            ->orderBy('start_date')
            ->limit($limit)
            ->get();
    }

    /**
     * Get monthly activity statistics for charts.
     */
    public function getMonthlyActivityStatistics(int $year): array
    {
        $months = [];

        for ($month = 1; $month <= 12; $month++) {
            $months[] = [
                'month' => date('F', mktime(0, 0, 0, $month, 1)),
                'count' => SASActivity::whereYear('start_date', $year)
                    ->whereMonth('start_date', $month)
                    ->count(),
            ];
        }

        return $months;
    }

    /**
     * Get scholarship distribution by type.
     */
    public function getScholarshipDistribution(): array
    {
        return Scholarship::selectRaw('scholarship_type, COUNT(*) as count')
            ->groupBy('scholarship_type')
            ->get()
            ->map(function ($item) {
                return [
                    'type' => $item->scholarship_type,
                    'count' => $item->count,
                ];
            })
            ->toArray();
    }
}
