<?php

namespace App\Modules\Registrar\Http\Controllers;

use App\Enums\DocumentRequestStatus;
use App\Enums\DocumentType;
use App\Models\AuditLog;
use App\Modules\Registrar\Http\Requests\ConfirmClaimRequest;
use App\Modules\Registrar\Http\Requests\StoreDocumentRequest;
use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Services\NotificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DocumentRequestController extends Controller
{
    public function __construct(
        private NotificationService $notificationService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $user = Auth::user();

        // For students, show their own requests
        // For staff, show all or filtered requests
        $requests = DocumentRequest::with([
            'student.user',
            'latestPayment',
            'processor:id,first_name,last_name',
            'releaser:id,first_name,last_name',
        ])
            ->when($user->student, function ($query) use ($user) {
                return $query->where('student_id', $user->student->student_id);
            })
            ->latest()
            ->paginate(15);

        return Inertia::render('registrar/document-requests/index', [
            'requests' => $requests,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $user = Auth::user();
        $student = $user->student;

        if (! $student) {
            return back()->withErrors(['student' => 'Student record not found. Please contact registrar.']);
        }

        $dailyLimit = config('app.document_request_daily_limit', 5);
        $todayCount = DocumentRequest::getTodayRequestCount($student->student_id);
        $remaining = DocumentRequest::getRemainingDailyRequests($student->student_id);
        $hasReachedLimit = DocumentRequest::hasReachedDailyLimit($student->student_id);

        return Inertia::render('registrar/document-requests/create', [
            'documentTypes' => DocumentType::withPrices(),
            'dailyLimit' => $dailyLimit,
            'todayCount' => $todayCount,
            'remaining' => $remaining,
            'hasReachedLimit' => $hasReachedLimit,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $student = $user->student;

        if (! $student) {
            return back()->withErrors(['student' => 'Student record not found. Please contact registrar.']);
        }

        $validated = $request->validated();

        // Get document type enum and calculate amount
        $documentType = DocumentType::from($validated['document_type']);
        $amount = $documentType->basePrice() * $validated['quantity'];

        $createdRequest = DocumentRequest::create([
            'request_number' => DocumentRequest::generateRequestNumber(),
            'student_id' => $student->student_id,
            'document_type' => $validated['document_type'],
            'quantity' => $validated['quantity'],
            'purpose' => $validated['purpose'],
            'amount' => $amount,
            'payment_method' => null, // Will be set during payment
            'status' => 'pending_payment',
            'payment_deadline' => now()->addHours(48),
        ]);

        // Log document request creation
        if ($createdRequest) {
            AuditLog::log(
                'document_request_created',
                $user->id,
                DocumentRequest::class,
                $createdRequest->id,
                null,
                $createdRequest->toArray(),
                "Document request {$createdRequest->request_number} created by student",
                [
                    'request_number' => $createdRequest->request_number,
                    'document_type' => $createdRequest->document_type,
                    'quantity' => $createdRequest->quantity,
                    'amount' => $createdRequest->amount,
                ]
            );
        }

        // Send notification
        if ($createdRequest) {
            $this->notificationService->notifyRequestSubmitted($createdRequest);
        }

        return redirect()->route('registrar.document-requests.index')
            ->with('success', 'Document request submitted successfully. Please complete payment within 48 hours.');
    }

    /**
     * Display the specified resource.
     */
    public function show(DocumentRequest $documentRequest): Response
    {
        $documentRequest->load(['student.user', 'payments', 'notifications']);

        return Inertia::render('registrar/document-requests/show', [
            'request' => $documentRequest,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DocumentRequest $documentRequest): Response
    {
        // Only allow editing if status is pending_payment
        if ($documentRequest->status !== DocumentRequestStatus::PendingPayment) {
            abort(403, 'Cannot edit request that is already being processed.');
        }

        $documentRequest->load(['student.user']);

        return Inertia::render('registrar/document-requests/edit', [
            'request' => $documentRequest,
            'documentTypes' => DocumentType::withPrices(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreDocumentRequest $request, DocumentRequest $documentRequest): RedirectResponse
    {
        if ($documentRequest->status !== DocumentRequestStatus::PendingPayment) {
            abort(403, 'Cannot update request that is already being processed.');
        }

        $validated = $request->validated();

        // Get document type enum and recalculate amount
        $documentType = DocumentType::from($validated['document_type']);
        $amount = $documentType->basePrice() * $validated['quantity'];

        $documentRequest->update([
            'document_type' => $validated['document_type'],
            'quantity' => $validated['quantity'],
            'purpose' => $validated['purpose'],
            'amount' => $amount,
        ]);

        return redirect()->route('registrar.document-requests.index')
            ->with('success', 'Document request updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DocumentRequest $documentRequest): RedirectResponse
    {
        if (! in_array($documentRequest->status, [DocumentRequestStatus::PendingPayment, DocumentRequestStatus::PaymentExpired, DocumentRequestStatus::Cancelled])) {
            abort(403, 'Cannot delete request that is being processed.');
        }

        $documentRequest->delete();

        return redirect()->route('registrar.document-requests.index')
            ->with('success', 'Document request deleted successfully.');
    }

    /**
     * Confirm document claim by student
     */
    public function confirmClaim(ConfirmClaimRequest $request, DocumentRequest $documentRequest): RedirectResponse
    {
        $user = Auth::user();

        // Ensure the request belongs to the current user's student record
        if (! $user->student || $documentRequest->student_id !== $user->student->student_id) {
            abort(403, 'Unauthorized access to this request.');
        }

        // Only ready_for_claim requests can be confirmed
        if ($documentRequest->status->value !== 'ready_for_claim') {
            return back()->withErrors([
                'claim' => 'This document is not ready for claim yet.',
            ]);
        }

        if ($request->confirmation) {
            // Mark as claimed
            $documentRequest->markAsClaimed();

            if ($request->claim_notes) {
                $documentRequest->claim_notes = $request->claim_notes;
                $documentRequest->save();
            }

            // Log the claim confirmation
            AuditLog::log(
                'document_claimed',
                $user->id,
                DocumentRequest::class,
                $documentRequest->id,
                null,
                $documentRequest->toArray(),
                'Student confirmed document claim'
            );

            // Send notification to registrar staff
            $this->notificationService->notifyStudentClaimed($documentRequest);

            return back()->with('success', 'Document claim confirmed! You can now collect your document from the registrar office.');
        }

        return back()->withErrors([
            'confirmation' => 'Please confirm to proceed.',
        ]);
    }
}
