<?php

namespace App\Modules\SAS\Models;

use App\Models\User;
use Database\Factories\InsuranceRecordFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InsuranceRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'insurance_provider',
        'policy_number',
        'policy_type',
        'coverage_amount',
        'effective_date',
        'expiration_date',
        'status',
        'beneficiary_name',
        'beneficiary_relationship',
        'policy_document_path',
        'submission_date',
        'reviewed_by',
        'reviewed_at',
        'review_notes',
    ];

    protected function casts(): array
    {
        return [
            'effective_date' => 'date',
            'expiration_date' => 'date',
            'submission_date' => 'date',
            'reviewed_at' => 'datetime',
            'coverage_amount' => 'decimal:2',
        ];
    }

    protected static function newFactory(): InsuranceRecordFactory
    {
        return InsuranceRecordFactory::new();
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function reviewedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(InsuranceDocument::class, 'insurance_id');
    }

    public function isExpired(): bool
    {
        return $this->expiration_date < now();
    }

    public function daysUntilExpiration(): int
    {
        return (int) now()->startOfDay()->diffInDays($this->expiration_date->startOfDay(), false);
    }

    public function scopeExpiringSoon($query, int $days = 30)
    {
        return $query->whereBetween('expiration_date', [now(), now()->addDays($days)]);
    }

    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }
}
