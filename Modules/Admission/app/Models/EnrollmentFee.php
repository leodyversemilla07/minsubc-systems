<?php

namespace Modules\Admission\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EnrollmentFee extends Model
{
    use HasFactory;

    protected $table = 'admission_enrollment_fees';

    protected $fillable = [
        'academic_term_id',
        'name',
        'type',
        'amount',
        'unit',
        'units',
        'is_required',
        'is_active',
        'priority',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'units' => 'integer',
            'is_required' => 'boolean',
            'is_active' => 'boolean',
            'priority' => 'integer',
        ];
    }

    public function academicTerm(): BelongsTo
    {
        return $this->belongsTo(AcademicTerm::class, 'academic_term_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeRequired($query)
    {
        return $query->where('is_required', true);
    }

    public function scopeForTerm($query, $termId)
    {
        return $query->where('academic_term_id', $termId);
    }

    public function calculateAmount(int $totalUnits = 0, int $subjectCount = 0): float
    {
        return match ($this->unit) {
            'per unit' => $this->amount * ($this->units ?? $totalUnits),
            'per subject' => $this->amount * ($this->units ?? $subjectCount),
            default => $this->amount,
        };
    }
}