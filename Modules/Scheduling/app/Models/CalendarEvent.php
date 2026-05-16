<?php

namespace Modules\Scheduling\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CalendarEvent extends Model
{
    use HasFactory;

    protected $table = 'sch_events';

    protected $fillable = [
        'title', 'description', 'event_type', 'start_datetime', 'end_datetime',
        'all_day', 'location', 'organizer_id', 'color',
        'is_public', 'status', 'recurrence_rule', 'max_participants',
    ];

    protected function casts(): array
    {
        return [
            'start_datetime' => 'datetime',
            'end_datetime' => 'datetime',
            'all_day' => 'boolean',
            'is_public' => 'boolean',
            'max_participants' => 'integer',
        ];
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'event_id');
    }

    protected static function newFactory(): \Modules\Scheduling\Database\Factories\CalendarEventFactory
    {
        return \Modules\Scheduling\Database\Factories\CalendarEventFactory::new();
    }
}