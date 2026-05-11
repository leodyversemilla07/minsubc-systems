<?php

namespace Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Prerequisite extends Model
{
    protected $table = 'cur_prerequisites';
    protected $fillable = ['course_id', 'prerequisite_id', 'type'];
    public function course(): BelongsTo { return $this->belongsTo(Course::class, 'course_id'); }
    public function prerequisite(): BelongsTo { return $this->belongsTo(Course::class, 'prerequisite_id'); }
}