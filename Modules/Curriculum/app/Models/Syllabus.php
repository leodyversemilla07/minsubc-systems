<?php

namespace Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Curriculum\Database\Factories\SyllabusFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Syllabus extends Model
{
    use HasFactory;
    protected $table = 'cur_syllabi';
    protected $fillable = ['course_id', 'version', 'academic_year', 'semester', 'course_description', 'learning_objectives', 'grading_system', 'grading_components', 'course_policies', 'weekly_topics', 'references', 'status', 'prepared_by', 'approved_by', 'approved_at'];
    protected static function newFactory(): SyllabusFactory { return SyllabusFactory::new(); }
    protected function casts(): array { return ['grading_components' => 'json', 'course_policies' => 'json', 'weekly_topics' => 'json', 'references' => 'json', 'approved_at' => 'datetime']; }
    public function course(): BelongsTo { return $this->belongsTo(Course::class, 'course_id'); }
    public function courseOutcomes(): HasMany { return $this->hasMany(CourseOutcome::class, 'syllabus_id'); }
    public function textbooks(): BelongsToMany { return $this->belongsToMany(Textbook::class, 'cur_syllabus_textbooks', 'syllabus_id', 'textbook_id')->withPivot('type'); }
}