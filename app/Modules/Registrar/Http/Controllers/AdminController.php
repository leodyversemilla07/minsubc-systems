<?php

namespace App\Modules\Registrar\Http\Controllers;

use App\Modules\Registrar\Models\DocumentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Show the admin dashboard
     */
    public function dashboard()
    {
        $stats = [
            'pending_requests' => DocumentRequest::where('status', 'pending_payment')->count(),
            'paid_requests' => DocumentRequest::where('status', 'paid')->count(),
            'processing_requests' => DocumentRequest::where('status', 'processing')->count(),
            'ready_for_pickup' => DocumentRequest::where('status', 'ready_for_pickup')->count(),
            'total_today' => DocumentRequest::whereDate('created_at', today())->count(),
        ];

        $recentRequests = DocumentRequest::with(['student.user'])
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('registrar/admin/dashboard', [
            'stats' => $stats,
            'recentRequests' => $recentRequests,
        ]);
    }

    /**
     * Show all requests for admin management
     */
    public function requests(Request $request)
    {
        $query = DocumentRequest::with(['student.user', 'payments']);

        // Filter by status
        if ($request->status) {
            $query->where('status', $request->status);
        }

        // Filter by date range
        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $requests = $query->latest()->paginate(20);

        return Inertia::render('registrar/admin/requests', [
            'requests' => $requests,
            'filters' => $request->only(['status', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Update request status
     */
    public function updateStatus(Request $request, DocumentRequest $documentRequest)
    {
        $request->validate([
            'status' => 'required|string|in:pending_payment,paid,processing,ready_for_pickup,released,cancelled',
            'notes' => 'nullable|string|max:500',
        ]);

        $oldStatus = $documentRequest->status;
        $documentRequest->update([
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        // Send notifications based on status change
        if ($request->status === 'ready_for_pickup' && $oldStatus !== 'ready_for_pickup') {
            // Notify student that document is ready
            // $this->notificationService->notifyDocumentReady($documentRequest);
        } elseif ($request->status === 'released' && $oldStatus !== 'released') {
            // Notify student that document is released
            // $this->notificationService->notifyDocumentReleased($documentRequest);
        }

        return back()->with('success', 'Request status updated successfully.');
    }

    /**
     * Mark document as ready for pickup
     */
    public function markReady(DocumentRequest $documentRequest)
    {
        if ($documentRequest->status !== 'processing') {
            return back()->with('error', 'Request must be in processing status.');
        }

        $documentRequest->update([
            'status' => 'ready_for_pickup',
            'processed_by' => Auth::id(),
        ]);

        // TODO: Send notification to student

        return back()->with('success', 'Document marked as ready for pickup.');
    }

    /**
     * Release document to student
     */
    public function releaseDocument(Request $request, DocumentRequest $documentRequest)
    {
        $request->validate([
            'released_to' => 'required|string|max:100',
            'released_id_type' => 'required|string|in:student_id,drivers_license,passport,others',
            'released_id_number' => 'nullable|string|max:50',
        ]);

        if ($documentRequest->status !== 'ready_for_pickup') {
            return back()->with('error', 'Document must be ready for pickup first.');
        }

        $documentRequest->update([
            'status' => 'released',
            'released_by' => Auth::id(),
            'released_to' => $request->released_to,
            'released_id_type' => $request->released_id_type,
            'released_id_number' => $request->released_id_number,
            'released_at' => now(),
        ]);

        // TODO: Send notification to student

        return back()->with('success', 'Document released successfully.');
    }
}
