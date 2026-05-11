<?php

namespace Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseOutcome extends Model
{
    protected $table = 'cur_course_outcomes';
    protected $fillable = ['syllabus_id', 'code', 'description', 'domain', 'sort_order'];
    public function syllabus(): BelongsTo { return $this->belongsTo(Syllabus::class, 'syllabus_id'); }
    public function mappings(): \Illuminate\Database\Eloquent\Relations\HasMany { return $this->hasMany(CoPoMapping::class, 'course_outcome_id'); }
}