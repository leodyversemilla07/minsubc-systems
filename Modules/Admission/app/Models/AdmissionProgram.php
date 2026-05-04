<?php

namespace Modules\Admission\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdmissionProgram extends Model
{
    protected $fillable = [
        'course_id', 'academic_year', 'semester', 'name', 'description',
        'slots', 'slots_filled', 'application_start', 'application_end', 'status',
    ];

    protected function casts(): array
    {
        return [
            'slots' => 'integer',
            'slots_filled' => 'integer',
            'application_start' => 'date',
            'application_end' => 'date',
        ];
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function applicants(): HasMany
    {
        return $this->hasMany(Applicant::class, 'program_id');
    }

    public function requirements(): HasMany
    {
        return $this->hasMany(AdmissionRequirement::class, 'program_id');
    }

    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }

    public function getSlotsAvailableAttribute(): int
    {
        return max(0, $this->slots - $this->slots_filled);
    }

    public function getIsOpenAttribute(): bool
    {
        return $this->status === 'open'
            && now()->between($this->application_start, $this->application_end)
            && $this->slots_available > 0;
    }
}
