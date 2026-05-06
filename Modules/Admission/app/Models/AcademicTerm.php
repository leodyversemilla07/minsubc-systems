<?php

namespace Modules\Admission\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AcademicTerm extends Model
{
    use HasFactory;

    protected $fillable = [
        'academic_year',
        'semester',
        'enrollment_start',
        'enrollment_end',
        'classes_start',
        'classes_end',
        'status',
        'is_active',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'enrollment_start' => 'date',
            'enrollment_end' => 'date',
            'classes_start' => 'date',
            'classes_end' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class, 'academic_term_id');
    }

    public function fees(): HasMany
    {
        return $this->hasMany(EnrollmentFee::class, 'academic_term_id');
    }

    public function currentTerm(): HasOne
    {
        return $this->hasOne(AcademicTerm::class)->where('is_active', true);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeCurrent($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('status', 'upcoming');
    }

    public function scopeEnrollment($query)
    {
        return $query->where('status', 'enrollment');
    }

    public function scopeOngoing($query)
    {
        return $query->where('status', 'ongoing');
    }

    public function isEnrollmentOpen(): bool
    {
        return $this->status === 'enrollment' && now()->between($this->enrollment_start, $this->enrollment_end);
    }

    public function getDisplayNameAttribute(): string
    {
        return "AY {$this->academic_year} - {$this->semester} Semester";
    }
}