<?php

namespace Modules\Admission\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Section extends Model
{
    use HasFactory;

    protected $table = 'admission_sections';

    protected $fillable = [
        'academic_term_id',
        'course_id',
        'name',
        'year_level',
        'max_students',
        'current_students',
        'adviser_id',
        'status',
        'room',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'max_students' => 'integer',
            'current_students' => 'integer',
            'year_level' => 'integer',
        ];
    }

    public function academicTerm(): BelongsTo
    {
        return $this->belongsTo(AcademicTerm::class, 'academic_term_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function adviser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'adviser_id');
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class, 'section_id');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class, 'section_id');
    }

    public function scopeForTerm($query, $termId)
    {
        return $query->where('academic_term_id', $termId);
    }

    public function scopeForCourse($query, $courseId)
    {
        return $query->where('course_id', $courseId);
    }

    public function scopeForYearLevel($query, $level)
    {
        return $query->where('year_level', $level);
    }

    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }

    public function getSlotsAvailableAttribute(): int
    {
        return max(0, $this->max_students - $this->current_students);
    }

    public function getIsFullAttribute(): bool
    {
        return $this->current_students >= $this->max_students;
    }

    public function getDisplayNameAttribute(): string
    {
        return $this->name;
    }
}