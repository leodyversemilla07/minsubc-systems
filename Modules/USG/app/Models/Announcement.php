<?php

namespace Modules\USG\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Laravel\Scout\Attributes\SearchUsingFullText;
use Laravel\Scout\Searchable;
use Modules\USG\Database\Factories\AnnouncementFactory;

class Announcement extends Model
{
    use HasFactory, Searchable;

    protected $table = 'announcements';

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): AnnouncementFactory
    {
        return AnnouncementFactory::new();
    }

    /**
     * Boot the model.
     */
    protected static function booted(): void
    {
        // Delete featured image when model is deleted
        static::deleted(function (Announcement $announcement) {
            if ($announcement->featured_image && Storage::disk('public')->exists($announcement->featured_image)) {
                Storage::disk('public')->delete($announcement->featured_image);
            }
        });
    }

    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'category',
        'featured_image',
        'status',
        'publish_date',
        'expiry_date',
        'author_id',
        'views_count',
    ];

    protected $appends = [
        'author_name',
    ];

    protected function casts(): array
    {
        return [
            'publish_date' => 'datetime',
            'expiry_date' => 'datetime',
            'views_count' => 'integer',
        ];
    }

    // Scout configuration
    public function shouldBeSearchable(): bool
    {
        return $this->status === 'published'
            && ($this->publish_date === null || $this->publish_date <= now())
            && ($this->expiry_date === null || $this->expiry_date >= now());
    }

    #[SearchUsingFullText(['title', 'excerpt', 'content'])]
    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'category' => $this->category,
        ];
    }

    // Relationships
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    // Accessors
    protected function authorName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->author?->full_name ?? $this->author?->name ?? 'Unknown',
        );
    }

    // Scopes
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->where(function ($q) {
                $q->whereNull('publish_date')
                    ->orWhere('publish_date', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('expiry_date')
                    ->orWhere('expiry_date', '>=', now());
            });
    }

    public function scopeDraft(Builder $query): Builder
    {
        return $query->where('status', 'draft');
    }

    public function scopeArchived(Builder $query): Builder
    {
        return $query->where('status', 'archived');
    }

    public function scopeExpired(Builder $query): Builder
    {
        return $query->where('expiry_date', '<', now())
            ->where('status', 'published');
    }

    public function scopeSearch(Builder $query, ?string $searchTerm): Builder
    {
        if (! $searchTerm) {
            return $query;
        }

        return $query->where(function (Builder $q) use ($searchTerm) {
            $q->where('title', 'like', "%{$searchTerm}%")
                ->orWhere('excerpt', 'like', "%{$searchTerm}%")
                ->orWhere('content', 'like', "%{$searchTerm}%")
                ->orWhere('category', 'like', "%{$searchTerm}%");
        });
    }

    public function scopeByCategory(Builder $query, ?string $category): Builder
    {
        if (! $category) {
            return $query;
        }

        return $query->where('category', $category);
    }

    public function scopeByStatus(Builder $query, ?string $status): Builder
    {
        if (! $status) {
            return $query;
        }

        return $query->where('status', $status);
    }

    public function scopeDateRange(Builder $query, ?string $dateFrom, ?string $dateTo): Builder
    {
        if ($dateFrom) {
            $query->whereDate('publish_date', '>=', $dateFrom);
        }

        if ($dateTo) {
            $query->whereDate('publish_date', '<=', $dateTo);
        }

        return $query;
    }
}
