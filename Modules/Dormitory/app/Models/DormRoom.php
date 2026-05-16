<?php

namespace Modules\Dormitory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DormRoom extends Model
{
    use HasFactory;
    protected $table = 'drm_rooms';
    protected $fillable = ['hall_id', 'room_number', 'floor', 'room_type', 'capacity', 'beds_count', 'is_active'];
    protected function casts(): array { return ['is_active' => 'boolean', 'floor' => 'integer', 'capacity' => 'integer', 'beds_count' => 'integer']; }
    public function hall(): BelongsTo { return $this->belongsTo(DormHall::class, 'hall_id'); }
    public function beds(): HasMany { return $this->hasMany(DormBed::class, 'room_id'); }

    protected static function newFactory()
    {
        return \Modules\Dormitory\Database\Factories\DormRoomFactory::new();
    }
}