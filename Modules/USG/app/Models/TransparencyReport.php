<?php

namespace Modules\USG\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Laravel\Scout\Attributes\SearchUsingFullText;
use Laravel\Scout\Searchable;
use Modules\USG\Database\Factories\TransparencyReportFactory;

class TransparencyReport extends Model
{
    use HasFactory, Searchable;

    protected $table = 'transparency_reports';

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): Factory
    {
        return TransparencyReportFactory::new();
    }

    /**
     * Boot the model.
     */
    protected static function booted(): void
    {
        // Delete file when model is deleted
        static::deleted(function (TransparencyReport $report) {
            if ($report->file_path && Storage::disk('public')->exists($report->file_path)) {
                Storage::disk('public')->delete($report->file_path);
            }
        });
    }

    protected $fillable = [
        'title',
        'slug',
        'description',
        'type',
        'status',
        'report_period_start',
        'report_period_end',
        'data',
        'file_path',
        'file_name',
        'file_size',
        'mime_type',
        'created_by',
        'published_at',
        'download_count',
        'view_count',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'array',
            'report_period_start' => 'date',
            'report_period_end' => 'date',
            'published_at' => 'datetime',
            'file_size' => 'integer',
            'download_count' => 'integer',
            'view_count' => 'integer',
        ];
    }

    // Scout configuration
    public function shouldBeSearchable(): bool
    {
        return $this->status === 'published';
    }

    #[SearchUsingFullText(['title', 'description'])]
    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'type' => $this->type,
        ];
    }

    // Relationships
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Scopes
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }

    public function scopeByPeriod(Builder $query, string $startDate, string $endDate): Builder
    {
        return $query->where('report_period_start', '>=', $startDate)
            ->where('report_period_end', '<=', $endDate);
    }

    // Accessors & Mutators
    public function getFormattedPeriodAttribute(): string
    {
        return $this->report_period_start->format('M Y').' - '.$this->report_period_end->format('M Y');
    }

    public function getFormattedFileSizeAttribute(): string
    {
        if (! $this->file_size) {
            return '';
        }

        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];

        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, 2).' '.$units[$i];
    }

    public function incrementDownloadCount(): void
    {
        $this->increment('download_count');
    }

    public function incrementViewCount(): void
    {
        $this->increment('view_count');
    }
}
