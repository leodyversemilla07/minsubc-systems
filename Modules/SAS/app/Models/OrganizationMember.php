<?php

namespace Modules\SAS\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\SAS\Database\Factories\OrganizationMemberFactory;

class OrganizationMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'student_id',
        'membership_date',
        'status',
        'membership_end_date',
    ];

    protected function casts(): array
    {
        return [
            'membership_date' => 'date',
            'membership_end_date' => 'date',
        ];
    }

    protected static function newFactory(): OrganizationMemberFactory
    {
        return OrganizationMemberFactory::new();
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }

    public function scopeByOrganization($query, int $orgId)
    {
        return $query->where('organization_id', $orgId);
    }
}
