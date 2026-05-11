<?php

namespace Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Curriculum\Database\Factories\CourseFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;
    protected $table = 'cur_courses';
    protected $fillable = ['code', 'name', 'description', 'units', 'lecture_hours', 'lab_hours', 'category', 'is_lab', 'is_active'];
    protected static function newFactory(): CourseFactory { return CourseFactory::new(); }
    protected function casts(): array { return ['units' => 'decimal:1', 'lecture_hours' => 'decimal:1', 'lab_hours' => 'decimal:1', 'is_active' => 'boolean']; }
    public function prerequisites(): BelongsToMany { return $this->belongsToMany(Course::class, 'cur_prerequisites', 'course_id', 'prerequisite_id'); }
    public function syllabi(): HasMany { return $this->hasMany(Syllabus::class, 'course_id'); }
    public function curriculumCourses(): HasMany { return $this->hasMany(CurriculumCourse::class, 'course_id'); }
}