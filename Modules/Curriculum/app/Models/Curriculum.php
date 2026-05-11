<?php

namespace Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Curriculum\Database\Factories\CurriculumFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Curriculum extends Model
{
    use HasFactory;
    protected $table = 'cur_curricula';
    protected $fillable = ['program_id', 'version_name', 'academic_year', 'total_units', 'description', 'status', 'effective_date', 'approved_at', 'approved_by'];
    protected static function newFactory(): CurriculumFactory { return CurriculumFactory::new(); }
    protected function casts(): array { return ['effective_date' => 'date', 'approved_at' => 'datetime']; }
    public function program(): BelongsTo { return $this->belongsTo(Program::class, 'program_id'); }
    public function courses(): HasMany { return $this->hasMany(CurriculumCourse::class, 'curriculum_id'); }
}