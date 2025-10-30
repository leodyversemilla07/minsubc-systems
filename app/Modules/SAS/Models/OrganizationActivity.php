<?php

namespace App\Modules\SAS\Models;

use App\Models\User;
use Database\Factories\OrganizationActivityFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrganizationActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'activity_name',
        'description',
        'activity_date',
        'venue',
        'participants_count',
        'budget',
        'expenses',
        'accomplishment_report',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'activity_date' => 'date',
            'budget' => 'decimal:2',
            'expenses' => 'decimal:2',
        ];
    }

    protected static function newFactory(): OrganizationActivityFactory
    {
        return OrganizationActivityFactory::new();
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
