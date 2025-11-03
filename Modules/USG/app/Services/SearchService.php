<?php

namespace Modules\USG\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\USG\Models\Announcement;
use Modules\USG\Models\Document;
use Modules\USG\Models\Resolution;

class SearchService
{
    /**
     * Search announcements with filters
     */
    public function searchAnnouncements(
        ?string $query = null,
        ?string $category = null,
        ?string $status = null,
        ?string $dateFrom = null,
        ?string $dateTo = null,
        string $sortBy = 'publish_date',
        string $sortOrder = 'desc',
        int $perPage = 15
    ): LengthAwarePaginator {
        $builder = Announcement::query();

        // Apply search query
        if ($query) {
            $builder->where(function (Builder $q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('excerpt', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%");
            });
        }

        // Apply filters
        if ($category) {
            $builder->where('category', $category);
        }

        if ($status) {
            $builder->where('status', $status);
        }

        if ($dateFrom) {
            $builder->whereDate('publish_date', '>=', $dateFrom);
        }

        if ($dateTo) {
            $builder->whereDate('publish_date', '<=', $dateTo);
        }

        // Apply sorting
        $builder->orderBy($sortBy, $sortOrder);

        return $builder->with('author')->paginate($perPage);
    }

    /**
     * Search resolutions with filters
     */
    public function searchResolutions(
        ?string $query = null,
        ?string $category = null,
        ?string $status = null,
        ?string $dateFrom = null,
        ?string $dateTo = null,
        string $sortBy = 'resolution_date',
        string $sortOrder = 'desc',
        int $perPage = 15
    ): LengthAwarePaginator {
        $builder = Resolution::query();

        // Apply search query
        if ($query) {
            $builder->where(function (Builder $q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('resolution_number', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%");
            });
        }

        // Apply filters
        if ($category) {
            $builder->where('category', $category);
        }

        if ($status) {
            $builder->where('status', $status);
        }

        if ($dateFrom) {
            $builder->whereDate('resolution_date', '>=', $dateFrom);
        }

        if ($dateTo) {
            $builder->whereDate('resolution_date', '<=', $dateTo);
        }

        // Apply sorting
        $builder->orderBy($sortBy, $sortOrder);

        return $builder->with(['submittedBy', 'approvedBy'])->paginate($perPage);
    }

    /**
     * Search documents with filters
     */
    public function searchDocuments(
        ?string $query = null,
        ?string $category = null,
        ?bool $isPublic = null,
        ?string $dateFrom = null,
        ?string $dateTo = null,
        string $sortBy = 'created_at',
        string $sortOrder = 'desc',
        int $perPage = 15
    ): LengthAwarePaginator {
        $builder = Document::query();

        // Apply search query
        if ($query) {
            $builder->where(function (Builder $q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('description', 'like', "%{$query}%")
                    ->orWhere('file_name', 'like', "%{$query}%");
            });
        }

        // Apply filters
        if ($category) {
            $builder->where('category', $category);
        }

        if ($isPublic !== null) {
            $builder->where('is_public', $isPublic);
        }

        if ($dateFrom) {
            $builder->whereDate('created_at', '>=', $dateFrom);
        }

        if ($dateTo) {
            $builder->whereDate('created_at', '<=', $dateTo);
        }

        // Apply sorting
        $builder->orderBy($sortBy, $sortOrder);

        return $builder->with('uploadedBy')->paginate($perPage);
    }

    /**
     * Global search across all USG content
     */
    public function globalSearch(
        string $query,
        ?string $type = null,
        int $perPage = 15
    ): array {
        $results = [];

        // Search announcements
        if (! $type || $type === 'announcements') {
            $results['announcements'] = $this->searchAnnouncements(
                query: $query,
                perPage: $type ? $perPage : 5
            );
        }

        // Search resolutions
        if (! $type || $type === 'resolutions') {
            $results['resolutions'] = $this->searchResolutions(
                query: $query,
                perPage: $type ? $perPage : 5
            );
        }

        // Search documents
        if (! $type || $type === 'documents') {
            $results['documents'] = $this->searchDocuments(
                query: $query,
                isPublic: true, // Only public documents in global search
                perPage: $type ? $perPage : 5
            );
        }

        return $results;
    }

    /**
     * Get search suggestions based on query
     */
    public function getSearchSuggestions(string $query, int $limit = 5): array
    {
        $suggestions = [];

        // Get announcement titles
        $announcements = Announcement::where('title', 'like', "%{$query}%")
            ->where('status', 'published')
            ->limit($limit)
            ->pluck('title')
            ->toArray();

        // Get resolution titles
        $resolutions = Resolution::where('title', 'like', "%{$query}%")
            ->where('status', 'published')
            ->limit($limit)
            ->pluck('title')
            ->toArray();

        $suggestions = array_merge($announcements, $resolutions);

        // Return unique suggestions
        return array_unique(array_slice($suggestions, 0, $limit));
    }

    /**
     * Get popular search terms (could be stored in cache/database)
     */
    public function getPopularSearches(int $limit = 10): array
    {
        // This could be enhanced to track actual searches
        // For now, return popular categories
        return [
            'Academic',
            'Events',
            'Budget',
            'Resolutions',
            'Announcements',
            'Student Activities',
            'Campus News',
            'Policies',
        ];
    }

    /**
     * Get total count of search results
     */
    public function getTotalResults(string $query): array
    {
        return [
            'announcements' => Announcement::where('title', 'like', "%{$query}%")
                ->orWhere('content', 'like', "%{$query}%")
                ->count(),
            'resolutions' => Resolution::where('title', 'like', "%{$query}%")
                ->orWhere('content', 'like', "%{$query}%")
                ->count(),
            'documents' => Document::where('title', 'like', "%{$query}%")
                ->orWhere('description', 'like', "%{$query}%")
                ->where('is_public', true)
                ->count(),
        ];
    }
}
