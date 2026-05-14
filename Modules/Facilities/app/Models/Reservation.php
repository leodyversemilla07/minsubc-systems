<?php

namespace Modules\Facilities\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Facilities\Database\Factories\ReservationFactory;

class Reservation extends Model
{
    use HasFactory;

    protected $table = 'fac_reservations';

    protected $fillable = [
        'facility_id', 'user_id', 'purpose', 'notes',
        'start_time', 'end_time', 'status',
        'attendees_count', 'is_recurring', 'recurrence_pattern',
        'approved_by', 'approved_at',
    ];

    protected function casts(): array
    {
        return [
            'start_time' => 'datetime',
            'end_time' => 'datetime',
            'approved_at' => 'datetime',
            'attendees_count' => 'integer',
            'is_recurring' => 'boolean',
        ];
    }

    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    protected static function newFactory(): ReservationFactory
    {
        return ReservationFactory::new();
    }
}