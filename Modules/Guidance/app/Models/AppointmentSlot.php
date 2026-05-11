<?php

namespace Modules\Guidance\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Guidance\Database\Factories\AppointmentSlotFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AppointmentSlot extends Model
{
    use HasFactory;

    protected $table = 'gdn_appointment_slots';

    protected $fillable = [
        'counselor_id', 'date', 'start_time', 'end_time',
        'max_students', 'booked_count', 'location', 'type', 'is_available',
    ];

    protected static function newFactory(): AppointmentSlotFactory
    {
        return AppointmentSlotFactory::new();
    }

    protected function casts(): array
    {
        return ['date' => 'date', 'start_time' => 'string', 'end_time' => 'string', 'is_available' => 'boolean'];
    }

    public function counselor(): BelongsTo
    {
        return $this->belongsTo(Counselor::class, 'counselor_id');
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'slot_id');
    }

    public function getHasAvailabilityAttribute(): bool
    {
        return $this->booked_count < $this->max_students && $this->is_available;
    }
}