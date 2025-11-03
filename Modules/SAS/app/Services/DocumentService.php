<?php

namespace Modules\SAS\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Modules\SAS\Models\DigitalizedDocument;

class DocumentService
{
    /**
     * Get all digitalized documents with optional filters and pagination.
     */
    public function getDocuments(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = DigitalizedDocument::with('uploader');

        if (isset($filters['document_category'])) {
            $query->where('document_category', $filters['document_category']);
        }

        if (isset($filters['document_type'])) {
            $query->where('document_type', $filters['document_type']);
        }

        if (isset($filters['academic_year'])) {
            $query->where('academic_year', $filters['academic_year']);
        }

        if (isset($filters['disposal_status'])) {
            $query->where('disposal_status', $filters['disposal_status']);
        }

        if (isset($filters['is_public']) !== null) {
            $query->where('is_public', $filters['is_public']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('document_title', 'like', "%{$filters['search']}%")
                    ->orWhere('reference_number', 'like', "%{$filters['search']}%")
                    ->orWhere('document_type', 'like', "%{$filters['search']}%");
            });
        }

        return $query->orderBy('upload_date', 'desc')->paginate($perPage);
    }

    /**
     * Get a single document by ID.
     */
    public function getDocumentById(int $id): DigitalizedDocument
    {
        return DigitalizedDocument::with('uploader')->findOrFail($id);
    }

    /**
     * Upload a new digitalized document.
     */
    public function uploadDocument(array $data): DigitalizedDocument
    {
        if (isset($data['file'])) {
            $file = $data['file'];
            $data['file_path'] = $file->store('documents/digitalized', 'public');
            $data['file_name'] = $file->getClientOriginalName();
            $data['file_type'] = $file->getClientOriginalExtension();
            $data['file_size'] = $file->getSize();
        }

        $data['upload_date'] = now();

        return DigitalizedDocument::create($data);
    }

    /**
     * Update an existing digitalized document.
     */
    public function updateDocument(DigitalizedDocument $document, array $data): DigitalizedDocument
    {
        if (isset($data['file'])) {
            // Delete old file if exists
            if ($document->file_path) {
                Storage::disk('public')->delete($document->file_path);
            }

            $file = $data['file'];
            $data['file_path'] = $file->store('documents/digitalized', 'public');
            $data['file_name'] = $file->getClientOriginalName();
            $data['file_type'] = $file->getClientOriginalExtension();
            $data['file_size'] = $file->getSize();
        }

        $document->update($data);

        return $document->fresh();
    }

    /**
     * Delete a digitalized document and its associated file.
     */
    public function deleteDocument(DigitalizedDocument $document): bool
    {
        if ($document->file_path) {
            Storage::disk('public')->delete($document->file_path);
        }

        return $document->delete();
    }

    /**
     * Get documents by related entity (polymorphic relationship).
     */
    public function getDocumentsByEntity(string $entityType, int $entityId): Collection
    {
        return DigitalizedDocument::where('related_entity_type', $entityType)
            ->where('related_entity_id', $entityId)
            ->orderBy('upload_date', 'desc')
            ->get();
    }

    /**
     * Get documents pending disposal approval.
     */
    public function getDocumentsPendingDisposal(): Collection
    {
        return DigitalizedDocument::with('uploader')
            ->where('disposal_status', 'Pending Disposal Approval')
            ->orderBy('upload_date')
            ->get();
    }

    /**
     * Update disposal status for a document.
     */
    public function updateDisposalStatus(DigitalizedDocument $document, string $status, ?string $permitNumber = null, ?string $disposalDate = null): DigitalizedDocument
    {
        $document->update([
            'disposal_status' => $status,
            'disposal_permit_number' => $permitNumber,
            'disposal_date' => $disposalDate,
        ]);

        return $document->fresh();
    }

    /**
     * Get document statistics.
     */
    public function getDocumentStatistics(): array
    {
        return [
            'total_documents' => DigitalizedDocument::count(),
            'public_documents' => DigitalizedDocument::where('is_public', true)->count(),
            'private_documents' => DigitalizedDocument::where('is_public', false)->count(),
            'pending_disposal' => DigitalizedDocument::where('disposal_status', 'Pending Disposal Approval')->count(),
            'approved_for_disposal' => DigitalizedDocument::where('disposal_status', 'Approved for Disposal')->count(),
            'disposed_documents' => DigitalizedDocument::where('disposal_status', 'Disposed')->count(),
            'total_file_size' => DigitalizedDocument::sum('file_size'),
            'by_category' => DigitalizedDocument::selectRaw('document_category, COUNT(*) as count')
                ->groupBy('document_category')
                ->pluck('count', 'document_category'),
        ];
    }
}
