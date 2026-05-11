<?php

namespace Modules\Guidance\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Guidance\Database\Factories\IncidentReportFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IncidentReport extends Model
{
    use HasFactory;

    protected $table = 'gdn_incident_reports';

    protected $fillable = [
        'incident_code', 'student_id', 'reported_by', 'type',
        'incident_date', 'description', 'severity', 'location', 'action_taken', 'status',
    ];

    protected static function newFactory(): IncidentReportFactory
    {
        return IncidentReportFactory::new();
    }

    protected function casts(): array
    {
        return ['incident_date' => 'date'];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Student::class, 'student_id');
    }

    public function reporter(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'reported_by');
    }
}