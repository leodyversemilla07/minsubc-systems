<?php

namespace Modules\Dormitory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DormBed extends Model
{
    use HasFactory;
    protected $table = 'drm_beds';
    protected $fillable = ['room_id', 'bed_label', 'position', 'is_occupied', 'is_active'];
    protected function casts(): array { return ['is_occupied' => 'boolean', 'is_active' => 'boolean']; }
    public function room(): BelongsTo { return $this->belongsTo(DormRoom::class, 'room_id'); }
    public function currentAssignment(): HasOne { return $this->hasOne(DormAssignment::class, 'bed_id')->whereNull('checkout_date'); }

    protected static function newFactory()
    {
        return \Modules\Dormitory\Database\Factories\DormBedFactory::new();
    }
}