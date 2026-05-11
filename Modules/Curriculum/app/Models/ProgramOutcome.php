<?php

namespace Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProgramOutcome extends Model
{
    protected $table = 'cur_program_outcomes';
    protected $fillable = ['program_id', 'code', 'description', 'domain', 'sort_order'];
    public function program(): BelongsTo { return $this->belongsTo(Program::class, 'program_id'); }
    public function mappings(): HasMany { return $this->hasMany(CoPoMapping::class, 'program_outcome_id'); }
}