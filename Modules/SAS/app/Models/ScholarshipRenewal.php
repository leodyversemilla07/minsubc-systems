<?php

namespace Modules\SAS\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScholarshipRenewal extends Model
{
    use HasFactory;

    protected $fillable = [
        'recipient_id',
        'academic_year',
        'semester',
        'status',
        'notes',
    ];

    public function recipient(): BelongsTo
    {
        return $this->belongsTo(ScholarshipRecipient::class, 'recipient_id');
    }
}
