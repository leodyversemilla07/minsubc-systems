<?php

namespace Modules\Clinic\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Clinic\Database\Factories\ConsultationFactory;

class Consultation extends Model
{
    use HasFactory;

    protected $table = 'cls_consultations';

    protected $fillable = [
        'medical_record_id', 'complaint', 'diagnosis', 'treatment',
        'prescription', 'notes', 'consulted_by',
        'consultation_date', 'follow_up_date', 'status',
    ];

    protected function casts(): array
    {
        return [
            'consultation_date' => 'datetime',
            'follow_up_date' => 'date',
        ];
    }

    public function medicalRecord(): BelongsTo
    {
        return $this->belongsTo(MedicalRecord::class);
    }

    protected static function newFactory(): ConsultationFactory
    {
        return ConsultationFactory::new();
    }
}