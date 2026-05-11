<?php

namespace Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CurriculumCourse extends Model
{
    protected $table = 'cur_curriculum_courses';
    protected $fillable = ['curriculum_id', 'course_id', 'year_level', 'semester', 'is_elective', 'notes', 'sort_order'];
    protected function casts(): array { return ['is_elective' => 'boolean']; }
    public function curriculum(): BelongsTo { return $this->belongsTo(Curriculum::class, 'curriculum_id'); }
    public function course(): BelongsTo { return $this->belongsTo(Course::class, 'course_id'); }
}