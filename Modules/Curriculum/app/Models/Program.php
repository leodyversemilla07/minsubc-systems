<?php

namespace Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Curriculum\Database\Factories\ProgramFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Program extends Model
{
    use HasFactory;
    protected $table = 'cur_programs';
    protected $fillable = ['code', 'name', 'full_name', 'level', 'college', 'years', 'total_units', 'description', 'objectives', 'career_opportunities', 'is_active'];
    protected static function newFactory(): ProgramFactory { return ProgramFactory::new(); }
    protected function casts(): array { return ['is_active' => 'boolean']; }
    public function curricula(): HasMany { return $this->hasMany(Curriculum::class, 'program_id'); }
    public function outcomes(): HasMany { return $this->hasMany(ProgramOutcome::class, 'program_id'); }
}