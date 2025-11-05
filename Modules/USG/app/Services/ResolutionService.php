<?php

namespace Modules\USG\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\USG\Models\Resolution;

class ResolutionService
{
    public function __construct(
        private FileUploadService $fileUploadService
    ) {}

    /**
     * Get published resolutions query
     */
    public function getPublishedQuery(): Builder
    {
        return Resolution::published()
            ->with(['submittedBy', 'approvedBy']);
    }

    /**
     * Get published resolutions with pagination
     */
    public function getPublishedResolutions(int $perPage = 15): LengthAwarePaginator
    {
        return Resolution::published()
            ->with(['submittedBy', 'approvedBy'])
            ->latest('resolution_date')
            ->paginate($perPage);
    }

    /**
     * Get archived resolutions
     */
    public function getArchivedResolutions(): Collection
    {
        return Resolution::archived()
            ->with('submittedBy')
            ->latest('created_at')
            ->get();
    }

    /**
     * Search resolutions with filters
     */
    public function searchResolutions(string $query = '', array $filters = []): LengthAwarePaginator
    {
        $resolutions = Resolution::published();

        if (! empty($query)) {
            $resolutions->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%")
                    ->orWhere('resolution_number', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%");
            });
        }

        if (isset($filters['category']) && ! empty($filters['category'])) {
            $resolutions->where('category', $filters['category']);
        }

        if (isset($filters['year']) && ! empty($filters['year'])) {
            $resolutions->whereYear('resolution_date', $filters['year']);
        }

        if (isset($filters['status']) && ! empty($filters['status'])) {
            $resolutions->where('status', $filters['status']);
        }

        return $resolutions->latest('resolution_date')->paginate(15);
    }

    /**
     * Create new resolution
     */
    public function create(array $data, int $submittedBy): Resolution
    {
        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {
            $fileData = $this->fileUploadService->uploadDocument($data['file'], 'usg/resolutions');
            $data['file_path'] = $fileData['path'];
            unset($data['file']);
        }

        // Generate resolution number if not provided
        if (empty($data['resolution_number'])) {
            $data['resolution_number'] = $this->generateResolutionNumber();
        }

        // Map date_passed to resolution_date for database
        if (isset($data['date_passed'])) {
            $data['resolution_date'] = $data['date_passed'];
            unset($data['date_passed']);
        }

        // Set default status to published (approved resolutions only)
        $status = $data['status'] ?? 'published';

        // If status is published, set published_at timestamp
        $publishedAt = $status === 'published' ? now() : null;

        return Resolution::create([
            'resolution_number' => $data['resolution_number'],
            'title' => $data['title'],
            'description' => $data['description'] ?? '',
            'content' => $data['description'] ?? '', // Use description as content for approved resolutions
            'category' => $data['category'] ?? null,
            'file_path' => $data['file_path'] ?? null,
            'status' => $status,
            'resolution_date' => $data['resolution_date'],
            'submitted_by' => $submittedBy,
            'published_at' => $publishedAt,
        ]);
    }

    /**
     * Update existing resolution
     */
    public function update(Resolution $resolution, array $data): Resolution
    {
        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {
            // Delete old file if exists
            if ($resolution->file_path) {
                $this->fileUploadService->deleteFile($resolution->file_path);
            }

            $fileData = $this->fileUploadService->uploadDocument($data['file'], 'usg/resolutions');
            $data['file_path'] = $fileData['path'];
            unset($data['file']);
        }

        // Map date_passed to resolution_date for database
        if (isset($data['date_passed'])) {
            $data['resolution_date'] = $data['date_passed'];
            unset($data['date_passed']);
        }

        // Update published_at timestamp if status changes to published
        if (isset($data['status']) && $data['status'] === 'published' && $resolution->status !== 'published') {
            $data['published_at'] = now();
        }

        $resolution->update($data);

        return $resolution;
    }

    /**
     * Archive resolution
     */
    public function archive(Resolution $resolution): Resolution
    {
        $resolution->update(['status' => 'archived']);

        return $resolution;
    }

    /**
     * Unarchive resolution (restore to published)
     */
    public function unarchive(Resolution $resolution): Resolution
    {
        $resolution->update(['status' => 'published']);

        return $resolution;
    }

    /**
     * Delete resolution and associated file
     */
    public function delete(Resolution $resolution): bool
    {
        if ($resolution->file_path) {
            $this->fileUploadService->deleteFile($resolution->file_path);
        }

        return $resolution->delete();
    }

    /**
     * Increment download count
     */
    public function incrementDownloadCount(Resolution $resolution): void
    {
        $resolution->increment('download_count');
    }

    /**
     * Get resolution categories
     */
    public function getCategories(): array
    {
        return Resolution::distinct('category')
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->pluck('category')
            ->sort()
            ->values()
            ->toArray();
    }

    /**
     * Get resolution authors
     */
    public function getAuthors(): array
    {
        return Resolution::published()
            ->with('submittedBy')
            ->get()
            ->pluck('submittedBy.name')
            ->filter()
            ->unique()
            ->sort()
            ->values()
            ->toArray();
    }

    /**
     * Get resolutions by year
     */
    public function getResolutionsByYear(int $year): Collection
    {
        return Resolution::published()
            ->whereYear('resolution_date', $year)
            ->orderBy('resolution_date', 'desc')
            ->get();
    }

    /**
     * Get resolution statistics
     *
     * @return array{
     *     total: int,
     *     published: int,
     *     archived: int,
     *     this_year: int
     * }
     */
    public function getStatistics(): array
    {
        return [
            'total' => Resolution::count(),
            'published' => Resolution::published()->count(),
            'archived' => Resolution::archived()->count(),
            'this_year' => Resolution::published()->whereYear('resolution_date', now()->year)->count(),
        ];
    }

    /**
     * Generate unique resolution number
     */
    private function generateResolutionNumber(): string
    {
        $year = now()->year;
        $prefix = "USG-{$year}-";

        // Get the last resolution number for this year
        $lastResolution = Resolution::where('resolution_number', 'like', $prefix.'%')
            ->orderBy('resolution_number', 'desc')
            ->first();

        if ($lastResolution) {
            $lastNumber = (int) str_replace($prefix, '', $lastResolution->resolution_number);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $prefix.str_pad($newNumber, 3, '0', STR_PAD_LEFT);
    }

    /**
     * Check if resolution number is unique
     */
    public function isResolutionNumberUnique(string $resolutionNumber, ?int $excludeId = null): bool
    {
        $query = Resolution::where('resolution_number', $resolutionNumber);

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return ! $query->exists();
    }

    /**
     * Get resolution by resolution number
     */
    public function getByNumber(string $resolutionNumber): ?Resolution
    {
        return Resolution::published()
            ->with(['submittedBy', 'approvedBy'])
            ->where('resolution_number', $resolutionNumber)
            ->first();
    }

    /**
     * Get related resolutions
     */
    public function getRelatedResolutions(Resolution $resolution, int $limit = 3): Collection
    {
        return Resolution::published()
            ->where('id', '!=', $resolution->id)
            ->where('category', $resolution->category)
            ->with(['submittedBy', 'approvedBy'])
            ->latest('resolution_date')
            ->limit($limit)
            ->get();
    }

    /**
     * Get recent resolutions
     */
    public function getRecentResolutions(int $limit = 5): Collection
    {
        return Resolution::published()
            ->with(['submittedBy', 'approvedBy'])
            ->latest('resolution_date')
            ->limit($limit)
            ->get();
    }

    /**
     * Get all resolutions paginated (for admin)
     */
    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Resolution::with(['submittedBy', 'approvedBy'])
            ->latest('created_at')
            ->paginate($perPage);
    }

    /**
     * Get resolution by ID
     */
    public function getById(int $id): ?Resolution
    {
        return Resolution::with(['submittedBy', 'approvedBy'])
            ->find($id);
    }

    /**
     * Submit resolution for approval
     */
    public function submit(Resolution $resolution): Resolution
    {
        $resolution->update(['status' => 'review']);

        return $resolution;
    }
}
