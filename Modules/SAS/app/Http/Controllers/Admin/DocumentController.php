<?php

namespace Modules\SAS\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\SAS\Http\Requests\UpdateDigitalizedDocumentRequest;
use Modules\SAS\Http\Requests\UploadDigitalizedDocumentRequest;
use Modules\SAS\Models\DigitalizedDocument;
use Modules\SAS\Services\DocumentService;

class DocumentController extends Controller
{
    public function __construct(
        protected DocumentService $documentService
    ) {}

    /**
     * Display a listing of all digitalized documents.
     */
    public function index(Request $request): Response
    {
        $documents = $this->documentService->getDocuments([
            'document_category' => $request->input('document_category'),
            'document_type' => $request->input('document_type'),
            'academic_year' => $request->input('academic_year'),
            'disposal_status' => $request->input('disposal_status'),
            'search' => $request->input('search'),
        ], $request->input('per_page', 15));

        return Inertia::render('sas/admin/documents/index', [
            'documents' => $documents,
            'filters' => $request->only(['document_category', 'document_type', 'academic_year', 'disposal_status', 'search']),
        ]);
    }

    /**
     * Show the form for uploading a new document.
     */
    public function create(): Response
    {
        return Inertia::render('sas/admin/documents/upload');
    }

    /**
     * Store a newly uploaded document.
     */
    public function store(UploadDigitalizedDocumentRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['uploaded_by'] = $request->user()->id;

        $this->documentService->uploadDocument($data);

        return redirect()->route('sas.admin.documents.index')
            ->with('success', 'Document uploaded successfully.');
    }

    /**
     * Display the specified document.
     */
    public function show(int $id): Response
    {
        $document = $this->documentService->getDocumentById($id);

        return Inertia::render('sas/admin/documents/show', [
            'document' => $document,
        ]);
    }

    /**
     * Show the form for editing the specified document.
     */
    public function edit(int $id): Response
    {
        $document = $this->documentService->getDocumentById($id);

        return Inertia::render('sas/admin/documents/edit', [
            'document' => $document,
        ]);
    }

    /**
     * Update the specified document.
     */
    public function update(UpdateDigitalizedDocumentRequest $request, int $id): RedirectResponse
    {
        $document = DigitalizedDocument::findOrFail($id);

        $this->documentService->updateDocument($document, $request->validated());

        return redirect()->route('sas.admin.documents.index')
            ->with('success', 'Document updated successfully.');
    }

    /**
     * Remove the specified document.
     */
    public function destroy(int $id): RedirectResponse
    {
        $document = DigitalizedDocument::findOrFail($id);

        $this->documentService->deleteDocument($document);

        return redirect()->route('sas.admin.documents.index')
            ->with('success', 'Document deleted successfully.');
    }

    /**
     * Display documents pending disposal approval.
     */
    public function manageDisposal(): Response
    {
        $documents = $this->documentService->getDocumentsPendingDisposal();

        return Inertia::render('sas/admin/documents/manage-disposal', [
            'documents' => $documents,
        ]);
    }

    /**
     * Update disposal status for a document.
     */
    public function updateDisposalStatus(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'disposal_status' => 'required|in:Physical Copy Exists,Pending Disposal Approval,Approved for Disposal,Disposed',
            'disposal_permit_number' => 'nullable|string',
            'disposal_date' => 'nullable|date',
        ]);

        $document = DigitalizedDocument::findOrFail($id);

        $this->documentService->updateDisposalStatus(
            $document,
            $request->input('disposal_status'),
            $request->input('disposal_permit_number'),
            $request->input('disposal_date')
        );

        return redirect()->back()->with('success', 'Disposal status updated successfully.');
    }
}
