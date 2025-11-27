<?php

namespace Modules\Registrar\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Modules\Registrar\Models\DocumentRequest;

class BulkOperationsController extends Controller
{
    /**
     * Bulk update request status.
     */
    public function bulkUpdateStatus(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'request_ids' => 'required|array|min:1',
            'request_ids.*' => 'exists:document_requests,id',
            'status' => 'required|in:pending,processing,ready_for_release,released,rejected',
        ]);

        $count = DocumentRequest::whereIn('id', $validated['request_ids'])
            ->update([
                'status' => $validated['status'],
            ]);

        return back()->with('success', "{$count} requests updated to {$validated['status']}");
    }

    /**
     * Bulk assign requests to staff.
     */
    public function bulkAssign(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'request_ids' => 'required|array|min:1',
            'request_ids.*' => 'exists:document_requests,id',
            'assigned_to' => 'required|exists:users,id',
        ]);

        $count = DocumentRequest::whereIn('id', $validated['request_ids'])
            ->update([
                'assigned_to' => $validated['assigned_to'],
            ]);

        return back()->with('success', "{$count} requests assigned successfully");
    }

    /**
     * Bulk release documents.
     */
    public function bulkRelease(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'request_ids' => 'required|array|min:1',
            'request_ids.*' => 'exists:document_requests,id',
        ]);

        $count = DocumentRequest::whereIn('id', $validated['request_ids'])
            ->whereIn('status', ['ready_for_claim', 'processing'])
            ->update([
                'status' => 'released',
                'released_at' => now(),
                'released_by' => $request->user()?->id,
            ]);

        if ($count === 0) {
            return back()->with('error', 'No eligible requests found for release');
        }

        return back()->with('success', "{$count} documents released successfully");
    }

    /**
     * Bulk reject requests.
     */
    public function bulkReject(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'request_ids' => 'required|array|min:1',
            'request_ids.*' => 'exists:document_requests,id',
            'rejection_reason' => 'required|string|max:500',
        ]);

        $count = DocumentRequest::whereIn('id', $validated['request_ids'])
            ->update([
                'status' => 'rejected',
                'rejection_reason' => $validated['rejection_reason'],
            ]);

        return back()->with('success', "{$count} requests rejected");
    }

    /**
     * Bulk delete requests.
     */
    public function bulkDelete(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'request_ids' => 'required|array|min:1',
            'request_ids.*' => 'exists:document_requests,id',
        ]);

        $count = DocumentRequest::whereIn('id', $validated['request_ids'])
            ->delete();

        return back()->with('success', "{$count} requests deleted");
    }
}
