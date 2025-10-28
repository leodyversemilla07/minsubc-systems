<?php

namespace App\Modules\USG\Models;

use App\Models\User;
use Database\Factories\FOIResponseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FOIResponse extends Model
{
    use HasFactory;

    protected $table = 'usg_foi_responses';

    protected $fillable = [
        'foi_request_id',
        'document_path',
        'response_text',
        'responder_id',
    ];

    public function request(): BelongsTo
    {
        return $this->belongsTo(FOIRequest::class, 'foi_request_id');
    }

    public function responder(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responder_id');
    }

    public function hasDocument(): bool
    {
        return ! empty($this->document_path);
    }

    protected static function newFactory(): FOIResponseFactory
    {
        return FOIResponseFactory::new();
    }
}
