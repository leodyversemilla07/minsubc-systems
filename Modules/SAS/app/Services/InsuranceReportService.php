<?php

namespace Modules\SAS\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;
use Modules\SAS\Exports\InsuranceRecordsExport;
use Modules\SAS\Models\InsuranceRecord;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;

class InsuranceReportService
{
    /**
     * Generate insurance records report (PDF).
     */
    public function generateRecordsReport(array $filters = []): Response
    {
        $records = $this->getFilteredRecords($filters);

        $totalRecords = $records->count();
        $totalActive = $records->where('status', 'Active')->count();
        $totalExpired = $records->where('status', 'Expired')->count();
        $totalCoverage = $records->sum('coverage_amount');
        $generatedAt = now()->format('F d, Y h:i A');

        $html = $this->generateRecordsHtml($records, $filters, $totalRecords, $totalActive, $totalExpired, $totalCoverage, $generatedAt);

        return Pdf::loadHTML($html)
            ->setPaper('a4', 'landscape')
            ->stream('Insurance-Records-'.now()->format('Y-m-d').'.pdf');
    }

    /**
     * Generate insurance statistics report.
     */
    public function generateStatisticsReport(string $academicYear): Response
    {
        $records = InsuranceRecord::query()
            ->whereYear('effective_date', '<=', now()->year)
            ->whereYear('expiration_date', '>=', now()->year)
            ->get();

        $stats = [
            'total_records' => $records->count(),
            'active' => $records->where('status', 'Active')->count(),
            'expired' => $records->where('status', 'Expired')->count(),
            'expiring_soon' => $records->filter(fn ($r) => $r->daysUntilExpiration() <= 30 && $r->daysUntilExpiration() > 0)->count(),
            'total_coverage' => $records->sum('coverage_amount'),
            'by_policy_type' => $records->groupBy('policy_type')->map(fn ($group) => [
                'count' => $group->count(),
                'total_coverage' => $group->sum('coverage_amount'),
            ]),
            'by_provider' => $records->groupBy('insurance_provider')->map(fn ($group) => [
                'count' => $group->count(),
                'total_coverage' => $group->sum('coverage_amount'),
            ]),
        ];

        $generatedAt = now()->format('F d, Y h:i A');
        $html = $this->generateStatisticsHtml($stats, $academicYear, $generatedAt);

        return Pdf::loadHTML($html)
            ->setPaper('a4')
            ->stream("Insurance-Statistics-{$academicYear}.pdf");
    }

    /**
     * Export to Excel.
     */
    public function exportToExcel(array $filters = []): BinaryFileResponse
    {
        $filename = 'insurance-records-'.now()->format('Y-m-d').'.xlsx';

        return Excel::download(
            new InsuranceRecordsExport($filters),
            $filename
        );
    }

    /**
     * Get filtered insurance records.
     */
    protected function getFilteredRecords(array $filters): Collection
    {
        $query = InsuranceRecord::query()
            ->with(['student']);

        if (! empty($filters['policy_type'])) {
            $query->where('policy_type', $filters['policy_type']);
        }

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['insurance_provider'])) {
            $query->where('insurance_provider', 'like', '%'.$filters['insurance_provider'].'%');
        }

        if (! empty($filters['date_from'])) {
            $query->whereDate('effective_date', '>=', $filters['date_from']);
        }

        if (! empty($filters['date_to'])) {
            $query->whereDate('effective_date', '<=', $filters['date_to']);
        }

        return $query->latest('effective_date')->get();
    }

    /**
     * Generate HTML for insurance records report.
     */
    protected function generateRecordsHtml($records, $filters, $totalRecords, $totalActive, $totalExpired, $totalCoverage, $generatedAt): string
    {
        $filterText = '';
        if (! empty($filters)) {
            $filterParts = [];
            if (! empty($filters['policy_type'])) {
                $filterParts[] = 'Policy Type: '.$filters['policy_type'];
            }
            if (! empty($filters['status'])) {
                $filterParts[] = 'Status: '.$filters['status'];
            }
            if (! empty($filters['insurance_provider'])) {
                $filterParts[] = 'Provider: '.$filters['insurance_provider'];
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
        foreach ($records as $record) {
            $studentId = $record->student->student_id ?? 'N/A';
            $studentName = $record->student->name ?? 'N/A';
            $statusClass = $record->status === 'Active' ? 'status-active' : 'status-expired';
            $coverage = '₱'.number_format($record->coverage_amount, 2);
            $effectiveDate = $record->effective_date?->format('M d, Y') ?? 'N/A';
            $expirationDate = $record->expiration_date?->format('M d, Y') ?? 'N/A';

            $rows .= "<tr>
                <td>{$studentId}</td>
                <td>{$studentName}</td>
                <td>{$record->insurance_provider}</td>
                <td>{$record->policy_number}</td>
                <td>{$record->policy_type}</td>
                <td>{$coverage}</td>
                <td><span class=\"status-badge {$statusClass}\">{$record->status}</span></td>
                <td>{$effectiveDate}</td>
                <td>{$expirationDate}</td>
            </tr>";
        }

        return "<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <title>Insurance Records Report</title>
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
        .status-expired { background: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <div class=\"header\">
        <div class=\"university-name\">MINDORO STATE UNIVERSITY</div>
        <div>Student Affairs Services</div>
        <div class=\"report-title\">Insurance Records Report</div>
        <div style=\"font-size: 10px; color: #666;\">Generated: {$generatedAt}</div>
    </div>
    {$filterText}
    <div class=\"summary\">
        <div class=\"summary-box\">
            <div class=\"summary-value\">{$totalRecords}</div>
            <div class=\"summary-label\">Total Records</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\" style=\"color: green;\">{$totalActive}</div>
            <div class=\"summary-label\">Active</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\" style=\"color: red;\">{$totalExpired}</div>
            <div class=\"summary-label\">Expired</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\">₱".number_format($totalCoverage, 2)."</div>
            <div class=\"summary-label\">Total Coverage</div>
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Provider</th>
                <th>Policy Number</th>
                <th>Type</th>
                <th>Coverage</th>
                <th>Status</th>
                <th>Effective</th>
                <th>Expires</th>
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
     * Generate HTML for insurance statistics report.
     */
    protected function generateStatisticsHtml($stats, $academicYear, $generatedAt): string
    {
        $byTypeRows = '';
        foreach ($stats['by_policy_type'] as $type => $data) {
            $byTypeRows .= "<tr>
                <td>{$type}</td>
                <td>{$data['count']}</td>
                <td>₱".number_format($data['total_coverage'], 2).'</td>
            </tr>';
        }

        $byProviderRows = '';
        foreach ($stats['by_provider'] as $provider => $data) {
            $byProviderRows .= "<tr>
                <td>{$provider}</td>
                <td>{$data['count']}</td>
                <td>₱".number_format($data['total_coverage'], 2).'</td>
            </tr>';
        }

        return "<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <title>Insurance Statistics - {$academicYear}</title>
    <style>
        @page { margin: 1cm; }
        body { font-family: Arial, sans-serif; font-size: 11px; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .university-name { font-size: 16px; font-weight: bold; }
        .report-title { font-size: 14px; font-weight: bold; margin-top: 10px; }
        .summary { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 20px 0; }
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
        <div class=\"report-title\">Insurance Statistics - {$academicYear}</div>
        <div style=\"font-size: 10px; color: #666;\">Generated: {$generatedAt}</div>
    </div>
    <div class=\"summary\">
        <div class=\"summary-box\">
            <div class=\"summary-value\">{$stats['total_records']}</div>
            <div class=\"summary-label\">Total Records</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\">{$stats['active']}</div>
            <div class=\"summary-label\">Active Policies</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\">{$stats['expired']}</div>
            <div class=\"summary-label\">Expired Policies</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\" style=\"color: orange;\">{$stats['expiring_soon']}</div>
            <div class=\"summary-label\">Expiring Soon (30 days)</div>
        </div>
        <div class=\"summary-box\">
            <div class=\"summary-value\">₱".number_format($stats['total_coverage'], 2)."</div>
            <div class=\"summary-label\">Total Coverage</div>
        </div>
    </div>
    <div class=\"section\">
        <div class=\"section-title\">By Policy Type</div>
        <table>
            <thead>
                <tr>
                    <th>Policy Type</th>
                    <th>Number of Policies</th>
                    <th>Total Coverage</th>
                </tr>
            </thead>
            <tbody>{$byTypeRows}</tbody>
        </table>
    </div>
    <div class=\"section\">
        <div class=\"section-title\">By Insurance Provider</div>
        <table>
            <thead>
                <tr>
                    <th>Provider</th>
                    <th>Number of Policies</th>
                    <th>Total Coverage</th>
                </tr>
            </thead>
            <tbody>{$byProviderRows}</tbody>
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
