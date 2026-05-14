<?php

namespace Modules\Clinic\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicationDispensation extends Model
{
    use HasFactory;

    protected $table = 'cls_medications';

    protected $fillable = [
        'consultation_id', 'medicine_name', 'dosage',
        'quantity', 'instructions', 'dispensed_by', 'dispensed_at',
    ];

    protected function casts(): array
    {
        return [
            'dispensed_at' => 'datetime',
        ];
    }

    public function consultation(): BelongsTo
    {
        return $this->belongsTo(Consultation::class);
    }
}