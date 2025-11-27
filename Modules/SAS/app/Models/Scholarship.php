<?php

namespace Modules\SAS\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\SAS\Database\Factories\ScholarshipFactory;

/**
 * @property int $id
 * @property string $scholarship_code
 * @property string $scholarship_name
 * @property string $scholarship_type
 * @property string|null $description
 * @property string|null $provider
 * @property bool $is_active
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<ScholarshipRecipient> $recipients
 */
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
