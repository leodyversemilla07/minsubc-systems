<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Accounting\Database\Factories\AssessmentFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Assessment extends Model
{
    use HasFactory;

    protected $table = 'acc_assessments';

    protected $fillable = [
        'assessment_code', 'assessable_type', 'assessable_id', 'term_id',
        'academic_year', 'semester', 'total_amount', 'paid_amount',
        'status', 'due_date', 'notes',
    ];

    protected static function newFactory(): AssessmentFactory
    {
        return AssessmentFactory::new();
    }

    protected function casts(): array
    {
        return [
            'total_amount' => 'decimal:2',
            'paid_amount' => 'decimal:2',
            'due_date' => 'date',
        ];
    }

    public function assessable(): MorphTo
    {
        return $this->morphTo();
    }

    public function lines(): HasMany
    {
        return $this->hasMany(AssessmentLine::class, 'assessment_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'assessment_id');
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class, 'assessment_id');
    }

    public function appliedDiscounts(): HasMany
    {
        return $this->hasMany(AppliedDiscount::class, 'assessment_id');
    }

    public function getBalanceAttribute(): float
    {
        return $this->total_amount - $this->paid_amount;
    }
}