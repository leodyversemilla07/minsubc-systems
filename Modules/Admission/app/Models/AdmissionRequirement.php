<?php

namespace Modules\Admission\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdmissionRequirement extends Model
{
    protected $table = 'admission_requirements';
    protected $fillable = ['program_id', 'name', 'description', 'is_required', 'sort_order'];

    protected function casts(): array
    {
        return ['is_required' => 'boolean', 'sort_order' => 'integer'];
    }

    public function program(): BelongsTo { return $this->belongsTo(AdmissionProgram::class, 'program_id'); }
}
