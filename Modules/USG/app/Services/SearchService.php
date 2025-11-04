<?php

namespace Modules\USG\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\USG\Models\Announcement;
use Modules\USG\Models\Document;
use Modules\USG\Models\Event;
use Modules\USG\Models\Officer;
use Modules\USG\Models\Resolution;
use Modules\USG\Models\TransparencyReport;
use Modules\USG\Models\VMGO;

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
     * Global search across all USG content using Laravel Scout or fallback to LIKE queries
     */
    public function globalSearch(
        string $query,
        ?string $type = null,
        int $perPage = 15
    ): array {
        $results = [];
        $limit = $type ? $perPage : 5;

        // Use LIKE queries on SQLite, Scout on other databases
        $useLike = config('database.default') === 'sqlite';

        // Search announcements
        if (! $type || $type === 'announcements') {
            if ($useLike) {
                $announcements = Announcement::where(function (Builder $q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                        ->orWhere('excerpt', 'like', "%{$query}%")
                        ->orWhere('content', 'like', "%{$query}%");
                })->paginate($limit);
            } else {
                $announcements = Announcement::search($query)->paginate($limit);
            }

            $results['announcements'] = $announcements;
        }

        // Search resolutions
        if (! $type || $type === 'resolutions') {
            if ($useLike) {
                $resolutions = Resolution::where(function (Builder $q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                        ->orWhere('description', 'like', "%{$query}%")
                        ->orWhere('content', 'like', "%{$query}%");
                })->paginate($limit);
            } else {
                $resolutions = Resolution::search($query)->paginate($limit);
            }

            $results['resolutions'] = $resolutions;
        }

        // Search events
        if (! $type || $type === 'events') {
            if ($useLike) {
                $events = Event::where(function (Builder $q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                        ->orWhere('description', 'like', "%{$query}%")
                        ->orWhere('location', 'like', "%{$query}%");
                })->paginate($limit);
            } else {
                $events = Event::search($query)->paginate($limit);
            }

            $results['events'] = $events;
        }

        // Search documents
        if (! $type || $type === 'documents') {
            if ($useLike) {
                $documents = Document::where(function (Builder $q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                        ->orWhere('description', 'like', "%{$query}%")
                        ->orWhere('file_name', 'like', "%{$query}%");
                })->paginate($limit);
            } else {
                $documents = Document::search($query)->paginate($limit);
            }

            $results['documents'] = $documents;
        }

        // Search officers
        if (! $type || $type === 'officers') {
            if ($useLike) {
                $officers = Officer::where(function (Builder $q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                        ->orWhere('position', 'like', "%{$query}%")
                        ->orWhere('department', 'like', "%{$query}%");
                })->paginate($limit);
            } else {
                $officers = Officer::search($query)->paginate($limit);
            }

            $results['officers'] = $officers;
        }

        // Search VMGO
        if (! $type || $type === 'vmgo') {
            if ($useLike) {
                $vmgo = VMGO::where(function (Builder $q) use ($query) {
                    $q->where('vision', 'like', "%{$query}%")
                        ->orWhere('mission', 'like', "%{$query}%");
                })->paginate($limit);
            } else {
                $vmgo = VMGO::search($query)->paginate($limit);
            }

            $results['vmgo'] = $vmgo;
        }

        // Search transparency reports
        if (! $type || $type === 'transparency_reports') {
            if ($useLike) {
                $transparencyReports = TransparencyReport::where(function (Builder $q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                        ->orWhere('description', 'like', "%{$query}%");
                })->paginate($limit);
            } else {
                $transparencyReports = TransparencyReport::search($query)->paginate($limit);
            }

            $results['transparency_reports'] = $transparencyReports;
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
