<?php

namespace Modules\Admission\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Enrollment extends Model
{
    protected $table = 'admission_enrollments';

    protected $fillable = [
        'applicant_id',
        'user_id',
        'student_id',
        'academic_term_id',
        'section_id',
        'status',
        'academic_year',
        'semester',
        'year_level',
        'enrollment_data',
        'confirmed_at',
        'enrolled_at',
        'confirmed_by',
        'notes',
        'gpa',
    ];

    protected function casts(): array
    {
        return [
            'enrollment_data' => 'array',
            'confirmed_at' => 'datetime',
            'enrolled_at' => 'datetime',
            'year_level' => 'integer',
            'gpa' => 'decimal:2',
        ];
    }

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class, 'applicant_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function confirmedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'confirmed_by');
    }

    public function academicTerm(): BelongsTo
    {
        return $this->belongsTo(AcademicTerm::class, 'academic_term_id');
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function subjects(): HasMany
    {
        return $this->hasMany(EnrollmentSubject::class, 'enrollment_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(EnrollmentPayment::class, 'enrollment_id');
    }

    public function latestPayment(): HasOne
    {
        return $this->hasOne(EnrollmentPayment::class, 'enrollment_id')->latestOfMany();
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    public function scopeEnrolled($query)
    {
        return $query->where('status', 'enrolled');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeForTerm($query, $termId)
    {
        return $query->where('academic_term_id', $termId);
    }

    public function scopeForSemester($query, $academicYear, $semester)
    {
        return $query->where('academic_year', $academicYear)->where('semester', $semester);
    }

    public function getTotalSubjectsAttribute(): int
    {
        return $this->subjects()->count();
    }

    public function getTotalUnitsAttribute(): int
    {
        return $this->subjects->sum(function ($subject) {
            return $subject->subject?->units ?? 0;
        });
    }

    public function getTotalFeesAttribute(): float
    {
        return $this->subjects->sum(function ($subject) {
            return ($subject->subject?->units ?? 0) * $this->feesPerUnit;
        });
    }

    public function getFeesPerUnitAttribute(): float
    {
        $tuitionFee = EnrollmentFee::where('academic_term_id', $this->academic_term_id)
            ->where('type', 'tuition')
            ->where('unit', 'per unit')
            ->first();

        return $tuitionFee?->amount ?? 0;
    }

    public function getTotalPaidAttribute(): float
    {
        return $this->payments()->where('status', 'verified')->sum('amount');
    }

    public function getBalanceAttribute(): float
    {
        return max(0, $this->total_fees - $this->total_paid);
    }

    public function getIsFullyPaidAttribute(): bool
    {
        return $this->balance <= 0;
    }

    public function getDisplayStatusAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'Pending Confirmation',
            'confirmed' => 'Confirmed',
            'enrolled' => 'Enrolled',
            'dropped' => 'Dropped',
            'cancelled' => 'Cancelled',
            default => ucfirst($this->status),
        };
    }

    public function getFullNameAttribute(): string
    {
        return $this->applicant?->full_name ?? $this->user?->full_name ?? 'Unknown';
    }

    public function getProgramAttribute(): ?string
    {
        return $this->applicant?->program?->course?->name ?? null;
    }
}