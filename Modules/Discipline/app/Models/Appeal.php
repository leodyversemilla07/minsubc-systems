<?php

namespace Modules\Discipline\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appeal extends Model
{
    use HasFactory;

    protected $table = 'dsc_appeals';

    protected $fillable = [
        'incident_id', 'appeal_date', 'reason', 'status',
        'reviewed_by', 'review_date', 'review_notes',
    ];

    protected function casts(): array
    {
        return [
            'appeal_date' => 'date',
            'review_date' => 'date',
        ];
    }

    public function incident(): BelongsTo
    {
        return $this->belongsTo(Incident::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'reviewed_by');
    }
}