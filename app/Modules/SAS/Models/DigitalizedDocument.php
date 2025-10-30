<?php

namespace App\Modules\SAS\Models;

use App\Models\User;
use Database\Factories\DigitalizedDocumentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class DigitalizedDocument extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): DigitalizedDocumentFactory
    {
        return DigitalizedDocumentFactory::new();
    }

    protected $fillable = [
        'document_title',
        'document_category',
        'document_type',
        'reference_number',
        'original_date',
        'digitalized_date',
        'file_path',
        'file_name',
        'file_size',
        'mime_type',
        'academic_year',
        'related_entity_type',
        'related_entity_id',
        'physical_location',
        'disposal_status',
        'disposal_permit_number',
        'disposal_date',
        'is_public',
        'uploaded_by',
    ];

    protected function casts(): array
    {
        return [
            'original_date' => 'date',
            'digitalized_date' => 'date',
            'disposal_date' => 'date',
            'is_public' => 'boolean',
        ];
    }

    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function versions(): HasMany
    {
        return $this->hasMany(DocumentVersion::class, 'document_id');
    }

    public function permissions(): HasMany
    {
        return $this->hasMany(DocumentPermission::class, 'document_id');
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('document_category', $category);
    }

    public function scopePendingDisposal($query)
    {
        return $query->where('disposal_status', 'Pending Disposal Approval');
    }

    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    public function getFileUrlAttribute(): ?string
    {
        if ($this->file_path) {
            return Storage::url($this->file_path);
        }

        return null;
    }

    public function canBeDisposed(): bool
    {
        return in_array($this->disposal_status, ['Physical Copy Exists', 'Pending Disposal Approval']);
    }
}
