<?php

namespace App\Modules\SAS\Models;

use App\Models\User;
use Database\Factories\OrganizationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_code',
        'organization_name',
        'organization_type',
        'category',
        'mission',
        'vision',
        'establishment_date',
        'logo_path',
        'status',
        'adviser_id',
        'contact_email',
        'contact_phone',
    ];

    protected function casts(): array
    {
        return [
            'establishment_date' => 'date',
        ];
    }

    protected static function newFactory(): OrganizationFactory
    {
        return OrganizationFactory::new();
    }

    public function adviser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'adviser_id');
    }

    public function officers(): HasMany
    {
        return $this->hasMany(OrganizationOfficer::class);
    }

    public function currentOfficers(): HasMany
    {
        return $this->hasMany(OrganizationOfficer::class)->where('is_current', true);
    }

    public function allOfficers(): HasMany
    {
        return $this->hasMany(OrganizationOfficer::class);
    }

    public function members(): HasMany
    {
        return $this->hasMany(OrganizationMember::class);
    }

    public function activities(): HasMany
    {
        return $this->hasMany(OrganizationActivity::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(OrganizationDocument::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('organization_type', $type);
    }

    public function scopeMajor($query)
    {
        return $query->where('organization_type', 'Major');
    }

    public function scopeMinor($query)
    {
        return $query->where('organization_type', 'Minor');
    }

    public function getLogoUrlAttribute(): ?string
    {
        if ($this->logo_path) {
            return Storage::url($this->logo_path);
        }

        return null;
    }
}
