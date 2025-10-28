<?php

namespace App\Modules\USG\Services;

use App\Modules\USG\Models\Document;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

class DocumentService
{
    public function __construct(
        private FileUploadService $fileUploadService
    ) {}

    /**
     * Get all documents with pagination
     */
    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Document::with('uploader')
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Get public documents
     */
    public function getPublicDocuments(int $perPage = 15): LengthAwarePaginator
    {
        return Document::public()
            ->with('uploader')
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Get documents by category
     *
     * @param  string  $category  Category name
     * @param  int  $perPage  Items per page
     */
    public function getDocumentsByCategory(string $category, int $perPage = 15): LengthAwarePaginator
    {
        return Document::byCategory($category)
            ->with('uploader')
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Search documents
     *
     * @param  string  $query  Search query
     * @param  array<string, mixed>  $filters  Additional filters
     */
    public function searchDocuments(string $query = '', array $filters = []): LengthAwarePaginator
    {
        $documents = Document::query()->with('uploader');

        if (! empty($query)) {
            $documents->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%")
                    ->orWhere('file_name', 'like', "%{$query}%");
            });
        }

        if (isset($filters['category']) && ! empty($filters['category'])) {
            $documents->where('category', $filters['category']);
        }

        if (isset($filters['is_public'])) {
            $documents->where('is_public', $filters['is_public']);
        }

        return $documents->latest()->paginate(15);
    }

    /**
     * Create new document
     *
     * @param  array<string, mixed>  $data  Document data
     * @param  int  $uploadedBy  User ID
     */
    public function create(array $data, int $uploadedBy): Document
    {
        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {
            $fileData = $this->fileUploadService->uploadDocument($data['file'], 'usg/documents');

            $data['file_path'] = $fileData['path'];
            $data['file_name'] = $fileData['original_name'];
            $data['file_size'] = $fileData['size'];
            $data['mime_type'] = $fileData['mime_type'];

            unset($data['file']);
        }

        return Document::create([
            ...$data,
            'uploaded_by' => $uploadedBy,
            'download_count' => 0,
        ]);
    }

    /**
     * Update document
     *
     * @param  Document  $document  Document to update
     * @param  array<string, mixed>  $data  Updated data
     */
    public function update(Document $document, array $data): Document
    {
        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {
            // Delete old file
            if ($document->file_path) {
                $this->fileUploadService->deleteFile($document->file_path);
            }

            // Upload new file
            $fileData = $this->fileUploadService->uploadDocument($data['file'], 'usg/documents');

            $data['file_path'] = $fileData['path'];
            $data['file_name'] = $fileData['original_name'];
            $data['file_size'] = $fileData['size'];
            $data['mime_type'] = $fileData['mime_type'];

            unset($data['file']);
        }

        $document->update($data);

        return $document->fresh();
    }

    /**
     * Delete document
     *
     * @param  Document  $document  Document to delete
     */
    public function delete(Document $document): bool
    {
        // Delete associated file
        if ($document->file_path) {
            $this->fileUploadService->deleteFile($document->file_path);
        }

        return $document->delete();
    }

    /**
     * Increment download count
     */
    public function incrementDownloadCount(Document $document): void
    {
        $document->recordDownload(
            userId: auth()->id(),
            ipAddress: request()->ip(),
            userAgent: request()->userAgent()
        );
    }

    /**
     * Get document categories
     *
     * @return array<int, string>
     */
    public function getCategories(): array
    {
        return Document::distinct('category')
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->pluck('category')
            ->sort()
            ->values()
            ->toArray();
    }

    /**
     * Get document by ID
     *
     * @param  int  $id  Document ID
     */
    public function getById(int $id): ?Document
    {
        return Document::with('uploader')->find($id);
    }

    /**
     * Get recent documents
     *
     * @param  int  $limit  Number of documents to retrieve
     */
    public function getRecentDocuments(int $limit = 10): Collection
    {
        return Document::public()
            ->with('uploader')
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Get popular documents (by download count)
     *
     * @param  int  $limit  Number of documents to retrieve
     */
    public function getPopularDocuments(int $limit = 10): Collection
    {
        return Document::public()
            ->with('uploader')
            ->orderBy('download_count', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get document statistics
     *
     * @return array{
     *     total: int,
     *     public: int,
     *     private: int,
     *     total_downloads: int,
     *     categories_count: int
     * }
     */
    public function getStatistics(): array
    {
        return [
            'total' => Document::count(),
            'public' => Document::where('is_public', true)->count(),
            'private' => Document::where('is_public', false)->count(),
            'total_downloads' => Document::sum('download_count'),
            'categories_count' => Document::distinct('category')->count('category'),
        ];
    }

    /**
     * Toggle document visibility
     */
    public function toggleVisibility(Document $document): Document
    {
        $document->update([
            'is_public' => ! $document->is_public,
        ]);

        return $document->fresh();
    }
}
