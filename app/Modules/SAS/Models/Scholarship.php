<?php

namespace App\Modules\SAS\Models;

use Database\Factories\ScholarshipFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Scholarship extends Model
{
    use HasFactory;

    protected $fillable = [
        'scholarship_code',
        'scholarship_name',
        'scholarship_type',
        'description',
        'provider',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    protected static function newFactory(): ScholarshipFactory
    {
        return ScholarshipFactory::new();
    }

    public function recipients(): HasMany
    {
        return $this->hasMany(ScholarshipRecipient::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
