<?php

namespace Modules\USG\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Modules\USG\Database\Factories\DocumentFactory;

class Document extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): Factory
    {
        return DocumentFactory::new();
    }

    /**
     * Boot the model.
     */
    protected static function booted(): void
    {
        // Delete file when model is deleted
        static::deleted(function (Document $document) {
            if ($document->file_path && Storage::disk('public')->exists($document->file_path)) {
                Storage::disk('public')->delete($document->file_path);
            }
        });
    }

    protected $table = 'documents';

    protected $fillable = [
        'title',
        'description',
        'file_path',
        'file_name',
        'file_size',
        'mime_type',
        'category',
        'is_public',
        'uploaded_by',
        'download_count',
    ];

    protected function casts(): array
    {
        return [
            'file_size' => 'integer',
            'is_public' => 'boolean',
            'download_count' => 'integer',
        ];
    }

    // Relationships
    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    // Legacy alias for backwards compatibility
    public function uploader(): BelongsTo
    {
        return $this->uploadedBy();
    }

    public function downloads(): HasMany
    {
        return $this->hasMany(DocumentDownload::class, 'document_id');
    }

    // Helper Methods
    /**
     * Record a download for this document.
     */
    public function recordDownload(?int $userId = null, ?string $ipAddress = null, ?string $userAgent = null): DocumentDownload
    {
        $this->increment('download_count');

        return $this->downloads()->create([
            'user_id' => $userId,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
            'downloaded_at' => now(),
        ]);
    }

    /**
     * Get download statistics for this document.
     */
    public function getDownloadStats(): array
    {
        return [
            'total_downloads' => $this->download_count,
            'unique_users' => $this->downloads()->whereNotNull('user_id')->distinct('user_id')->count('user_id'),
            'anonymous_downloads' => $this->downloads()->whereNull('user_id')->count(),
            'recent_downloads' => $this->downloads()->where('downloaded_at', '>=', now()->subDays(30))->count(),
            'last_downloaded_at' => $this->downloads()->max('downloaded_at'),
        ];
    }

    // Scopes
    public function scopePublic(Builder $query): Builder
    {
        return $query->where('is_public', true);
    }

    public function scopePrivate(Builder $query): Builder
    {
        return $query->where('is_public', false);
    }

    public function scopeSearch(Builder $query, ?string $searchTerm): Builder
    {
        if (! $searchTerm) {
            return $query;
        }

        return $query->where(function (Builder $q) use ($searchTerm) {
            $q->where('title', 'like', "%{$searchTerm}%")
                ->orWhere('description', 'like', "%{$searchTerm}%")
                ->orWhere('file_name', 'like', "%{$searchTerm}%")
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

    public function scopeDateRange(Builder $query, ?string $dateFrom, ?string $dateTo): Builder
    {
        if ($dateFrom) {
            $query->whereDate('created_at', '>=', $dateFrom);
        }

        if ($dateTo) {
            $query->whereDate('created_at', '<=', $dateTo);
        }

        return $query;
    }
}
