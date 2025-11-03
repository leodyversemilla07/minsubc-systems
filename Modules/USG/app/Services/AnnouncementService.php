<?php

namespace Modules\USG\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Modules\USG\Models\Announcement;

class AnnouncementService
{
    /**
     * Get published announcements with pagination
     */
    public function getPublishedAnnouncements(int $perPage = 15): LengthAwarePaginator
    {
        return Announcement::published()
            ->with('author')
            ->latest('publish_date')
            ->paginate($perPage);
    }

    /**
     * Get featured announcements
     */
    public function getFeaturedAnnouncements(int $limit = 5): Collection
    {
        return Announcement::published()
            ->where('priority', 'high')
            ->with('author')
            ->latest('publish_date')
            ->limit($limit)
            ->get();
    }

    /**
     * Get announcements by category
     */
    public function getAnnouncementsByCategory(string $category, int $perPage = 15): LengthAwarePaginator
    {
        return Announcement::published()
            ->where('category', $category)
            ->with('author')
            ->latest('publish_date')
            ->paginate($perPage);
    }

    /**
     * Search announcements with filters
     */
    public function searchAnnouncements(string $query = '', array $filters = []): LengthAwarePaginator
    {
        $announcements = Announcement::published();

        if (! empty($query)) {
            $announcements->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%")
                    ->orWhere('excerpt', 'like', "%{$query}%");
            });
        }

        if (isset($filters['category']) && ! empty($filters['category'])) {
            $announcements->where('category', $filters['category']);
        }

        if (isset($filters['priority']) && ! empty($filters['priority'])) {
            $announcements->where('priority', $filters['priority']);
        }

        if (isset($filters['date_from']) && ! empty($filters['date_from'])) {
            $announcements->where('publish_date', '>=', $filters['date_from']);
        }

        if (isset($filters['date_to']) && ! empty($filters['date_to'])) {
            $announcements->where('publish_date', '<=', $filters['date_to']);
        }

        return $announcements->latest('publish_date')->paginate(15);
    }

    /**
     * Create new announcement
     */
    public function create(array $data, int $authorId): Announcement
    {
        $data['slug'] = $this->generateUniqueSlug($data['title']);
        $data['author_id'] = $authorId;

        if (isset($data['featured_image']) && $data['featured_image'] instanceof UploadedFile) {
            $data['featured_image'] = $this->handleImageUpload($data['featured_image']);
        }

        if (empty($data['excerpt'])) {
            $data['excerpt'] = $this->generateExcerpt($data['content']);
        }

        // Set default publish date if not provided and status is published
        if ($data['status'] === 'published' && empty($data['publish_date'])) {
            $data['publish_date'] = now();
        }

        return Announcement::create($data);
    }

    /**
     * Update existing announcement
     */
    public function update(Announcement $announcement, array $data): Announcement
    {
        if (isset($data['title']) && $data['title'] !== $announcement->title) {
            $data['slug'] = $this->generateUniqueSlug($data['title'], $announcement->id);
        }

        if (isset($data['featured_image']) && $data['featured_image'] instanceof UploadedFile) {
            // Delete old image if exists
            if ($announcement->featured_image) {
                $this->deleteImage($announcement->featured_image);
            }
            $data['featured_image'] = $this->handleImageUpload($data['featured_image']);
        }

        if (isset($data['content']) && empty($data['excerpt'])) {
            $data['excerpt'] = $this->generateExcerpt($data['content']);
        }

        $announcement->update($data);

        return $announcement;
    }

    /**
     * Publish announcement
     */
    public function publish(Announcement $announcement): Announcement
    {
        $announcement->update([
            'status' => 'published',
            'publish_date' => $announcement->publish_date ?? now(),
        ]);

        return $announcement;
    }

    /**
     * Unpublish announcement
     */
    public function unpublish(Announcement $announcement): Announcement
    {
        $announcement->update(['status' => 'draft']);

        return $announcement;
    }

    /**
     * Archive announcement
     */
    public function archive(Announcement $announcement): Announcement
    {
        $announcement->update(['status' => 'archived']);

        return $announcement;
    }

    /**
     * Delete announcement and associated image
     */
    public function delete(Announcement $announcement): bool
    {
        if ($announcement->featured_image) {
            $this->deleteImage($announcement->featured_image);
        }

        return $announcement->delete();
    }

    /**
     * Increment views count
     */
    public function incrementViews(Announcement $announcement): void
    {
        $announcement->increment('views_count');
    }

    /**
     * Get expired announcements
     */
    public function getExpiredAnnouncements(): Collection
    {
        return Announcement::where('expiry_date', '<', now())
            ->where('status', 'published')
            ->get();
    }

    /**
     * Auto-archive expired announcements
     */
    public function archiveExpiredAnnouncements(): int
    {
        $expired = $this->getExpiredAnnouncements();

        foreach ($expired as $announcement) {
            $announcement->update(['status' => 'archived']);
        }

        return $expired->count();
    }

    /**
     * Get announcement categories
     */
    public function getCategories(): array
    {
        // Predefined categories
        $predefinedCategories = [
            'Academic',
            'Events',
            'Student Affairs',
            'Administration',
            'Scholarships',
            'Sports',
            'Organizations',
            'News',
            'Updates',
            'Important Notice',
        ];

        // Get existing categories from database
        $existingCategories = Announcement::distinct('category')
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->pluck('category')
            ->toArray();

        // Merge and remove duplicates
        $allCategories = array_unique(array_merge($predefinedCategories, $existingCategories));

        // Sort alphabetically and return
        sort($allCategories);

        return array_values($allCategories);
    }

    /**
     * Get announcement statistics
     */
    public function getStatistics(): array
    {
        return [
            'total' => Announcement::count(),
            'published' => Announcement::published()->count(),
            'draft' => Announcement::draft()->count(),
            'archived' => Announcement::archived()->count(),
            'this_month' => Announcement::published()
                ->whereMonth('publish_date', now()->month)
                ->whereYear('publish_date', now()->year)
                ->count(),
        ];
    }

    /**
     * Get recent announcements
     */
    public function getRecentAnnouncements(int $limit = 5): Collection
    {
        return Announcement::published()
            ->with('author')
            ->latest('publish_date')
            ->limit($limit)
            ->get();
    }

    /**
     * Generate unique slug
     */
    private function generateUniqueSlug(string $title, ?int $excludeId = null): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;

        while ($this->slugExists($slug, $excludeId)) {
            $slug = $originalSlug.'-'.$counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Check if slug exists
     */
    private function slugExists(string $slug, ?int $excludeId = null): bool
    {
        $query = Announcement::where('slug', $slug);

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->exists();
    }

    /**
     * Handle image upload
     */
    private function handleImageUpload(UploadedFile $image): string
    {
        return $image->store('usg/announcements', 'public');
    }

    /**
     * Delete image from storage
     */
    private function deleteImage(string $imagePath): bool
    {
        return Storage::disk('public')->delete($imagePath);
    }

    /**
     * Get announcement by slug (public - published only)
     */
    public function getBySlug(string $slug): ?Announcement
    {
        return Announcement::published()
            ->with('author')
            ->where('slug', $slug)
            ->first();
    }

    /**
     * Get announcement by slug (admin - all statuses)
     */
    public function getBySlugForAdmin(string $slug): ?Announcement
    {
        return Announcement::with('author')
            ->where('slug', $slug)
            ->first();
    }

    /**
     * Get related announcements
     */
    public function getRelatedAnnouncements(Announcement $announcement, int $limit = 3): Collection
    {
        return Announcement::published()
            ->where('id', '!=', $announcement->id)
            ->where('category', $announcement->category)
            ->with('author')
            ->latest('publish_date')
            ->limit($limit)
            ->get();
    }

    /**
     * Increment views count by ID
     */
    public function incrementViewsById(int $id): void
    {
        Announcement::where('id', $id)->increment('views_count');
    }

    /**
     * Get pending announcements (draft status)
     */
    public function getPendingAnnouncements(int $limit = 10): Collection
    {
        return Announcement::where('status', 'draft')
            ->with('author')
            ->latest('created_at')
            ->limit($limit)
            ->get();
    }

    /**
     * Get all announcements paginated (for admin)
     */
    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Announcement::with('author')
            ->latest('created_at')
            ->paginate($perPage);
    }

    /**
     * Get announcement by ID
     */
    public function getById(int $id): ?Announcement
    {
        return Announcement::with('author')
            ->find($id);
    }

    /**
     * Generate excerpt from content
     */
    private function generateExcerpt(string $content, int $length = 150): string
    {
        return Str::limit(strip_tags($content), $length);
    }
}
