<?php

namespace Modules\Guidance\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Guidance\Database\Factories\CounselorFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Counselor extends Model
{
    use HasFactory;

    protected $table = 'gdn_counselors';

    protected $fillable = [
        'counselor_id', 'user_id', 'first_name', 'last_name', 'email',
        'phone', 'specialization', 'bio', 'profile_photo', 'is_available', 'is_active',
    ];

    protected static function newFactory(): CounselorFactory
    {
        return CounselorFactory::new();
    }

    protected function casts(): array
    {
        return ['is_available' => 'boolean', 'is_active' => 'boolean'];
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function slots(): HasMany
    {
        return $this->hasMany(AppointmentSlot::class, 'counselor_id');
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'counselor_id');
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(CounselingSession::class, 'counselor_id');
    }
}