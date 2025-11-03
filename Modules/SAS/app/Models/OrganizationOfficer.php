<?php

namespace Modules\SAS\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\SAS\Database\Factories\OrganizationOfficerFactory;

class OrganizationOfficer extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'student_id',
        'position',
        'term_start',
        'term_end',
        'responsibilities',
        'photo_path',
        'contact_email',
        'contact_phone',
        'is_current',
    ];

    protected function casts(): array
    {
        return [
            'term_start' => 'date',
            'term_end' => 'date',
            'is_current' => 'boolean',
        ];
    }

    protected static function newFactory(): OrganizationOfficerFactory
    {
        return OrganizationOfficerFactory::new();
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function scopeCurrent($query)
    {
        return $query->where('is_current', true);
    }

    public function scopeByOrganization($query, int $orgId)
    {
        return $query->where('organization_id', $orgId);
    }
}
