<?php

namespace Modules\Discipline\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Incident extends Model
{
    use HasFactory;

    protected $table = 'dsc_incidents';

    protected $fillable = [
        'student_id', 'offense_id', 'reported_by', 'incident_date',
        'location', 'description', 'status', 'resolution',
    ];

    protected function casts(): array
    {
        return ['incident_date' => 'date'];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Student::class, 'student_id', 'student_id');
    }

    public function offense(): BelongsTo
    {
        return $this->belongsTo(Offense::class);
    }

    public function reporter(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'reported_by');
    }

    public function sanction(): HasOne
    {
        return $this->hasOne(Sanction::class, 'incident_id');
    }

    public function appeals(): HasMany
    {
        return $this->hasMany(Appeal::class, 'incident_id');
    }

    protected static function newFactory(): \Modules\Discipline\Database\Factories\IncidentFactory
    {
        return \Modules\Discipline\Database\Factories\IncidentFactory::new();
    }
}