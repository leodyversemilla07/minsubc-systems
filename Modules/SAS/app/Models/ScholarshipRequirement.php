<?php

namespace Modules\SAS\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\SAS\Database\Factories\ScholarshipRequirementFactory;

class ScholarshipRequirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'recipient_id',
        'requirement_name',
        'is_submitted',
        'submission_date',
        'file_path',
        'deadline',
        'remarks',
    ];

    protected function casts(): array
    {
        return [
            'is_submitted' => 'boolean',
            'submission_date' => 'date',
            'deadline' => 'date',
        ];
    }

    protected static function newFactory(): ScholarshipRequirementFactory
    {
        return ScholarshipRequirementFactory::new();
    }

    public function recipient(): BelongsTo
    {
        return $this->belongsTo(ScholarshipRecipient::class, 'recipient_id');
    }

    public function scopePending($query)
    {
        return $query->where('is_submitted', false);
    }

    public function scopeOverdue($query)
    {
        return $query->where('is_submitted', false)
            ->where('deadline', '<', now());
    }
}
