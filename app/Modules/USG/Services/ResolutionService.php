<?php

namespace App\Modules\USG\Services;

use App\Models\Modules\USG\Models\Resolution;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class ResolutionService
{
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
     * Get pending resolutions for approval
     */
    public function getPendingResolutions(): Collection
    {
        return Resolution::pending()
            ->with('submittedBy')
            ->latest('created_at')
            ->get();
    }

    /**
     * Get draft resolutions
     */
    public function getDraftResolutions(): Collection
    {
        return Resolution::draft()
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
            $fileData = $this->handleFileUpload($data['file']);
            $data['file_path'] = $fileData['path'];
            unset($data['file']);
        }

        // Generate resolution number if not provided
        if (empty($data['resolution_number'])) {
            $data['resolution_number'] = $this->generateResolutionNumber();
        }

        return Resolution::create([
            ...$data,
            'submitted_by' => $submittedBy,
            'status' => $data['status'] ?? 'draft',
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
                $this->deleteFile($resolution->file_path);
            }

            $fileData = $this->handleFileUpload($data['file']);
            $data['file_path'] = $fileData['path'];
            unset($data['file']);
        }

        $resolution->update($data);

        return $resolution->fresh();
    }

    /**
     * Submit resolution for approval
     */
    public function submitForApproval(Resolution $resolution): Resolution
    {
        $resolution->update([
            'status' => 'pending',
        ]);

        return $resolution->fresh();
    }

    /**
     * Approve resolution
     */
    public function approve(Resolution $resolution, int $approvedBy): Resolution
    {
        $resolution->update([
            'status' => 'published',
            'approved_by' => $approvedBy,
            'approved_at' => now(),
            'published_at' => now(),
        ]);

        return $resolution->fresh();
    }

    /**
     * Reject resolution
     */
    public function reject(Resolution $resolution, int $approvedBy, ?string $reason = null): Resolution
    {
        $updateData = [
            'status' => 'rejected',
            'approved_by' => $approvedBy,
            'approved_at' => now(),
        ];

        if ($reason) {
            $updateData['rejection_reason'] = $reason;
        }

        $resolution->update($updateData);

        return $resolution->fresh();
    }

    /**
     * Archive resolution
     */
    public function archive(Resolution $resolution): Resolution
    {
        $resolution->update(['status' => 'archived']);

        return $resolution->fresh();
    }

    /**
     * Delete resolution and associated file
     */
    public function delete(Resolution $resolution): bool
    {
        if ($resolution->file_path) {
            $this->deleteFile($resolution->file_path);
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
     */
    public function getStatistics(): array
    {
        return [
            'total' => Resolution::count(),
            'published' => Resolution::published()->count(),
            'pending' => Resolution::pending()->count(),
            'draft' => Resolution::draft()->count(),
            'this_year' => Resolution::published()->whereYear('resolution_date', now()->year)->count(),
        ];
    }

    /**
     * Handle file upload
     */
    private function handleFileUpload(UploadedFile $file): array
    {
        $path = $file->store('usg/resolutions', 'public');

        return [
            'path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
        ];
    }

    /**
     * Delete file from storage
     */
    private function deleteFile(string $filePath): bool
    {
        return Storage::disk('public')->delete($filePath);
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

        return $resolution->fresh();
    }
}
