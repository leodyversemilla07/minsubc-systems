<?php

namespace Modules\SAS\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;
use Modules\SAS\Exports\ScholarshipRecipientsExport;
use Modules\SAS\Models\ScholarshipRecipient;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;

class ScholarshipReportService
{
    /**
     * Generate scholarship recipients report (PDF).
     */
    public function generateRecipientsReport(array $filters = []): Response
    {
        $recipients = $this->getFilteredRecipients($filters);

        $totalRecipients = $recipients->count();
        $totalActive = $recipients->where('status', 'Active')->count();
        $totalInactive = $recipients->where('status', 'Inactive')->count();
        $totalAmount = $recipients->sum('amount');
        $generatedAt = now()->format('F d, Y h:i A');

        $html = $this->generateRecipientsHtml($recipients, $filters, $totalRecipients, $totalActive, $totalInactive, $totalAmount, $generatedAt);

        return Pdf::loadHTML($html)
            ->setPaper('a4', 'landscape')
            ->stream('Scholarship-Recipients-'.now()->format('Y-m-d').'.pdf');
    }

    /**
     * Generate approved scholars report by semester.
     */
    public function generateApprovedScholarsReport(string $semester, string $academicYear): Response
    {
        $scholars = ScholarshipRecipient::query()
            ->where('status', 'Active')
            ->where('semester', $semester)
            ->where('academic_year', $academicYear)
            ->with(['student', 'scholarship'])
            ->orderBy('date_awarded')
            ->get();

        $groupedByType = $scholars->groupBy('scholarship.scholarship_name');
        $totalScholars = $scholars->count();
        $totalAmount = $scholars->sum('amount');
        $generatedAt = now()->format('F d, Y h:i A');

        $html = $this->generateApprovedScholarsHtml($groupedByType, $semester, $academicYear, $totalScholars, $totalAmount, $generatedAt);

        return Pdf::loadHTML($html)
            ->setPaper('a4', 'landscape')
            ->stream("Approved-Scholars-{$semester}-{$academicYear}.pdf");
    }

    /**
     * Export to Excel.
     */
    public function exportToExcel(array $filters = []): BinaryFileResponse
    {
        $filename = 'scholarship-recipients-'.now()->format('Y-m-d').'.xlsx';

        return Excel::download(
            new ScholarshipRecipientsExport($filters),
            $filename
        );
    }

    /**
     * Generate scholarship statistics report.
     */
    public function generateStatisticsReport(string $academicYear): Response
    {
        $stats = [
            'total_recipients' => ScholarshipRecipient::where('academic_year', $academicYear)->count(),
            'active' => ScholarshipRecipient::where('academic_year', $academicYear)->where('status', 'Active')->count(),
            'inactive' => ScholarshipRecipient::where('academic_year', $academicYear)->where('status', 'Inactive')->count(),
            'total_disbursed' => ScholarshipRecipient::where('academic_year', $academicYear)->where('status', 'Active')->sum('amount'),
            'by_scholarship_type' => ScholarshipRecipient::query()
                ->where('academic_year', $academicYear)
                ->where('status', 'Active')
                ->with('scholarship')
                ->get()
                ->groupBy('scholarship.scholarship_name')
                ->map(fn ($group) => [
                    'count' => $group->count(),
                    'total_amount' => $group->sum('amount'),
                ]),
            'by_semester' => ScholarshipRecipient::query()
                ->where('academic_year', $academicYear)
                ->selectRaw('semester, COUNT(*) as count, SUM(amount) as total_amount')
                ->groupBy('semester')
                ->get()
                ->keyBy('semester'),
        ];

        $generatedAt = now()->format('F d, Y h:i A');
        $html = $this->generateStatisticsHtml($stats, $academicYear, $generatedAt);

        return Pdf::loadHTML($html)
            ->setPaper('a4')
            ->stream("Scholarship-Statistics-{$academicYear}.pdf");
    }

    /**
     * Get filtered scholarship recipients.
     */
    protected function getFilteredRecipients(array $filters): Collection
    {
        $query = ScholarshipRecipient::query()
            ->with(['student', 'scholarship']);

        if (! empty($filters['scholarship_id'])) {
            $query->where('scholarship_id', $filters['scholarship_id']);
        }

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['semester'])) {
            $query->where('semester', $filters['semester']);
        }

        if (! empty($filters['academic_year'])) {
            $query->where('academic_year', $filters['academic_year']);
        }

        if (! empty($filters['date_from'])) {
            $query->whereDate('date_awarded', '>=', $filters['date_from']);
        }

        if (! empty($filters['date_to'])) {
            $query->whereDate('date_awarded', '<=', $filters['date_to']);
        }

        return $query->latest('date_awarded')->get();
    }

    /**
     * Generate HTML for recipients report.
     */
    protected function generateRecipientsHtml($recipients, $filters, $totalRecipients, $totalActive, $totalInactive, $totalAmount, $generatedAt): string
    {
        $filterText = '';
        if (! empty($filters)) {
            $filterParts = [];
            if (! empty($filters['scholarship_id'])) {
                $filterParts[] = 'Scholarship ID: '.$filters['scholarship_id'];
            }
            if (! empty($filters['status'])) {
                $filterParts[] = 'Status: '.$filters['status'];
            }
            if (! empty($filters['semester'])) {
                $filterParts[] = 'Semester: '.$filters['semester'];
            }
            if (! empty($filters['academic_year'])) {
                $filterParts[] = 'Academic Year: '.$filters['academic_year'];
            }
            if (! empty($filters['date_from'])) {
                $filterParts[] = 'From: '.$filters['date_from'];
            }
            if (! empty($filters['date_to'])) {
                $filterParts[] = 'To: '.$filters['date_to'];
            }
            $filterText = '<div class="filters"><strong>Filters Applied:</strong> '.implode(' | ', $filterParts).'</div>';
        }

        $rows = '';
        foreach ($recipients as $recipient) {
            $studentId = $recipient->student->student_id ?? 'N/A';
            $studentName = $recipient->student->name ?? 'N/A';
            $scholarshipName = $recipient->scholarship->scholarship_name ?? 'N/A';
            $statusClass = $recipient->status === 'Active' ? 'status-active' : 'status-inactive';
            $amount = '₱'.number_format($recipient->amount, 2);
            $dateAwarded = $recipient->date_awarded?->format('M d, Y') ?? 'N/A';

            $rows .= "<tr>
                <td>{$studentId}</td>
                <td>{$studentName}</td>
                <td>{$scholarshipName}</td>
                <td><span class=\"status-badge {$statusClass}\">{$recipient->status}</span></td>
                <td>{$amount}</td>
                <td>{$recipient->semester}</td>
                <td>{$recipient->academic_year}</td>
                <td>{$dateAwarded}</td>
            </tr>";
        }

        return "<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <title>Scholarship Recipients Report</title>
    <style>
        @page { margin: 1cm; }
        body { font-family: Arial, sans-serif; font-size: 11px; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .university-name { font-size: 16px; font-weight: bold; }
        .report-title { font-size: 14px; font-weight: bold; margin-top: 10px; }
        .filters { background: #f5f5f5; padding: 10px; margin: 15px 0; }
        .summary { display: flex; justify-content: space-around; margin: 20px 0; }
        .summary-box { text-align: center; padding: 10px; }
        .summary-value { font-size: 20px; font-weight: bold; }
        .summary-label { font-size: 11px; color: #666; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th { background: #333; color: white; padding: 8px; text-align: left; font-size: 10px; }
        td { padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px; }
        tr:nth-child(even) { background: #f9f9f9; }
        .footer { margin-top: 30px; font-size: 9px; text-align: center; color: #999; }
        .status-badge { padding: 2px 6px; border-radius: 3px; font-size: 9px; }
        .status-active { background: #d4edda; color: #155724; }
        .status-inactive { background: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <div class=\"header\">
        <div class=\"university-name\">MINDORO STATE UNIVERSITY</div>
        <div>Student Affairs Services</div>
        <div class=\"report-title\">Scholarship Recipients Report</div>
        <div style=\"font-size: 10px; color: #666;\">Generated: {$generatedAt}</div>
    </div>
    {$filterText}
    <div class=\"summary\">
        <div class=\"summary-box\">
            <div class=\"summary-value\">{$totalRecipients}</div>
            <div class=\"summary-label\">Total Recipients</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\" style=\"color: green;\">{$totalActive}</div>
            <div class=\"summary-label\">Active</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\" style=\"color: red;\">{$totalInactive}</div>
            <div class=\"summary-label\">Inactive</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\">₱".number_format($totalAmount, 2)."</div>
            <div class=\"summary-label\">Total Amount</div>
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Scholarship</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Semester</th>
                <th>Academic Year</th>
                <th>Date Awarded</th>
            </tr>
        </thead>
        <tbody>{$rows}</tbody>
    </table>
    <div class=\"footer\">
        This is a computer-generated report from MinSU SAS Module<br>
        For verification, please contact the Student Affairs Office
    </div>
</body>
</html>";
    }

    /**
     * Generate HTML for approved scholars report.
     */
    protected function generateApprovedScholarsHtml($groupedByType, $semester, $academicYear, $totalScholars, $totalAmount, $generatedAt): string
    {
        $sections = '';
        foreach ($groupedByType as $scholarshipName => $scholars) {
            $rows = '';
            foreach ($scholars as $scholar) {
                $studentId = $scholar->student->student_id ?? 'N/A';
                $studentName = $scholar->student->name ?? 'N/A';
                $amount = '₱'.number_format($scholar->amount, 2);
                $dateAwarded = $scholar->date_awarded?->format('M d, Y') ?? 'N/A';
                $expirationDate = $scholar->expiration_date?->format('M d, Y') ?? 'N/A';

                $rows .= "<tr>
                    <td>{$studentId}</td>
                    <td>{$studentName}</td>
                    <td>{$amount}</td>
                    <td>{$dateAwarded}</td>
                    <td>{$expirationDate}</td>
                </tr>";
            }

            $sections .= "<div class=\"section\">
                <div class=\"section-title\">{$scholarshipName} ({$scholars->count()} scholars)</div>
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Date Awarded</th>
                            <th>Expiration Date</th>
                        </tr>
                    </thead>
                    <tbody>{$rows}</tbody>
                </table>
            </div>";
        }

        return "<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <title>Approved Scholars - {$semester} {$academicYear}</title>
    <style>
        @page { margin: 1cm; }
        body { font-family: Arial, sans-serif; font-size: 11px; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .university-name { font-size: 16px; font-weight: bold; }
        .report-title { font-size: 14px; font-weight: bold; margin-top: 10px; }
        .summary { display: flex; justify-content: space-around; margin: 20px 0; }
        .summary-box { text-align: center; padding: 10px; }
        .summary-value { font-size: 20px; font-weight: bold; }
        .summary-label { font-size: 11px; color: #666; }
        .section { margin: 20px 0; }
        .section-title { font-size: 12px; font-weight: bold; margin: 15px 0 10px 0; background: #f0f0f0; padding: 8px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #333; color: white; padding: 8px; text-align: left; font-size: 10px; }
        td { padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px; }
        tr:nth-child(even) { background: #f9f9f9; }
        .footer { margin-top: 30px; font-size: 9px; text-align: center; color: #999; }
    </style>
</head>
<body>
    <div class=\"header\">
        <div class=\"university-name\">MINDORO STATE UNIVERSITY</div>
        <div>Student Affairs Services</div>
        <div class=\"report-title\">Approved Scholars - {$semester} {$academicYear}</div>
        <div style=\"font-size: 10px; color: #666;\">Generated: {$generatedAt}</div>
    </div>
    <div class=\"summary\">
        <div class=\"summary-box\">
            <div class=\"summary-value\">{$totalScholars}</div>
            <div class=\"summary-label\">Total Scholars</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\">₱".number_format($totalAmount, 2)."</div>
            <div class=\"summary-label\">Total Amount Disbursed</div>
        </div>
    </div>
    {$sections}
    <div class=\"footer\">
        This is a computer-generated report from MinSU SAS Module<br>
        For verification, please contact the Student Affairs Office
    </div>
</body>
</html>";
    }

    /**
     * Generate HTML for statistics report.
     */
    protected function generateStatisticsHtml($stats, $academicYear, $generatedAt): string
    {
        $byTypeRows = '';
        foreach ($stats['by_scholarship_type'] as $type => $data) {
            $byTypeRows .= "<tr>
                <td>{$type}</td>
                <td>{$data['count']}</td>
                <td>₱".number_format($data['total_amount'], 2).'</td>
            </tr>';
        }

        $bySemesterRows = '';
        foreach ($stats['by_semester'] as $semester => $data) {
            $bySemesterRows .= "<tr>
                <td>{$semester}</td>
                <td>{$data->count}</td>
                <td>₱".number_format($data->total_amount, 2).'</td>
            </tr>';
        }

        return "<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <title>Scholarship Statistics - {$academicYear}</title>
    <style>
        @page { margin: 1cm; }
        body { font-family: Arial, sans-serif; font-size: 11px; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .university-name { font-size: 16px; font-weight: bold; }
        .report-title { font-size: 14px; font-weight: bold; margin-top: 10px; }
        .summary { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .summary-box { border: 1px solid #ddd; padding: 15px; text-align: center; }
        .summary-value { font-size: 20px; font-weight: bold; color: #333; }
        .summary-label { font-size: 11px; color: #666; margin-top: 5px; }
        .section { margin: 20px 0; }
        .section-title { font-size: 12px; font-weight: bold; margin: 15px 0 10px 0; background: #f0f0f0; padding: 8px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #333; color: white; padding: 8px; text-align: left; font-size: 10px; }
        td { padding: 6px; border-bottom: 1px solid #ddd; font-size: 10px; }
        tr:nth-child(even) { background: #f9f9f9; }
        .footer { margin-top: 30px; font-size: 9px; text-align: center; color: #999; }
    </style>
</head>
<body>
    <div class=\"header\">
        <div class=\"university-name\">MINDORO STATE UNIVERSITY</div>
        <div>Student Affairs Services</div>
        <div class=\"report-title\">Scholarship Statistics - {$academicYear}</div>
        <div style=\"font-size: 10px; color: #666;\">Generated: {$generatedAt}</div>
    </div>
    <div class=\"summary\">
        <div class=\"summary-box\">
            <div class=\"summary-value\">{$stats['total_recipients']}</div>
            <div class=\"summary-label\">Total Recipients</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\">{$stats['active']}</div>
            <div class=\"summary-label\">Active Scholars</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\">{$stats['inactive']}</div>
            <div class=\"summary-label\">Inactive Scholars</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\">₱".number_format($stats['total_disbursed'], 2)."</div>
            <div class=\"summary-label\">Total Disbursed</div>
        </div>
    </div>
    <div class=\"section\">
        <div class=\"section-title\">By Scholarship Type</div>
        <table>
            <thead>
                <tr>
                    <th>Scholarship Type</th>
                    <th>Number of Scholars</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>{$byTypeRows}</tbody>
        </table>
    </div>
    <div class=\"section\">
        <div class=\"section-title\">By Semester</div>
        <table>
            <thead>
                <tr>
                    <th>Semester</th>
                    <th>Number of Scholars</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>{$bySemesterRows}</tbody>
        </table>
    </div>
    <div class=\"footer\">
        This is a computer-generated report from MinSU SAS Module<br>
        For verification, please contact the Student Affairs Office
    </div>
</body>
</html>";
    }
}
