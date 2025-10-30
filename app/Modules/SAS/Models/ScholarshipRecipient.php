<?php

namespace App\Modules\SAS\Models;

use App\Models\User;
use Database\Factories\ScholarshipRecipientFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
