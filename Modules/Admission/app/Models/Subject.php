<?php

namespace Modules\Admission\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    use HasFactory;

    protected $table = 'admission_subjects';

    protected $fillable = [
        'course_id',
        'code',
        'name',
        'description',
        'units',
        'semester',
        'year_level',
        'type',
        'lab_hours',
        'lec_hours',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'units' => 'integer',
            'year_level' => 'integer',
            'lab_hours' => 'integer',
            'lec_hours' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class, 'subject_id');
    }

    public function scopeForCourse($query, $courseId)
    {
        return $query->where('course_id', $courseId);
    }

    public function scopeForYearLevel($query, $level)
    {
        return $query->where('year_level', $level);
    }

    public function scopeForSemester($query, $semester)
    {
        return $query->where(function ($q) use ($semester) {
            $q->where('semester', $semester)
              ->orWhere('semester', 'All');
        });
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getTotalHoursAttribute(): int
    {
        return $this->lec_hours + $this->lab_hours;
    }

    public function getDisplayNameAttribute(): string
    {
        return "{$this->code} - {$this->name}";
    }
}