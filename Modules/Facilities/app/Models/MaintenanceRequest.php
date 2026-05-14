<?php

namespace Modules\Facilities\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MaintenanceRequest extends Model
{
    use HasFactory;

    protected $table = 'fac_maintenance_requests';

    protected $fillable = [
        'facility_id', 'equipment_id', 'title', 'description',
        'priority', 'status', 'requested_by', 'assigned_to',
        'scheduled_date', 'completed_date', 'cost', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_date' => 'date',
            'completed_date' => 'date',
            'cost' => 'decimal:2',
        ];
    }

    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }
}