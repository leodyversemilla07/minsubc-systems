<?php

namespace App\Models\Modules\USG\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Resolution extends Model
{
    protected $table = 'usg_resolutions';

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
}
