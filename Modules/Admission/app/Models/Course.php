<?php

namespace Modules\Admission\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Admission\Database\Factories\CourseFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'name', 'abbreviation', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    protected static function newFactory(): CourseFactory
    {
        return CourseFactory::new();
    }

    public function programs(): HasMany
    {
        return $this->hasMany(AdmissionProgram::class, 'course_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}