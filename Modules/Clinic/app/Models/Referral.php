<?php

namespace Modules\Clinic\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Referral extends Model
{
    use HasFactory;

    protected $table = 'cls_referrals';

    protected $fillable = [
        'medical_record_id', 'referred_to', 'reason',
        'referral_date', 'notes', 'status', 'follow_up_notes',
    ];

    protected function casts(): array
    {
        return [
            'referral_date' => 'date',
        ];
    }

    public function medicalRecord(): BelongsTo
    {
        return $this->belongsTo(MedicalRecord::class);
    }
}