<?php

namespace Modules\Guidance\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Guidance\Database\Factories\CounselingSessionFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CounselingSession extends Model
{
    use HasFactory;

    protected $table = 'gdn_counseling_sessions';

    protected $fillable = [
        'session_code', 'appointment_id', 'student_id', 'counselor_id',
        'type', 'session_type', 'concern', 'observations', 'interventions',
        'recommendations', 'mood', 'risk_level', 'requires_follow_up',
        'follow_up_notes', 'follow_up_date', 'status',
    ];

    protected static function newFactory(): CounselingSessionFactory
    {
        return CounselingSessionFactory::new();
    }

    protected function casts(): array
    {
        return ['follow_up_date' => 'date', 'requires_follow_up' => 'boolean'];
    }

    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Student::class, 'student_id');
    }

    public function counselor(): BelongsTo
    {
        return $this->belongsTo(Counselor::class, 'counselor_id');
    }
}