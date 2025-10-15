<?php

namespace App\Modules\Registrar\Http\Controllers;

use App\Models\AuditLog;
use App\Modules\Registrar\Models\DocumentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Show the admin dashboard
     */
    public function dashboard(Request $request)
    {
        $query = DocumentRequest::with([
            'student.user',
            'payments',
            'latestPayment',
            'processor:id,first_name,last_name',
            'releaser:id,first_name,last_name',
        ]);

        // Filter by status
        if ($request->status && $request->status !== 'all') {
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

        // Calculate stats
        $stats = [
            'total' => DocumentRequest::count(),
            'pending_payment' => DocumentRequest::where('status', 'pending_payment')->count(),
            'paid' => DocumentRequest::where('status', 'paid')->count(),
            'processing' => DocumentRequest::where('status', 'processing')->count(),
            'ready_for_claim' => DocumentRequest::where('status', 'ready_for_claim')->count(),
            'claimed' => DocumentRequest::where('status', 'claimed')->count(),
        ];

        return Inertia::render('registrar/admin/dashboard', [
            'requests' => $requests,
            'filters' => $request->only(['status', 'date_from', 'date_to']),
            'stats' => $stats,
        ]);
    }

    /**
     * Show a specific document request
     */
    public function show(DocumentRequest $documentRequest)
    {
        $documentRequest->load([
            'student.user',
            'payments',
            'processor:id,first_name,last_name',
            'releaser:id,first_name,last_name',
            'notifications',
        ]);

        return Inertia::render('registrar/admin/show', [
            'request' => $documentRequest,
        ]);
    }

    /**
     * Update request status
     */
    public function updateStatus(Request $request, DocumentRequest $documentRequest)
    {
        $request->validate([
            'status' => 'required|string|in:pending_payment,payment_expired,paid,processing,ready_for_claim,claimed,released,cancelled,rejected',
            'notes' => 'nullable|string|max:500',
        ]);

        $oldStatus = $documentRequest->status;
        $oldRequest = $documentRequest->toArray();

        $documentRequest->update([
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        // Log status change
        AuditLog::log(
            'document_request_status_updated',
            Auth::id(),
            DocumentRequest::class,
            $documentRequest->id,
            $oldRequest,
            $documentRequest->fresh()->toArray(),
            "Document request {$documentRequest->request_number} status changed from {$oldStatus} to {$request->status}",
            [
                'request_number' => $documentRequest->request_number,
                'old_status' => $oldStatus,
                'new_status' => $request->status,
                'updated_by' => Auth::user()->name,
                'notes' => $request->notes,
            ]
        );

        // Send notifications based on status change
        if ($request->status === 'ready_for_claim' && $oldStatus !== 'ready_for_claim') {
            // Notify student that document is ready
            // $this->notificationService->notifyDocumentReady($documentRequest);
        } elseif ($request->status === 'released' && $oldStatus !== 'released') {
            // Notify student that document is released
            // $this->notificationService->notifyDocumentReleased($documentRequest);
        }

        return redirect()->route('registrar.admin.dashboard')
            ->with('success', 'Request status updated successfully.');
    }

    /**
     * Mark document as ready for pickup
     */
    public function markReady(DocumentRequest $documentRequest)
    {
        if ($documentRequest->status !== 'processing') {
            return redirect()->route('registrar.admin.dashboard')
                ->with('error', 'Request must be in processing status.');
        }

        $oldRequest = $documentRequest->toArray();

        // Update request status - Registrar will handle document generation using their own software
        $documentRequest->update([
            'status' => 'ready_for_claim',
            'processed_by' => Auth::id(),
        ]);

        // Log status change
        AuditLog::log(
            'document_ready',
            Auth::id(),
            DocumentRequest::class,
            $documentRequest->id,
            $oldRequest,
            $documentRequest->fresh()->toArray(),
            "Document marked as ready for claim for request {$documentRequest->request_number}",
            [
                'request_number' => $documentRequest->request_number,
                'document_type' => $documentRequest->document_type,
                'processed_by' => Auth::user()->name,
                'marked_ready_at' => now()->toISOString(),
            ]
        );

        // TODO: Send notification to student

        return redirect()->route('registrar.admin.dashboard')
            ->with('success', 'Document marked as ready for claim.');
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

        if ($documentRequest->status !== 'ready_for_claim') {
            return redirect()->route('registrar.admin.dashboard')
                ->with('error', 'Document must be ready for claim first.');
        }

        $oldRequest = $documentRequest->toArray();

        $documentRequest->update([
            'status' => 'released',
            'released_by' => Auth::id(),
            'released_to' => $request->released_to,
            'released_id_type' => $request->released_id_type,
            'released_id_number' => $request->released_id_number,
            'released_at' => now(),
        ]);

        // Log document release
        AuditLog::log(
            'document_released',
            Auth::id(),
            DocumentRequest::class,
            $documentRequest->id,
            $oldRequest,
            $documentRequest->fresh()->toArray(),
            "Document released for request {$documentRequest->request_number}",
            [
                'request_number' => $documentRequest->request_number,
                'document_type' => $documentRequest->document_type,
                'released_by' => Auth::user()->name,
                'released_to' => $request->released_to,
                'released_id_type' => $request->released_id_type,
                'released_id_number' => $request->released_id_number,
                'released_at' => now()->toISOString(),
            ]
        );

        // TODO: Send notification to student

        return redirect()->route('registrar.admin.dashboard')
            ->with('success', 'Document released successfully.');
    }

    /**
     * Show audit logs for admin review
     */
    public function auditLogs(Request $request)
    {
        $query = AuditLog::with(['user'])
            ->latest();

        // Filter by action
        if ($request->action) {
            $query->where('action', $request->action);
        }

        // Filter by user
        if ($request->user_id) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by model type
        if ($request->model_type) {
            $query->where('model_type', $request->model_type);
        }

        // Filter by date range
        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }
        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Search in description
        if ($request->search) {
            $query->where('description', 'like', '%'.$request->search.'%');
        }

        $auditLogs = $query->paginate(50);

        // Get unique actions for filter dropdown
        $actions = AuditLog::distinct('action')->pluck('action')->sort();

        // Get users who have audit logs
        $users = \App\Models\User::whereHas('auditLogs')
            ->select('id', 'first_name', 'last_name', 'email')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ];
            });

        return Inertia::render('registrar/admin/audit-logs', [
            'auditLogs' => $auditLogs,
            'filters' => $request->only(['action', 'user_id', 'model_type', 'date_from', 'date_to', 'search']),
            'actions' => $actions,
            'users' => $users,
        ]);
    }

    /**
     * Show detailed audit log entry
     */
    public function showAuditLog(AuditLog $auditLog)
    {
        $auditLog->load(['user']);

        return Inertia::render('registrar/admin/audit-log-detail', [
            'auditLog' => $auditLog,
        ]);
    }
}
