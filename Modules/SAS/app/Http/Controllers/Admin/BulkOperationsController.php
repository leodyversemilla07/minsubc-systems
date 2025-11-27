<?php

namespace Modules\SAS\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\SAS\Models\InsuranceRecord;
use Modules\SAS\Models\ScholarshipRecipient;

class BulkOperationsController extends Controller
{
    /**
     * Bulk approve scholarship recipients.
     */
    public function bulkApproveScholarships(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'exists:scholarship_recipients,id',
        ]);
        $count = ScholarshipRecipient::whereIn('id', $validated['ids'])
            ->update([
                'status' => 'Active',
                'date_awarded' => now(),
                'updated_by' => Auth::id(),
            ]);

        return back()->with('success', "{$count} scholarship recipients approved");
    }

    /**
     * Bulk reject scholarship recipients.
     */
    public function bulkRejectScholarships(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'exists:scholarship_recipients,id',
            'rejection_reason' => 'required|string|max:500',
        ]);
        $count = ScholarshipRecipient::whereIn('id', $validated['ids'])
            ->update([
                'status' => 'Cancelled',
                'remarks' => $validated['rejection_reason'],
                'updated_by' => Auth::id(),
            ]);

        return back()->with('success', "{$count} scholarship recipients rejected");
    }

    /**
     * Bulk approve insurance records.
     */
    public function bulkApproveInsurance(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'exists:insurance_records,id',
        ]);
        $count = InsuranceRecord::whereIn('id', $validated['ids'])
            ->update([
                'status' => 'Approved',
                'reviewed_at' => now(),
                'reviewed_by' => Auth::id(),
            ]);

        return back()->with('success', "{$count} insurance records approved");
    }

    /**
     * Bulk reject insurance records.
     */
    public function bulkRejectInsurance(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'exists:insurance_records,id',
            'rejection_reason' => 'required|string|max:500',
        ]);
        $count = InsuranceRecord::whereIn('id', $validated['ids'])
            ->update([
                'status' => 'Rejected',
                'review_notes' => $validated['rejection_reason'],
                'reviewed_at' => now(),
                'reviewed_by' => Auth::id(),
            ]);

        return back()->with('success', "{$count} insurance records rejected");
    }

    public function bulkDeleteScholarships(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'exists:scholarship_recipients,id',
        ]);

        $count = ScholarshipRecipient::whereIn('id', $validated['ids'])
            ->delete();

        return back()->with('success', "{$count} scholarship records deleted");
    }

    /**
     * Bulk delete insurance records.
     */
    public function bulkDeleteInsurance(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'exists:insurance_records,id',
        ]);

        $count = InsuranceRecord::whereIn('id', $validated['ids'])
            ->delete();

        return back()->with('success', "{$count} insurance records deleted");
    }

    /**
     * Bulk update scholarship status.
     */
    public function bulkUpdateScholarshipStatus(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'exists:scholarship_recipients,id',
            'status' => 'required|in:Active,Inactive,Suspended,Expired',
        ]);

        $count = ScholarshipRecipient::whereIn('id', $validated['ids'])
            ->update([
                'status' => $validated['status'],
                'updated_by' => Auth::id(),
            ]);

        return back()->with('success', "{$count} scholarship statuses updated");
    }
}
