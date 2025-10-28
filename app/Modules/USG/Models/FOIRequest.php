<?php

namespace App\Modules\USG\Models;

use App\Enums\FOIPriority;
use App\Enums\FOIRequestStatus;
use App\Enums\FOIRequestType;
use App\Models\User;
use Database\Factories\FOIRequestFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FOIRequest extends Model
{
    use HasFactory;

    protected $table = 'usg_foi_requests';

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'request_type',
        'status',
        'priority',
        'submitted_at',
        'reviewed_at',
        'completed_at',
        'rejected_at',
        'reviewer_id',
        'rejection_reason',
        'internal_notes',
    ];

    protected function casts(): array
    {
        return [
            'request_type' => FOIRequestType::class,
            'status' => FOIRequestStatus::class,
            'priority' => FOIPriority::class,
            'submitted_at' => 'datetime',
            'reviewed_at' => 'datetime',
            'completed_at' => 'datetime',
            'rejected_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function responses(): HasMany
    {
        return $this->hasMany(FOIResponse::class, 'foi_request_id');
    }

    public function isPending(): bool
    {
        return $this->status === FOIRequestStatus::Pending;
    }

    public function isUnderReview(): bool
    {
        return $this->status === FOIRequestStatus::UnderReview;
    }

    public function isCompleted(): bool
    {
        return $this->status === FOIRequestStatus::Completed;
    }

    public function isRejected(): bool
    {
        return $this->status === FOIRequestStatus::Rejected;
    }

    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', FOIRequestStatus::Pending->value);
    }

    public function scopeUnderReview(Builder $query): Builder
    {
        return $query->where('status', FOIRequestStatus::UnderReview->value);
    }

    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('status', FOIRequestStatus::Completed->value);
    }

    public function scopeRejected(Builder $query): Builder
    {
        return $query->where('status', FOIRequestStatus::Rejected->value);
    }

    public function scopeForUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    protected static function newFactory(): FOIRequestFactory
    {
        return FOIRequestFactory::new();
    }
}
