<?php

namespace Modules\Clinic\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Clinic\Database\Factories\DentalRecordFactory;

class DentalRecord extends Model
{
    use HasFactory;

    protected $table = 'cls_dental_records';

    protected $fillable = [
        'medical_record_id', 'procedure', 'findings',
        'treatment', 'dentist', 'dental_date', 'follow_up_date',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'dental_date' => 'datetime',
            'follow_up_date' => 'date',
        ];
    }

    public function medicalRecord(): BelongsTo
    {
        return $this->belongsTo(MedicalRecord::class);
    }

    protected static function newFactory(): DentalRecordFactory
    {
        return DentalRecordFactory::new();
    }
}