<?php

namespace App\Modules\USG\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    use HasFactory;

    protected $table = 'usg_documents';

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
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
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
}
