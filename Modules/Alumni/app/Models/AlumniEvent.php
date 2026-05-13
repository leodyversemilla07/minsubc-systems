<?php

namespace Modules\Alumni\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Alumni\Database\Factories\AlumniEventFactory;

class AlumniEvent extends Model
{
    use HasFactory;

    protected $table = 'alm_events';

    protected $fillable = [
        'title', 'slug', 'description', 'event_type',
        'event_date', 'end_date', 'location', 'venue',
        'max_participants', 'registration_fee', 'is_public',
        'status', 'cover_photo_url',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'datetime',
            'end_date' => 'datetime',
            'registration_fee' => 'decimal:2',
            'is_public' => 'boolean',
        ];
    }

    public function participants(): HasMany
    {
        return $this->hasMany(EventParticipant::class, 'event_id');
    }

    protected static function newFactory(): AlumniEventFactory
    {
        return AlumniEventFactory::new();
    }
}