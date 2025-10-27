<?php

namespace App\Modules\USG\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Announcement extends Model
{
    use HasFactory;

    protected $table = 'usg_announcements';

    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'category',
        'priority',
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

    // Relationships
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    // Accessors
    protected function authorName(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
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

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('priority', 'high');
    }

    public function scopeExpired(Builder $query): Builder
    {
        return $query->where('expiry_date', '<', now())
            ->where('status', 'published');
    }
}
