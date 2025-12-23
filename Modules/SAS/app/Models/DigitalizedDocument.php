<?php

namespace Modules\SAS\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Modules\SAS\Database\Factories\DigitalizedDocumentFactory;

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

    protected $appends = ['file_url', 'file_type'];

    protected $fillable = [
        'document_title',
        'document_category',
        'document_type',
        'access_level',
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

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
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

    public function canAccess(User $user): bool
    {
        return match ($this->access_level) {
            'public' => true,
            'staff' => $user->hasRole(['sas_staff', 'sas_admin', 'admin']),
            'admin' => $user->hasRole(['sas_admin', 'admin']),
            default => false,
        };
    }

    public function getFileUrlAttribute(): ?string
    {
        if ($this->file_path) {
            return Storage::url($this->file_path);
        }

        return null;
    }

    public function getFileTypeAttribute(): string
    {
        return pathinfo($this->file_name, PATHINFO_EXTENSION) ?: 'FILE';
    }

    public function canBeDisposed(): bool
    {
        return in_array($this->disposal_status, ['Physical Copy Exists', 'Pending Disposal Approval']);
    }
}
