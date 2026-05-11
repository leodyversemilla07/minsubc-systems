<?php

namespace Modules\Guidance\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InterventionParticipant extends Model
{
    protected $table = 'gdn_intervention_participants';

    protected $fillable = ['intervention_id', 'student_id', 'status', 'notes'];

    public function intervention(): BelongsTo
    {
        return $this->belongsTo(Intervention::class, 'intervention_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Student::class, 'student_id');
    }
}