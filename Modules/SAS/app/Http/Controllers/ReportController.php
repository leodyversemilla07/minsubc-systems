<?php

namespace Modules\SAS\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Modules\SAS\Models\Scholarship;
use Modules\SAS\Services\InsuranceReportService;
use Modules\SAS\Services\ScholarshipReportService;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;

class ReportController extends Controller
{
    public function __construct(
        protected ScholarshipReportService $scholarshipReportService,
        protected InsuranceReportService $insuranceReportService
    ) {}

    /**
     * Display reports page.
     */
    public function index(): InertiaResponse
    {
        return inertia('sas/admin/reports/index', [
            'scholarships' => Scholarship::select('id', 'scholarship_name')->get(),
        ]);
    }

    /**
     * GET /sas/reports/scholarships/recipients.
     */
    public function scholarshipRecipients(Request $request): Response|BinaryFileResponse
    {
        $filters = $request->only(['scholarship_id', 'status', 'semester', 'academic_year', 'date_from', 'date_to']);

        if ($request->get('format') === 'excel') {
            return $this->scholarshipReportService->exportToExcel($filters);
        }

        return $this->scholarshipReportService->generateRecipientsReport($filters);
    }

    /**
     * GET /sas/reports/scholarships/approved/{semester}/{academicYear}.
     */
    public function approvedScholars(string $semester, string $academicYear): Response
    {
        return $this->scholarshipReportService->generateApprovedScholarsReport($semester, $academicYear);
    }

    /**
     * GET /sas/reports/scholarships/statistics/{academicYear}.
     */
    public function scholarshipStatistics(string $academicYear): Response
    {
        return $this->scholarshipReportService->generateStatisticsReport($academicYear);
    }

    /**
     * GET /sas/reports/insurance/records.
     */
    public function insuranceRecords(Request $request): Response|BinaryFileResponse
    {
        $filters = $request->only(['policy_type', 'status', 'insurance_provider', 'date_from', 'date_to']);

        if ($request->get('format') === 'excel') {
            return $this->insuranceReportService->exportToExcel($filters);
        }

        return $this->insuranceReportService->generateRecordsReport($filters);
    }

    /**
     * GET /sas/reports/insurance/statistics/{academicYear}.
     */
    public function insuranceStatistics(string $academicYear): Response
    {
        return $this->insuranceReportService->generateStatisticsReport($academicYear);
    }
}
