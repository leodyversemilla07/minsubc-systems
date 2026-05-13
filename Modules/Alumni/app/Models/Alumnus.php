<?php

namespace Modules\Alumni\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Alumni\Database\Factories\AlumnusFactory;

class Alumnus extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'alm_alumni';

    protected $fillable = [
        'student_id', 'first_name', 'middle_name', 'last_name', 'suffix',
        'email', 'phone', 'address', 'city', 'province', 'country',
        'birth_date', 'gender',
        'civil_status',
        'graduation_year', 'degree_program', 'college',
        'is_employed', 'is_verified', 'linkedin_url', 'photo_url',
        'preferred_contact_method',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'graduation_year' => 'integer',
            'is_employed' => 'boolean',
            'is_verified' => 'boolean',
        ];
    }

    public function employmentRecords(): HasMany
    {
        return $this->hasMany(EmploymentRecord::class, 'alumnus_id');
    }

    public function educations(): HasMany
    {
        return $this->hasMany(Education::class, 'alumnus_id');
    }

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class, 'alumnus_id');
    }

    public function eventParticipants(): HasMany
    {
        return $this->hasMany(EventParticipant::class, 'alumnus_id');
    }

    public function surveyResponses(): HasMany
    {
        return $this->hasMany(SurveyResponse::class, 'alumnus_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Student::class, 'student_id', 'student_id');
    }

    public function getFullNameAttribute(): string
    {
        $name = trim("{$this->first_name} {$this->middle_name} {$this->last_name}");
        return $this->suffix ? "{$name} {$this->suffix}" : $name;
    }

    protected static function newFactory(): AlumnusFactory
    {
        return AlumnusFactory::new();
    }
}