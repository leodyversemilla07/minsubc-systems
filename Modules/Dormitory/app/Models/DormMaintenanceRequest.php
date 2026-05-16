<?php

namespace Modules\Dormitory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DormMaintenanceRequest extends Model
{
    use HasFactory;
    protected $table = 'drm_maintenance';
    protected $fillable = ['room_id', 'reported_by', 'issue_type', 'description', 'priority', 'status', 'assigned_to', 'resolved_at', 'notes'];
    protected function casts(): array { return ['resolved_at' => 'datetime']; }
    public function room(): BelongsTo { return $this->belongsTo(DormRoom::class, 'room_id'); }
    public function reporter(): BelongsTo { return $this->belongsTo(\App\Models\User::class, 'reported_by'); }
    public function assignee(): BelongsTo { return $this->belongsTo(\App\Models\User::class, 'assigned_to'); }

    protected static function newFactory()
    {
        return \Modules\Dormitory\Database\Factories\DormMaintenanceFactory::new();
    }
}