<?php

namespace Modules\Alumni\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventParticipant extends Model
{
    use HasFactory;

    protected $table = 'alm_event_participants';

    protected $fillable = [
        'event_id', 'alumnus_id', 'status',
        'registered_at', 'attended_at',
        'number_of_guests', 'remarks',
    ];

    protected function casts(): array
    {
        return [
            'registered_at' => 'datetime',
            'attended_at' => 'datetime',
            'number_of_guests' => 'integer',
        ];
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(AlumniEvent::class, 'event_id');
    }

    public function alumnus(): BelongsTo
    {
        return $this->belongsTo(Alumnus::class);
    }
}