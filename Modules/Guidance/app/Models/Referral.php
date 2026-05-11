<?php

namespace Modules\Guidance\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Guidance\Database\Factories\ReferralFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Referral extends Model
{
    use HasFactory;

    protected $table = 'gdn_referrals';

    protected $fillable = [
        'referral_code', 'student_id', 'referred_by', 'referred_to',
        'external_agency', 'reason', 'details', 'urgency', 'status', 'feedback', 'resolved_at',
    ];

    protected static function newFactory(): ReferralFactory
    {
        return ReferralFactory::new();
    }

    protected function casts(): array
    {
        return ['resolved_at' => 'datetime'];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Student::class, 'student_id');
    }

    public function referrer(): BelongsTo
    {
        return $this->belongsTo(Counselor::class, 'referred_by');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(Counselor::class, 'referred_to');
    }
}