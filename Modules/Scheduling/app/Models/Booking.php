<?php

namespace Modules\Scheduling\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'sch_bookings';

    protected $fillable = [
        'event_id', 'user_id', 'status', 'notes', 'checked_in_at',
    ];

    protected function casts(): array
    {
        return [
            'checked_in_at' => 'datetime',
        ];
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(CalendarEvent::class, 'event_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    protected static function newFactory(): \Modules\Scheduling\Database\Factories\BookingFactory
    {
        return \Modules\Scheduling\Database\Factories\BookingFactory::new();
    }
}