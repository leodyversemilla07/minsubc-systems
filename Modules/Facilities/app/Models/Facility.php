<?php

namespace Modules\Facilities\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Facilities\Database\Factories\FacilityFactory;

class Facility extends Model
{
    use HasFactory;

    protected $table = 'fac_facilities';

    protected $fillable = [
        'name', 'code', 'type', 'description', 'location',
        'capacity', 'floor', 'building',
        'amenities', 'rules',
        'is_available', 'operating_hours',
        'photo_url',
    ];

    protected function casts(): array
    {
        return [
            'capacity' => 'integer',
            'is_available' => 'boolean',
            'amenities' => 'array',
        ];
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class, 'facility_id');
    }

    public function equipment(): HasMany
    {
        return $this->hasMany(Equipment::class, 'facility_id');
    }

    protected static function newFactory(): FacilityFactory
    {
        return FacilityFactory::new();
    }
}