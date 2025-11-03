<?php

namespace Modules\USG\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Modules\USG\Database\Factories\ResolutionFactory;

class Resolution extends Model
{
    use HasFactory;

    protected $table = 'resolutions';

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): ResolutionFactory
    {
        return ResolutionFactory::new();
    }

    /**
     * Boot the model.
     */
    protected static function booted(): void
    {
        // Delete file when model is deleted
        static::deleted(function (Resolution $resolution) {
            if ($resolution->file_path && Storage::disk('public')->exists($resolution->file_path)) {
                Storage::disk('public')->delete($resolution->file_path);
            }
        });
    }

    protected $fillable = [
        'resolution_number',
        'title',
        'description',
        'content',
        'category',
        'file_path',
        'status',
        'resolution_date',
        'submitted_by',
        'approved_by',
        'approved_at',
        'published_at',
    ];

    protected $appends = [
        'date_passed',
        'author',
    ];

    protected function casts(): array
    {
        return [
            'resolution_date' => 'datetime',
            'approved_at' => 'datetime',
            'published_at' => 'datetime',
        ];
    }

    // Accessors
    public function getDatePassedAttribute(): ?string
    {
        return $this->resolution_date?->toDateTimeString();
    }

    public function getAuthorAttribute(): string
    {
        return $this->submittedBy?->name ?? 'Unknown';
    }

    // Relationships
    public function submittedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    // Scopes
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    public function scopeDraft(Builder $query): Builder
    {
        return $query->where('status', 'draft');
    }

    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'review');
    }

    public function scopeArchived(Builder $query): Builder
    {
        return $query->where('status', 'archived');
    }

    public function scopeRejected(Builder $query): Builder
    {
        return $query->where('status', 'rejected');
    }

    public function scopeSearch(Builder $query, ?string $searchTerm): Builder
    {
        if (! $searchTerm) {
            return $query;
        }

        return $query->where(function (Builder $q) use ($searchTerm) {
            $q->where('title', 'like', "%{$searchTerm}%")
                ->orWhere('resolution_number', 'like', "%{$searchTerm}%")
                ->orWhere('description', 'like', "%{$searchTerm}%")
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
            $query->whereDate('resolution_date', '>=', $dateFrom);
        }

        if ($dateTo) {
            $query->whereDate('resolution_date', '<=', $dateTo);
        }

        return $query;
    }
}
