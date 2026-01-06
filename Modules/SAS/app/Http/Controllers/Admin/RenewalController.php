<?php

namespace Modules\SAS\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\SAS\Models\Scholarship;
use Modules\SAS\Models\ScholarshipRecipient;
use Modules\SAS\Services\ScholarshipRenewalService;

class RenewalController extends Controller
{
    public function __construct(
        protected ScholarshipRenewalService $renewalService
    ) {}

    /**
     * Display scholarship renewals management page.
     */
    public function index(Request $request)
    {
        $currentYear = date('Y');
        $academicYear = $request->input('academic_year', "{$currentYear}-".($currentYear + 1));
        $semester = $request->input('semester', '1st');

        // Get eligible scholars for renewal
        $eligibleScholars = $this->renewalService->getEligibleScholars($academicYear, $semester);

        // Get scholars needing renewal soon (expiring in 30 days)
        $scholarsNeedingRenewal = $this->renewalService->getScholarsNeedingRenewal(30);

        // Get recent renewals
        $recentRenewals = ScholarshipRecipient::query()
            ->where('renewal_status', 'Approved')
            ->with(['student', 'scholarship'])
            ->orderBy('updated_at', 'desc')
            ->limit(10)
            ->get();

        // Statistics
        $stats = [
            'total_eligible' => $eligibleScholars->count(),
            'expiring_soon' => $scholarsNeedingRenewal->count(),
            'renewed_this_period' => ScholarshipRecipient::query()
                ->where('academic_year', $academicYear)
                ->where('semester', $semester)
                ->where('renewal_status', 'Approved')
                ->count(),
            'total_active' => ScholarshipRecipient::where('status', 'Active')->count(),
        ];

        return Inertia::render('sas/admin/renewals/index', [
            'eligibleScholars' => $eligibleScholars,
            'scholarsNeedingRenewal' => $scholarsNeedingRenewal,
            'recentRenewals' => $recentRenewals,
            'stats' => $stats,
            'scholarships' => Scholarship::select('id', 'scholarship_name')->orderBy('scholarship_name')->get(),
            'filters' => [
                'academic_year' => $academicYear,
                'semester' => $semester,
            ],
        ]);
    }

    /**
     * Send renewal reminders to eligible scholars.
     */
    public function sendReminders(Request $request)
    {
        $validated = $request->validate([
            'academic_year' => 'required|string',
            'semester' => 'required|string|in:1st,2nd',
        ]);

        $count = $this->renewalService->sendRenewalReminders(
            $validated['academic_year'],
            $validated['semester']
        );

        return back()->with('success', "Sent renewal reminders to {$count} scholars.");
    }

    /**
     * Create a renewal application for a specific scholar.
     */
    public function createRenewal(Request $request, int $recipientId)
    {
        $validated = $request->validate([
            'academic_year' => 'required|string',
            'semester' => 'required|string|in:1st,2nd',
            'remarks' => 'nullable|string|max:500',
        ]);

        $previousRecipient = ScholarshipRecipient::findOrFail($recipientId);

        $renewal = $this->renewalService->createRenewalApplication($previousRecipient, [
            'academic_year' => $validated['academic_year'],
            'semester' => $validated['semester'],
            'remarks' => $validated['remarks'] ?? null,
            'created_by' => auth()->id(),
        ]);

        if ($renewal) {
            return back()->with('success', 'Scholarship renewal created successfully.');
        }

        return back()->with('error', 'Renewal already exists for this period.');
    }

    /**
     * Bulk create renewals for selected scholars.
     */
    public function bulkRenew(Request $request)
    {
        $validated = $request->validate([
            'recipient_ids' => 'required|array|min:1',
            'recipient_ids.*' => 'exists:scholarship_recipients,id',
            'academic_year' => 'required|string',
            'semester' => 'required|string|in:1st,2nd',
        ]);

        $successCount = 0;
        $failedCount = 0;

        foreach ($validated['recipient_ids'] as $recipientId) {
            $previousRecipient = ScholarshipRecipient::find($recipientId);
            if ($previousRecipient) {
                $renewal = $this->renewalService->createRenewalApplication($previousRecipient, [
                    'academic_year' => $validated['academic_year'],
                    'semester' => $validated['semester'],
                    'created_by' => auth()->id(),
                ]);

                if ($renewal) {
                    $successCount++;
                } else {
                    $failedCount++;
                }
            }
        }

        $message = "Created {$successCount} renewal(s).";
        if ($failedCount > 0) {
            $message .= " {$failedCount} already had renewals for this period.";
        }

        return back()->with('success', $message);
    }

    /**
     * Get renewal history for a student.
     */
    public function history(int $studentId)
    {
        $history = $this->renewalService->getRenewalHistory($studentId);

        return response()->json([
            'history' => $history,
        ]);
    }
}
