<?php

namespace Modules\USG\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Modules\USG\Models\TransparencyReport;

class TransparencyReportService
{
    public function __construct(
        private FileUploadService $fileUploadService
    ) {}

    /**
     * Get all transparency reports with pagination
     */
    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return TransparencyReport::with('createdBy')
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Get published transparency reports
     */
    public function getPublishedReports(int $perPage = 15): LengthAwarePaginator
    {
        return TransparencyReport::published()
            ->with('createdBy')
            ->latest('published_at')
            ->paginate($perPage);
    }

    /**
     * Get transparency reports by type
     *
     * @param  string  $type  Report type
     * @param  int  $perPage  Items per page
     */
    public function getReportsByType(string $type, int $perPage = 15): LengthAwarePaginator
    {
        return TransparencyReport::ofType($type)
            ->with('createdBy')
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Search transparency reports
     *
     * @param  string  $query  Search query
     * @param  array<string, mixed>  $filters  Additional filters
     */
    public function searchReports(string $query = '', array $filters = []): LengthAwarePaginator
    {
        $reports = TransparencyReport::query()->with('createdBy');

        if (! empty($query)) {
            $reports->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%");
            });
        }

        if (isset($filters['type']) && ! empty($filters['type'])) {
            $reports->where('type', $filters['type']);
        }

        if (isset($filters['status']) && ! empty($filters['status'])) {
            $reports->where('status', $filters['status']);
        }

        if (isset($filters['year']) && ! empty($filters['year'])) {
            $reports->whereYear('report_period_start', $filters['year']);
        }

        return $reports->latest()->paginate(15);
    }

    /**
     * Create new transparency report
     *
     * @param  array<string, mixed>  $data  Report data
     * @param  int  $createdBy  User ID
     */
    public function create(array $data, int $createdBy): TransparencyReport
    {
        // Generate slug from title
        $data['slug'] = Str::slug($data['title']);

        // Handle file upload
        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {
            $fileData = $this->fileUploadService->uploadDocument($data['file'], 'usg/transparency-reports');

            $data['file_path'] = $fileData['path'];
            $data['file_name'] = $fileData['original_name'];
            $data['file_size'] = $fileData['size'];
            $data['mime_type'] = $fileData['mime_type'];

            unset($data['file']);
        }

        // Set defaults
        $data['created_by'] = $createdBy;
        $data['download_count'] = 0;
        $data['view_count'] = 0;

        // If status is published and no published_at date, set it now
        if (isset($data['status']) && $data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        return TransparencyReport::create($data);
    }

    /**
     * Update transparency report
     *
     * @param  TransparencyReport  $report  Report to update
     * @param  array<string, mixed>  $data  Updated data
     */
    public function update(TransparencyReport $report, array $data): TransparencyReport
    {
        // Update slug if title changed
        if (isset($data['title']) && $data['title'] !== $report->title) {
            $data['slug'] = Str::slug($data['title']);
        }

        // Handle file upload
        if (isset($data['file']) && $data['file'] instanceof UploadedFile) {
            // Delete old file
            if ($report->file_path) {
                $this->fileUploadService->deleteFile($report->file_path);
            }

            // Upload new file
            $fileData = $this->fileUploadService->uploadDocument($data['file'], 'usg/transparency-reports');

            $data['file_path'] = $fileData['path'];
            $data['file_name'] = $fileData['original_name'];
            $data['file_size'] = $fileData['size'];
            $data['mime_type'] = $fileData['mime_type'];

            unset($data['file']);
        }

        // If status changed to published and no published_at date, set it now
        if (isset($data['status']) && $data['status'] === 'published' && ! $report->published_at) {
            $data['published_at'] = now();
        }

        // If status changed from published to draft, clear published_at
        if (isset($data['status']) && $data['status'] === 'draft' && $report->status === 'published') {
            $data['published_at'] = null;
        }

        $report->update($data);

        return $report->fresh();
    }

    /**
     * Delete transparency report
     *
     * @param  TransparencyReport  $report  Report to delete
     */
    public function delete(TransparencyReport $report): bool
    {
        // Delete associated file
        if ($report->file_path) {
            $this->fileUploadService->deleteFile($report->file_path);
        }

        return $report->delete();
    }

    /**
     * Publish transparency report
     */
    public function publish(TransparencyReport $report): TransparencyReport
    {
        $report->update([
            'status' => 'published',
            'published_at' => $report->published_at ?? now(),
        ]);

        return $report->fresh();
    }

    /**
     * Unpublish transparency report
     */
    public function unpublish(TransparencyReport $report): TransparencyReport
    {
        $report->update([
            'status' => 'draft',
        ]);

        return $report->fresh();
    }

    /**
     * Increment download count
     */
    public function incrementDownloadCount(TransparencyReport $report): void
    {
        $report->incrementDownloadCount();
    }

    /**
     * Increment view count
     */
    public function incrementViewCount(TransparencyReport $report): void
    {
        $report->incrementViewCount();
    }

    /**
     * Get transparency report types
     *
     * @return array<int, string>
     */
    public function getTypes(): array
    {
        return TransparencyReport::distinct('type')
            ->whereNotNull('type')
            ->where('type', '!=', '')
            ->pluck('type')
            ->sort()
            ->values()
            ->toArray();
    }

    /**
     * Get transparency report by ID
     *
     * @param  int  $id  Report ID
     */
    public function getById(int $id): ?TransparencyReport
    {
        return TransparencyReport::with('createdBy')->find($id);
    }

    /**
     * Get transparency report by slug
     *
     * @param  string  $slug  Report slug
     */
    public function getBySlug(string $slug): ?TransparencyReport
    {
        return TransparencyReport::with('createdBy')
            ->where('slug', $slug)
            ->first();
    }

    /**
     * Get recent transparency reports
     *
     * @param  int  $limit  Number of reports to retrieve
     */
    public function getRecentReports(int $limit = 10): Collection
    {
        return TransparencyReport::published()
            ->with('createdBy')
            ->latest('published_at')
            ->limit($limit)
            ->get();
    }

    /**
     * Get popular transparency reports (by download count)
     *
     * @param  int  $limit  Number of reports to retrieve
     */
    public function getPopularReports(int $limit = 10): Collection
    {
        return TransparencyReport::published()
            ->with('createdBy')
            ->orderBy('download_count', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * Get transparency report statistics
     *
     * @return array{
     *     total: int,
     *     published: int,
     *     draft: int,
     *     total_downloads: int,
     *     total_views: int,
     *     types_count: int
     * }
     */
    public function getStatistics(): array
    {
        return [
            'total' => TransparencyReport::count(),
            'published' => TransparencyReport::where('status', 'published')->count(),
            'draft' => TransparencyReport::where('status', 'draft')->count(),
            'total_downloads' => TransparencyReport::sum('download_count'),
            'total_views' => TransparencyReport::sum('view_count'),
            'types_count' => TransparencyReport::distinct('type')->count('type'),
        ];
    }

    /**
     * Get related transparency reports
     *
     * @param  TransparencyReport  $report  Base report
     * @param  int  $limit  Number of related reports
     */
    public function getRelatedReports(TransparencyReport $report, int $limit = 5): Collection
    {
        return TransparencyReport::published()
            ->where('id', '!=', $report->id)
            ->where('type', $report->type)
            ->latest('published_at')
            ->limit($limit)
            ->get();
    }
}
