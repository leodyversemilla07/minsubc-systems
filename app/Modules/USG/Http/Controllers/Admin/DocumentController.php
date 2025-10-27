<?php

namespace App\Modules\USG\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\USG\Http\Requests\StoreDocumentRequest;
use App\Modules\USG\Http\Requests\UpdateDocumentRequest;
use App\Modules\USG\Models\Document;
use App\Modules\USG\Services\DocumentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class DocumentController extends Controller
{
    public function __construct(
        private DocumentService $documentService
    ) {}

    /**
     * Display a listing of documents
     */
    public function index(Request $request): Response
    {
        $search = $request->get('search');
        $category = $request->get('category');

        if ($search || $category) {
            $documents = $this->documentService->searchDocuments($search ?? '', [
                'category' => $category,
            ]);
        } else {
            $documents = $this->documentService->getAllPaginated(15);
        }

        $categories = $this->documentService->getCategories();
        $statistics = $this->documentService->getStatistics();

        return Inertia::render('usg/admin/documents/index', [
            'documents' => $documents,
            'categories' => $categories,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }

    /**
     * Show the form for creating a new document
     */
    public function create(): Response
    {
        $categories = $this->documentService->getCategories();

        return Inertia::render('usg/admin/documents/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created document
     */
    public function store(StoreDocumentRequest $request): RedirectResponse
    {
        $this->documentService->create(
            $request->validated(),
            Auth::id()
        );

        return redirect()
            ->route('usg.admin.documents.index')
            ->with('success', 'Document uploaded successfully.');
    }

    /**
     * Display the specified document
     */
    public function show(Document $document): Response
    {
        $document->load('uploader');

        return Inertia::render('usg/admin/documents/show', [
            'document' => $document,
        ]);
    }

    /**
     * Show the form for editing the specified document
     */
    public function edit(Document $document): Response
    {
        $document->load('uploader');
        $categories = $this->documentService->getCategories();

        return Inertia::render('usg/admin/documents/edit', [
            'document' => $document,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified document
     */
    public function update(UpdateDocumentRequest $request, Document $document): RedirectResponse
    {
        $this->documentService->update($document, $request->validated());

        return redirect()
            ->route('usg.admin.documents.index')
            ->with('success', 'Document updated successfully.');
    }

    /**
     * Remove the specified document
     */
    public function destroy(Document $document): RedirectResponse
    {
        $this->documentService->delete($document);

        return redirect()
            ->route('usg.admin.documents.index')
            ->with('success', 'Document deleted successfully.');
    }

    /**
     * Download the specified document
     */
    public function download(Document $document): BinaryFileResponse
    {
        if (! $document->file_path || ! Storage::disk('public')->exists($document->file_path)) {
            abort(404, 'Document file not found');
        }

        // Increment download count
        $this->documentService->incrementDownloadCount($document);

        return response()->download(
            Storage::disk('public')->path($document->file_path),
            $document->file_name
        );
    }
}
