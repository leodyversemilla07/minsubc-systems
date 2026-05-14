<?php

namespace Modules\Clinic\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Clinic\Database\Factories\ImmunizationFactory;

class Immunization extends Model
{
    use HasFactory;

    protected $table = 'cls_immunizations';

    protected $fillable = [
        'medical_record_id', 'vaccine_name', 'dose_number',
        'date_administered', 'administered_by', 'batch_no',
        'remarks', 'next_due_date',
    ];

    protected function casts(): array
    {
        return [
            'date_administered' => 'date',
            'next_due_date' => 'date',
        ];
    }

    public function medicalRecord(): BelongsTo
    {
        return $this->belongsTo(MedicalRecord::class);
    }

    protected static function newFactory(): ImmunizationFactory
    {
        return ImmunizationFactory::new();
    }
}