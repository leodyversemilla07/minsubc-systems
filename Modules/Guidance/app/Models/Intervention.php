<?php

namespace Modules\Guidance\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Guidance\Database\Factories\InterventionFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Intervention extends Model
{
    use HasFactory;

    protected $table = 'gdn_interventions';

    protected $fillable = [
        'title', 'description', 'type', 'start_date', 'end_date',
        'location', 'max_participants', 'status',
    ];

    protected static function newFactory(): InterventionFactory
    {
        return InterventionFactory::new();
    }

    protected function casts(): array
    {
        return ['start_date' => 'date', 'end_date' => 'date'];
    }

    public function participants(): HasMany
    {
        return $this->hasMany(InterventionParticipant::class, 'intervention_id');
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Student::class, 'gdn_intervention_participants', 'intervention_id', 'student_id')
            ->withPivot('status', 'notes');
    }
}