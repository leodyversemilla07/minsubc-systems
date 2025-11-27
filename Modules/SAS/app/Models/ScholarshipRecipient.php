<?php

namespace Modules\SAS\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\SAS\Database\Factories\ScholarshipRecipientFactory;

/**
 * @property int $id
 * @property int $student_id
 * @property int $scholarship_id
 * @property string $academic_year
 * @property string $semester
 * @property float $amount
 * @property string $status
 * @property \Carbon\Carbon|null $date_awarded
 * @property \Carbon\Carbon|null $expiration_date
 * @property string $renewal_status
 * @property string|null $remarks
 * @property bool $requirements_complete
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read Scholarship $scholarship
 * @property-read User $student
 * @property-read User|null $createdBy
 * @property-read User|null $updatedBy
 * @property-read \Illuminate\Database\Eloquent\Collection<ScholarshipRequirement> $requirements
 * @property-read \Illuminate\Database\Eloquent\Collection<ScholarshipRenewal> $renewals
 */
class ScholarshipRecipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'scholarship_id',
        'academic_year',
        'semester',
        'amount',
        'status',
        'date_awarded',
        'expiration_date',
        'renewal_status',
        'remarks',
        'requirements_complete',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'date_awarded' => 'date',
            'expiration_date' => 'date',
            'requirements_complete' => 'boolean',
            'amount' => 'decimal:2',
        ];
    }

    protected static function newFactory(): ScholarshipRecipientFactory
    {
        return ScholarshipRecipientFactory::new();
    }

    public function scholarship(): BelongsTo
    {
        return $this->belongsTo(Scholarship::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function requirements(): HasMany
    {
        return $this->hasMany(ScholarshipRequirement::class, 'recipient_id');
    }

    public function renewals(): HasMany
    {
        return $this->hasMany(ScholarshipRenewal::class, 'recipient_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }

    public function scopeByScholarshipType($query, string $type)
    {
        return $query->whereHas('scholarship', fn ($q) => $q->where('scholarship_type', $type));
    }

    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    public function scopeRequirementsIncomplete($query)
    {
        return $query->where('requirements_complete', false);
    }
}
