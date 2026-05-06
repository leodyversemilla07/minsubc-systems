<?php

namespace Modules\Admission\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EnrollmentSubject extends Model
{
    use HasFactory;

    protected $table = 'admission_enrollment_subjects';

    protected $fillable = [
        'enrollment_id',
        'subject_id',
        'section_id',
        'status',
        'grade',
        'gpa',
        'remarks',
    ];

    protected function casts(): array
    {
        return [
            'grade' => 'decimal:2',
            'gpa' => 'decimal:2',
        ];
    }

    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function scopeEnrolled($query)
    {
        return $query->where('status', 'enrolled');
    }

    public function scopeDropped($query)
    {
        return $query->where('status', 'dropped');
    }

    public function getDisplayNameAttribute(): string
    {
        return $this->subject?->display_name ?? 'Unknown Subject';
    }

    public function getIsPassedAttribute(): bool
    {
        return in_array($this->status, ['passed', 'enrolled']) || ($this->grade !== null && $this->grade >= 75);
    }
}