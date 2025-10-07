<?php

namespace App\Modules\Registrar\Http\Controllers;

use App\Modules\Registrar\Http\Requests\StoreDocumentRequest;
use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DocumentRequestController extends Controller
{
    public function __construct(
        private NotificationService $notificationService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        // For students, show their own requests
        // For staff, show all or filtered requests
        $requests = DocumentRequest::with(['student.user'])
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
    public function create()
    {
        return Inertia::render('registrar/document-requests/create', [
            'documentTypes' => [
                'coe' => 'Certificate of Enrollment',
                'cog' => 'Certificate of Grades',
                'tor' => 'Transcript of Records',
                'honorable_dismissal' => 'Honorable Dismissal',
                'certificate_good_moral' => 'Certificate of Good Moral Character',
                'cav' => 'Certificate of Authentication and Verification',
                'diploma' => 'Diploma (Certified True Copy)',
                'so' => 'Special Order',
                'form_137' => 'Form 137',
            ],
            'processingTypes' => [
                'regular' => ['label' => 'Regular Processing', 'days' => '5-7 working days', 'price' => 50],
                'rush' => ['label' => 'Rush Processing', 'days' => '2-3 working days', 'price' => 150],
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request)
    {
        $user = Auth::user();
        $student = $user->student;

        if (! $student) {
            return back()->withErrors(['student' => 'Student record not found. Please contact registrar.']);
        }

        $validated = $request->validated();

        // Calculate amount based on processing type
        $basePrice = $validated['processing_type'] === 'rush' ? 150 : 50;
        $amount = $basePrice * $validated['quantity'];

        $createdRequest = null;
        DB::transaction(function () use ($student, $validated, $amount, &$createdRequest) {
            $createdRequest = DocumentRequest::create([
                'request_number' => $this->generateRequestNumber(),
                'student_id' => $student->student_id,
                'document_type' => $validated['document_type'],
                'processing_type' => $validated['processing_type'],
                'quantity' => $validated['quantity'],
                'purpose' => $validated['purpose'],
                'amount' => $amount,
                'payment_method' => 'pending', // Will be set during payment
                'status' => 'pending_payment',
                'payment_deadline' => now()->addHours(48),
            ]);
        });

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
    public function show(DocumentRequest $documentRequest)
    {
        $documentRequest->load(['student', 'payments', 'notifications']);

        return Inertia::render('registrar/document-requests/show', [
            'request' => $documentRequest,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DocumentRequest $documentRequest)
    {
        // Only allow editing if status is pending_payment
        if ($documentRequest->status !== 'pending_payment') {
            abort(403, 'Cannot edit request that is already being processed.');
        }

        return Inertia::render('registrar/document-requests/edit', [
            'request' => $documentRequest,
            'documentTypes' => [
                'coe' => 'Certificate of Enrollment',
                'cog' => 'Certificate of Grades',
                'tor' => 'Transcript of Records',
                'honorable_dismissal' => 'Honorable Dismissal',
                'certificate_good_moral' => 'Certificate of Good Moral Character',
                'cav' => 'Certificate of Authentication and Verification',
                'diploma' => 'Diploma (Certified True Copy)',
                'so' => 'Special Order',
                'form_137' => 'Form 137',
            ],
            'processingTypes' => [
                'regular' => ['label' => 'Regular Processing', 'days' => '5-7 working days', 'price' => 50],
                'rush' => ['label' => 'Rush Processing', 'days' => '2-3 working days', 'price' => 150],
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreDocumentRequest $request, DocumentRequest $documentRequest)
    {
        if ($documentRequest->status !== 'pending_payment') {
            abort(403, 'Cannot update request that is already being processed.');
        }

        $validated = $request->validated();

        // Recalculate amount
        $basePrice = $validated['processing_type'] === 'rush' ? 150 : 50;
        $amount = $basePrice * $validated['quantity'];

        $documentRequest->update([
            'document_type' => $validated['document_type'],
            'processing_type' => $validated['processing_type'],
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
    public function destroy(DocumentRequest $documentRequest)
    {
        if (! in_array($documentRequest->status, ['pending_payment', 'payment_expired', 'cancelled'])) {
            abort(403, 'Cannot delete request that is being processed.');
        }

        $documentRequest->delete();

        return redirect()->route('registrar.document-requests.index')
            ->with('success', 'Document request deleted successfully.');
    }

    /**
     * Generate a unique request number.
     */
    private function generateRequestNumber(): string
    {
        do {
            $number = 'REQ-'.now()->format('Ymd').'-'.str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        } while (DocumentRequest::where('request_number', $number)->exists());

        return $number;
    }
}
