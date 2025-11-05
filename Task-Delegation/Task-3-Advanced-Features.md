# Task 3: Advanced Features & Optimizations

**Assigned To:** Senior Full-Stack Developer  
**Module:** All Modules (Cross-cutting Features)  
**Timeline:** 2-3 weeks  
**Complexity:** Medium-High  
**Priority:** Medium (Post-Launch Enhancements)  
**Reference:** [`Missing-Features-Audit.md`](./Missing-Features-Audit.md)

---

## 📋 Overview

This task covers **medium-priority features** that enhance user experience but are not required for production launch. These can be implemented post-launch as Phase 2 enhancements.

**Features Included:**
- Analytics dashboards (Registrar)
- Scholarship renewal workflow automation (SAS)
- Bulk operations (both modules)

---

## 🎯 Task Breakdown

### Task 3.1: Analytics Dashboard (Registrar)
**Priority:** 🟡 Medium  
**Effort:** 3-4 days  
**Module:** Registrar DRS  
**Status:** Not Started

#### Requirements
- Total requests by document type (chart)
- Request trends over time (line chart)
- Average processing time
- Revenue by document type
- Status distribution (pie chart)

#### Implementation

```php
// Modules/Registrar/app/Services/AnalyticsService.php

namespace Modules\Registrar\Services;

use Modules\Registrar\Models\DocumentRequest;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    public function getDashboardStats(string $period = '30days'): array
    {
        $startDate = $this->getStartDate($period);

        return [
            'total_requests' => DocumentRequest::where('created_at', '>=', $startDate)->count(),
            'requests_by_type' => $this->getRequestsByType($startDate),
            'requests_by_status' => $this->getRequestsByStatus($startDate),
            'revenue_by_type' => $this->getRevenueByType($startDate),
            'average_processing_time' => $this->getAverageProcessingTime($startDate),
            'request_trends' => $this->getRequestTrends($startDate),
        ];
    }

    protected function getRequestsByType($startDate): array
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->select('document_type', DB::raw('COUNT(*) as count'))
            ->groupBy('document_type')
            ->pluck('count', 'document_type')
            ->toArray();
    }

    protected function getRequestsByStatus($startDate): array
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();
    }

    protected function getRevenueByType($startDate): array
    {
        return DocumentRequest::query()
            ->join('payments', 'document_requests.id', '=', 'payments.document_request_id')
            ->where('payments.status', 'paid')
            ->where('payments.paid_at', '>=', $startDate)
            ->select('document_requests.document_type', DB::raw('SUM(payments.amount) as total'))
            ->groupBy('document_requests.document_type')
            ->pluck('total', 'document_type')
            ->toArray();
    }

    protected function getAverageProcessingTime($startDate): float
    {
        return DocumentRequest::query()
            ->where('status', 'released')
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('released_at')
            ->selectRaw('AVG(TIMESTAMPDIFF(HOUR, created_at, released_at)) as avg_hours')
            ->value('avg_hours') ?? 0.0;
    }

    protected function getRequestTrends($startDate): array
    {
        return DocumentRequest::query()
            ->where('created_at', '>=', $startDate)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('count', 'date')
            ->toArray();
    }

    protected function getStartDate(string $period): \Carbon\Carbon
    {
        return match($period) {
            '7days' => now()->subDays(7),
            '30days' => now()->subDays(30),
            '90days' => now()->subDays(90),
            'year' => now()->subYear(),
            default => now()->subDays(30),
        };
    }
}
```

**Frontend with Chart.js:**

```tsx
// resources/js/pages/registrar/analytics.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);

export default function AnalyticsDashboard({ stats }) {
    const requestTrendsData = {
        labels: Object.keys(stats.request_trends),
        datasets: [{
            label: 'Document Requests',
            data: Object.values(stats.request_trends),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }],
    };

    const statusDistributionData = {
        labels: Object.keys(stats.requests_by_status).map(s => s.replace('_', ' ').toUpperCase()),
        datasets: [{
            data: Object.values(stats.requests_by_status),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
            ],
        }],
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Total Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.total_requests}</div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Avg Processing Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{Math.round(stats.average_processing_time)}h</div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Request Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Line data={requestTrendsData} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Pie data={statusDistributionData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
```

---

### Task 3.2: Scholarship Renewal Workflow (SAS)
**Priority:** 🟡 Medium  
**Effort:** 4-5 days  
**Module:** SAS  
**Status:** Not Started

#### Requirements
- Auto-detect scholars eligible for renewal
- Send renewal reminders
- Simplified renewal application process
- Track renewal history

#### Implementation

```php
// Modules/SAS/app/Services/ScholarshipRenewalService.php

namespace Modules\SAS\Services;

use Modules\SAS\Models\ScholarshipApplication;
use Modules\SAS\Models\Student;
use App\Services\NotificationService;

class ScholarshipRenewalService
{
    public function __construct(
        protected NotificationService $notificationService
    ) {}

    /**
     * Find scholars eligible for renewal
     */
    public function getEligibleScholars(string $academicYear, string $semester): Collection
    {
        // Find scholars from previous semester who are still eligible
        return ScholarshipApplication::query()
            ->where('status', 'approved')
            ->where('academic_year', $this->getPreviousAcademicYear($academicYear))
            ->where('semester', $this->getPreviousSemester($semester))
            ->whereDoesntHave('renewals', function ($query) use ($academicYear, $semester) {
                $query->where('academic_year', $academicYear)
                      ->where('semester', $semester);
            })
            ->with(['student.user', 'scholarship'])
            ->get();
    }

    /**
     * Send renewal reminders
     */
    public function sendRenewalReminders(string $academicYear, string $semester): int
    {
        $eligibleScholars = $this->getEligibleScholars($academicYear, $semester);
        
        foreach ($eligibleScholars as $application) {
            $this->notificationService->send(
                $application->student->user,
                'Scholarship Renewal Available',
                "Your {$application->scholarship->name} scholarship is up for renewal. Please submit your renewal application for {$semester} {$academicYear}.",
                'sas'
            );
        }

        return $eligibleScholars->count();
    }

    /**
     * Create renewal application (simplified)
     */
    public function createRenewalApplication(ScholarshipApplication $previousApplication): ScholarshipApplication
    {
        return ScholarshipApplication::create([
            'student_id' => $previousApplication->student_id,
            'scholarship_id' => $previousApplication->scholarship_id,
            'academic_year' => $previousApplication->academic_year, // Will be updated
            'semester' => $previousApplication->semester, // Will be updated
            'status' => 'pending',
            'is_renewal' => true,
            'previous_application_id' => $previousApplication->id,
            // Pre-fill other fields from previous application
            'requirements' => $previousApplication->requirements,
        ]);
    }
}
```

**Artisan Command for Automation:**

```php
// Modules/SAS/app/Console/Commands/SendScholarshipRenewalReminders.php

namespace Modules\SAS\Console\Commands;

use Illuminate\Console\Command;
use Modules\SAS\Services\ScholarshipRenewalService;

class SendScholarshipRenewalReminders extends Command
{
    protected $signature = 'sas:send-renewal-reminders {academic_year} {semester}';
    protected $description = 'Send scholarship renewal reminders to eligible students';

    public function handle(ScholarshipRenewalService $service): int
    {
        $academicYear = $this->argument('academic_year');
        $semester = $this->argument('semester');

        $this->info("Finding eligible scholars for {$semester} {$academicYear}...");

        $count = $service->sendRenewalReminders($academicYear, $semester);

        $this->info("Sent renewal reminders to {$count} scholars");

        return self::SUCCESS;
    }
}
```

---

### Task 3.3: Bulk Operations
**Priority:** 🟡 Medium  
**Effort:** 3-4 days (each module)  
**Status:** Not Started

#### Registrar Bulk Operations
- Bulk update request status
- Bulk assign to staff
- Bulk release documents

#### SAS Bulk Operations
- Bulk approve/reject scholarship applications
- Bulk enroll in insurance
- Bulk delete old records

```php
// Modules/Registrar/app/Http/Controllers/BulkOperationsController.php

public function bulkUpdateStatus(Request $request)
{
    $validated = $request->validate([
        'request_ids' => 'required|array',
        'request_ids.*' => 'exists:document_requests,id',
        'status' => 'required|in:processing,ready_for_release,released',
    ]);

    DocumentRequest::whereIn('id', $validated['request_ids'])
        ->update(['status' => $validated['status']]);

    return back()->with('success', count($validated['request_ids']) . ' requests updated');
}
```

---

## 📦 Dependencies

```bash
# Analytics/Charts
npm install chart.js react-chartjs-2
```

---

## ✅ Acceptance Criteria

### Analytics
- [ ] Dashboard shows request trends
- [ ] Charts display correctly
- [ ] Filters work (7 days, 30 days, etc.)
- [ ] Performance is acceptable

### Renewal Workflow
- [ ] Eligible scholars automatically identified
- [ ] Renewal reminders sent via notification
- [ ] Students can renew with pre-filled data
- [ ] Renewal history tracked

### Bulk Operations
- [ ] Admin can select multiple records
- [ ] Bulk actions execute correctly
- [ ] Confirmation dialogs prevent accidents
- [ ] All operations have tests

---

## 📝 Notes

**Implementation Priority:**
1. Analytics (quick win, high visibility)
2. Bulk operations (time-saver for staff)
3. Renewal workflow (valuable but requires planning)

**Estimated Total Effort:** 10-13 days
