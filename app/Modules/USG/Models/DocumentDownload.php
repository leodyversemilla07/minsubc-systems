<?php

namespace App\Modules\USG\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DocumentDownload extends Model
{
    protected $table = 'usg_document_downloads';

    public $timestamps = false;

    protected $fillable = [
        'document_id',
        'user_id',
        'ip_address',
        'user_agent',
        'downloaded_at',
    ];

    protected function casts(): array
    {
        return [
            'downloaded_at' => 'datetime',
        ];
    }

    // Relationships
    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class, 'document_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
