<?php

namespace Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoPoMapping extends Model
{
    protected $table = 'cur_co_po_mappings';
    protected $fillable = ['course_outcome_id', 'program_outcome_id', 'strength'];
    public function courseOutcome(): BelongsTo { return $this->belongsTo(CourseOutcome::class, 'course_outcome_id'); }
    public function programOutcome(): BelongsTo { return $this->belongsTo(ProgramOutcome::class, 'program_outcome_id'); }
}