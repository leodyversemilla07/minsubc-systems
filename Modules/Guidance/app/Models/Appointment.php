<?php

namespace Modules\Guidance\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Guidance\Database\Factories\AppointmentFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    use HasFactory;

    protected $table = 'gdn_appointments';

    protected $fillable = [
        'appointment_code', 'slot_id', 'student_id', 'counselor_id',
        'reason', 'notes', 'status', 'confirmed_at', 'completed_at', 'cancellation_reason',
    ];

    protected static function newFactory(): AppointmentFactory
    {
        return AppointmentFactory::new();
    }

    protected function casts(): array
    {
        return ['confirmed_at' => 'datetime', 'completed_at' => 'datetime'];
    }

    public function slot(): BelongsTo
    {
        return $this->belongsTo(AppointmentSlot::class, 'slot_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Student::class, 'student_id');
    }

    public function counselor(): BelongsTo
    {
        return $this->belongsTo(Counselor::class, 'counselor_id');
    }

    public function session(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(CounselingSession::class, 'appointment_id');
    }
}