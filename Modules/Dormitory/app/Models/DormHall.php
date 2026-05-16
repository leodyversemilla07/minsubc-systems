<?php

namespace Modules\Dormitory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DormHall extends Model
{
    use HasFactory;
    protected $table = 'drm_halls';
    protected $fillable = ['name', 'code', 'address', 'floors', 'gender', 'warden_name', 'warden_phone', 'is_active'];
    protected function casts(): array { return ['is_active' => 'boolean', 'floors' => 'integer']; }
    public function rooms(): HasMany { return $this->hasMany(DormRoom::class, 'hall_id'); }

    protected static function newFactory()
    {
        return \Modules\Dormitory\Database\Factories\DormHallFactory::new();
    }
}