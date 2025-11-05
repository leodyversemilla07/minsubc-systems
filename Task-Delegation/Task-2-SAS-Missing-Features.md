# Task 2: SAS Module - Missing Features Implementation

**Assigned To:** Full-Stack Developer  
**Module:** Student Affairs Services (SAS)  
**Timeline:** 3-4 weeks  
**Complexity:** Medium-High  
**Priority:** High (Production Enhancement)  
**Reference:** [`Missing-Features-Audit.md`](./Missing-Features-Audit.md)

---

## 📋 Overview

The SAS module is **~90% complete** with all core functionality working. This task focuses on implementing advanced reporting and document management features.

**Current Status:**
- ✅ 119/119 tests passing
- ✅ Scholarship management complete
- ✅ Insurance enrollment working
- ✅ Activities/Events calendar functional
- ✅ CalendarService exists for iCal export
- ❌ PDF/Excel reports missing
- ❌ Document digitalization viewer missing
- ❌ Advanced search not implemented

---

## 🎯 Task Breakdown

### Task 2.1: Scholarship Reports (PDF/Excel)
**Priority:** 🔴 Critical  
**Effort:** 3-4 days  
**Status:** Not Started

#### Requirements (from SAS_SRS.md Section 5.6)
- List of scholarship applicants (filterable)
- Approved scholars by semester
- Scholarship statistics/analytics
- Export to PDF (printable) and Excel (data)
- Filter by: scholarship type, status, semester, date range

#### Implementation

**Step 1: Create Report Service**

```php
<?php
// Modules/SAS/app/Services/ScholarshipReportService.php

namespace Modules\SAS\Services;

use Modules\SAS\Models\ScholarshipApplication;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use Modules\SAS\Exports\ScholarshipApplicationsExport;

class ScholarshipReportService
{
    /**
     * Generate scholarship applicants report (PDF)
     */
    public function generateApplicantsReport(array $filters = []): \Illuminate\Http\Response
    {
        $applications = $this->getFilteredApplications($filters);
        
        $data = [
            'title' => 'Scholarship Applicants Report',
            'filters' => $filters,
            'applications' => $applications,
            'total_applicants' => $applications->count(),
            'total_approved' => $applications->where('status', 'approved')->count(),
            'total_pending' => $applications->where('status', 'pending')->count(),
            'total_rejected' => $applications->where('status', 'rejected')->count(),
            'generated_at' => now()->format('F d, Y h:i A'),
        ];

        return Pdf::loadView('sas::reports.scholarship-applicants', $data)
                   ->setPaper('a4', 'landscape')
                   ->stream("Scholarship-Applicants-" . now()->format('Y-m-d') . ".pdf");
    }

    /**
     * Generate approved scholars report
     */
    public function generateApprovedScholarsReport(string $semester): \Illuminate\Http\Response
    {
        $scholars = ScholarshipApplication::query()
            ->where('status', 'approved')
            ->where('semester', $semester)
            ->with(['student.user', 'scholarship'])
            ->orderBy('approved_at')
            ->get();

        $groupedByType = $scholars->groupBy('scholarship.name');

        $data = [
            'title' => "Approved Scholars - {$semester}",
            'semester' => $semester,
            'scholars' => $scholars,
            'grouped_by_type' => $groupedByType,
            'total_scholars' => $scholars->count(),
            'total_amount' => $scholars->sum('amount_awarded'),
            'generated_at' => now()->format('F d, Y h:i A'),
        ];

        return Pdf::loadView('sas::reports.approved-scholars', $data)
                   ->setPaper('a4', 'landscape')
                   ->stream("Approved-Scholars-{$semester}.pdf");
    }

    /**
     * Export to Excel
     */
    public function exportToExcel(array $filters = [])
    {
        $filename = 'scholarship-applications-' . now()->format('Y-m-d') . '.xlsx';
        
        return Excel::download(
            new ScholarshipApplicationsExport($filters),
            $filename
        );
    }

    /**
     * Generate scholarship statistics report
     */
    public function generateStatisticsReport(string $academicYear): \Illuminate\Http\Response
    {
        $stats = [
            'total_applications' => ScholarshipApplication::where('academic_year', $academicYear)->count(),
            'approved' => ScholarshipApplication::where('academic_year', $academicYear)->where('status', 'approved')->count(),
            'pending' => ScholarshipApplication::where('academic_year', $academicYear)->where('status', 'pending')->count(),
            'rejected' => ScholarshipApplication::where('academic_year', $academicYear)->where('status', 'rejected')->count(),
            'total_disbursed' => ScholarshipApplication::where('academic_year', $academicYear)->where('status', 'approved')->sum('amount_awarded'),
            'by_scholarship_type' => ScholarshipApplication::query()
                ->where('academic_year', $academicYear)
                ->where('status', 'approved')
                ->with('scholarship')
                ->get()
                ->groupBy('scholarship.name')
                ->map(fn($group) => [
                    'count' => $group->count(),
                    'total_amount' => $group->sum('amount_awarded'),
                ]),
            'by_month' => ScholarshipApplication::query()
                ->where('academic_year', $academicYear)
                ->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
                ->groupBy('month')
                ->pluck('count', 'month'),
        ];

        $data = [
            'title' => "Scholarship Statistics - {$academicYear}",
            'academic_year' => $academicYear,
            'stats' => $stats,
            'generated_at' => now()->format('F d, Y h:i A'),
        ];

        return Pdf::loadView('sas::reports.scholarship-statistics', $data)
                   ->setPaper('a4')
                   ->stream("Scholarship-Statistics-{$academicYear}.pdf");
    }

    protected function getFilteredApplications(array $filters)
    {
        $query = ScholarshipApplication::query()
            ->with(['student.user', 'scholarship']);

        if (!empty($filters['scholarship_id'])) {
            $query->where('scholarship_id', $filters['scholarship_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['semester'])) {
            $query->where('semester', $filters['semester']);
        }

        if (!empty($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        return $query->latest()->get();
    }
}
```

**Step 2: Create Excel Export**

```php
<?php
// Modules/SAS/app/Exports/ScholarshipApplicationsExport.php

namespace Modules\SAS\Exports;

use Modules\SAS\Models\ScholarshipApplication;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ScholarshipApplicationsExport implements FromQuery, WithHeadings, WithMapping, WithStyles
{
    public function __construct(protected array $filters = [])
    {
    }

    public function query()
    {
        $query = ScholarshipApplication::query()
            ->with(['student.user', 'scholarship']);

        // Apply same filters as report service
        if (!empty($this->filters['scholarship_id'])) {
            $query->where('scholarship_id', $this->filters['scholarship_id']);
        }

        if (!empty($this->filters['status'])) {
            $query->where('status', $this->filters['status']);
        }

        if (!empty($this->filters['semester'])) {
            $query->where('semester', $this->filters['semester']);
        }

        if (!empty($this->filters['date_from'])) {
            $query->whereDate('created_at', '>=', $this->filters['date_from']);
        }

        if (!empty($this->filters['date_to'])) {
            $query->whereDate('created_at', '<=', $this->filters['date_to']);
        }

        return $query->latest();
    }

    public function headings(): array
    {
        return [
            'Application ID',
            'Student ID',
            'Student Name',
            'Email',
            'Scholarship Type',
            'Status',
            'Amount Awarded',
            'Semester',
            'Academic Year',
            'Applied At',
            'Approved/Rejected At',
            'Remarks',
        ];
    }

    public function map($application): array
    {
        return [
            $application->id,
            $application->student->student_id,
            $application->student->user->full_name,
            $application->student->user->email,
            $application->scholarship->name,
            ucfirst($application->status),
            $application->amount_awarded ? '₱' . number_format($application->amount_awarded, 2) : 'N/A',
            $application->semester,
            $application->academic_year,
            $application->created_at->format('Y-m-d H:i'),
            $application->approved_at?->format('Y-m-d H:i') ?? $application->rejected_at?->format('Y-m-d H:i') ?? 'N/A',
            $application->remarks ?? 'N/A',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold header
            1 => ['font' => ['bold' => true]],
        ];
    }
}
```

**Step 3: Create PDF Views**

```blade
{{-- Modules/SAS/resources/views/reports/scholarship-applicants.blade.php --}}

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
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
    </style>
</head>
<body>
    <div class="header">
        <div class="university-name">MINDORO STATE UNIVERSITY</div>
        <div>Student Affairs Services</div>
        <div class="report-title">{{ $title }}</div>
        <div style="font-size: 10px; color: #666;">Generated: {{ $generated_at }}</div>
    </div>

    @if(!empty($filters))
    <div class="filters">
        <strong>Filters Applied:</strong>
        @if(!empty($filters['scholarship_id'])) Scholarship ID: {{ $filters['scholarship_id'] }} | @endif
        @if(!empty($filters['status'])) Status: {{ ucfirst($filters['status']) }} | @endif
        @if(!empty($filters['semester'])) Semester: {{ $filters['semester'] }} | @endif
        @if(!empty($filters['date_from'])) From: {{ $filters['date_from'] }} | @endif
        @if(!empty($filters['date_to'])) To: {{ $filters['date_to'] }} @endif
    </div>
    @endif

    <div class="summary">
        <div class="summary-box">
            <div class="summary-value">{{ $total_applicants }}</div>
            <div class="summary-label">Total Applicants</div>
        </div>
        <div class="summary-box">
            <div class="summary-value" style="color: green;">{{ $total_approved }}</div>
            <div class="summary-label">Approved</div>
        </div>
        <div class="summary-box">
            <div class="summary-value" style="color: orange;">{{ $total_pending }}</div>
            <div class="summary-label">Pending</div>
        </div>
        <div class="summary-box">
            <div class="summary-value" style="color: red;">{{ $total_rejected }}</div>
            <div class="summary-label">Rejected</div>
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
                <th>Applied</th>
            </tr>
        </thead>
        <tbody>
            @foreach($applications as $app)
            <tr>
                <td>{{ $app->student->student_id }}</td>
                <td>{{ $app->student->user->full_name }}</td>
                <td>{{ $app->scholarship->name }}</td>
                <td>
                    <span style="
                        padding: 2px 6px;
                        border-radius: 3px;
                        background: {{ $app->status === 'approved' ? '#d4edda' : ($app->status === 'pending' ? '#fff3cd' : '#f8d7da') }};
                        color: {{ $app->status === 'approved' ? '#155724' : ($app->status === 'pending' ? '#856404' : '#721c24') }};
                    ">
                        {{ ucfirst($app->status) }}
                    </span>
                </td>
                <td>{{ $app->amount_awarded ? '₱' . number_format($app->amount_awarded, 2) : 'N/A' }}</td>
                <td>{{ $app->created_at->format('M d, Y') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        This is a computer-generated report from MinSU SAS Module<br>
        For verification, please contact the Student Affairs Office
    </div>
</body>
</html>
```

**Step 4: Add Controller Endpoints**

```php
// Modules/SAS/app/Http/Controllers/ReportController.php

namespace Modules\SAS\Http\Controllers;

use Modules\SAS\Services\ScholarshipReportService;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function __construct(
        protected ScholarshipReportService $reportService
    ) {}

    /**
     * GET /sas/reports/scholarships/applicants
     */
    public function scholarshipApplicants(Request $request)
    {
        $filters = $request->only(['scholarship_id', 'status', 'semester', 'date_from', 'date_to']);
        
        if ($request->get('format') === 'excel') {
            return $this->reportService->exportToExcel($filters);
        }
        
        return $this->reportService->generateApplicantsReport($filters);
    }

    /**
     * GET /sas/reports/scholarships/approved/{semester}
     */
    public function approvedScholars(string $semester)
    {
        return $this->reportService->generateApprovedScholarsReport($semester);
    }

    /**
     * GET /sas/reports/scholarships/statistics/{academicYear}
     */
    public function scholarshipStatistics(string $academicYear)
    {
        return $this->reportService->generateStatisticsReport($academicYear);
    }
}
```

**Step 5: Add Frontend UI**

```tsx
// resources/js/pages/sas/reports/index.tsx

import { Button } from '@/components/ui/button';
import { FileDown, FileSpreadsheet } from 'lucide-react';

export default function SASReports() {
    const [filters, setFilters] = useState({
        scholarship_id: '',
        status: '',
        semester: '',
        date_from: '',
        date_to: '',
    });

    const downloadPDF = () => {
        const params = new URLSearchParams(filters);
        window.open(`/sas/reports/scholarships/applicants?${params}`, '_blank');
    };

    const downloadExcel = () => {
        const params = new URLSearchParams({ ...filters, format: 'excel' });
        window.location.href = `/sas/reports/scholarships/applicants?${params}`;
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Scholarship Reports</h1>

            {/* Filter Form */}
            <Card>
                <CardContent className="pt-6">
                    {/* Add filter inputs for scholarship_id, status, semester, dates */}
                </CardContent>
            </Card>

            {/* Download Buttons */}
            <div className="flex gap-4">
                <Button onClick={downloadPDF} variant="default">
                    <FileDown className="h-4 w-4 mr-2" />
                    Download PDF
                </Button>
                <Button onClick={downloadExcel} variant="outline">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export to Excel
                </Button>
            </div>
        </div>
    );
}
```

#### Testing

```php
// tests/Feature/SAS/ScholarshipReportsTest.php

it('generates scholarship applicants PDF report', function () {
    $applications = ScholarshipApplication::factory()->count(10)->create();
    
    $response = $this->actingAs(User::factory()->sasStaff()->create())
        ->get('/sas/reports/scholarships/applicants');
    
    $response->assertSuccessful();
    $response->assertHeader('Content-Type', 'application/pdf');
});

it('exports scholarship applications to Excel', function () {
    ScholarshipApplication::factory()->count(5)->create();
    
    $response = $this->actingAs(User::factory()->sasStaff()->create())
        ->get('/sas/reports/scholarships/applicants?format=excel');
    
    $response->assertSuccessful();
    $response->assertHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
});

it('filters scholarship report by status', function () {
    ScholarshipApplication::factory()->approved()->count(3)->create();
    ScholarshipApplication::factory()->pending()->count(2)->create();
    
    $response = $this->actingAs(User::factory()->sasStaff()->create())
        ->get('/sas/reports/scholarships/applicants?status=approved');
    
    $response->assertSuccessful();
    // Additional assertions to verify filter applied
});
```

---

### Task 2.2: Insurance Reports (PDF/Excel)
**Priority:** 🔴 Critical  
**Effort:** 3-4 days  
**Status:** Not Started

Similar to scholarship reports, implement:
- List of enrolled students by insurance type
- Coverage statistics by semester
- Export to PDF/Excel
- Filter by insurance type, status, semester

*(Follow same pattern as Task 2.1)*

---

### Task 2.3: Document Digitalization Viewer
**Priority:** 🟡 Medium  
**Effort:** 4-5 days  
**Status:** Not Started

#### Requirements
- PDF viewer for uploaded documents (medical certs, scholarship docs)
- Image viewer for scanned documents
- Zoom, rotate, download controls
- Admin can mark documents as verified

#### Implementation

```bash
# Install PDF viewer library
npm install react-pdf pdfjs-dist
```

```tsx
// resources/js/components/document-viewer.tsx

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ZoomIn, ZoomOut, RotateCw, Download, Check } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export function DocumentViewer({ documentUrl, onVerify }: { documentUrl: string, onVerify?: () => void }) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [rotation, setRotation] = useState<number>(0);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setScale(scale - 0.1)}
                        disabled={scale <= 0.5}
                    >
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">{Math.round(scale * 100)}%</span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setScale(scale + 0.1)}
                        disabled={scale >= 2.0}
                    >
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRotation((rotation + 90) % 360)}
                    >
                        <RotateCw className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    {onVerify && (
                        <Button onClick={onVerify} variant="default">
                            <Check className="h-4 w-4 mr-2" />
                            Mark as Verified
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        onClick={() => window.open(documentUrl, '_blank')}
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                    </Button>
                </div>
            </div>

            {/* PDF Viewer */}
            <div className="border rounded-lg overflow-auto max-h-[600px] bg-gray-50">
                <Document
                    file={documentUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        rotate={rotation}
                    />
                </Document>
            </div>

            {/* Page Navigation */}
            {numPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm">
                        Page {pageNumber} of {numPages}
                    </span>
                    <Button
                        variant="outline"
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber >= numPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
```

---

### Task 2.4: Advanced Search & Filtering
**Priority:** 🟡 Medium  
**Effort:** 3-4 days  
**Status:** Not Started

Implement advanced search across:
- Scholarship applications (by student, type, status, date)
- Insurance enrollments (by student, plan, status)
- Activities (by title, type, date, location)

---

## 📦 Dependencies

```bash
# PHP Packages
composer require barryvdh/laravel-dompdf
composer require maatwebsite/excel

# NPM Packages
npm install react-pdf pdfjs-dist
```

---

## ✅ Acceptance Criteria

### Scholarship Reports
- [ ] Admin can generate PDF report of all scholarship applicants
- [ ] Admin can filter by scholarship type, status, semester
- [ ] Admin can export filtered data to Excel
- [ ] Report includes summary statistics
- [ ] Reports are branded with MinSU logo

### Insurance Reports
- [ ] Admin can generate PDF report of enrolled students
- [ ] Admin can export insurance data to Excel
- [ ] Reports show coverage statistics

### Document Viewer
- [ ] Staff can view uploaded PDF documents in-app
- [ ] Viewer supports zoom, rotate, page navigation
- [ ] Staff can mark documents as verified
- [ ] Students can view their submitted documents

### All Features
- [ ] All new features have passing tests (15+ new tests)
- [ ] Documentation updated

---

## 📝 Notes

- Existing `CalendarService` handles iCal export - reuse pattern for reports
- Existing `FileUploadService` handles document uploads
- Focus on reports first (highest priority for admin workflows)

**Estimated Total Effort:** 13-17 days
