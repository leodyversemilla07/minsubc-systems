<?php

namespace Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SyllabusTextbook extends Model
{
    protected $table = 'cur_syllabus_textbooks';
    protected $fillable = ['syllabus_id', 'textbook_id', 'type'];
    public function syllabus(): BelongsTo { return $this->belongsTo(Syllabus::class, 'syllabus_id'); }
    public function textbook(): BelongsTo { return $this->belongsTo(Textbook::class, 'textbook_id'); }
}