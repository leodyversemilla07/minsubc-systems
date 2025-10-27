<?php

namespace App\Modules\Registrar\Models;

use App\Enums\DocumentRequestStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DocumentRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_number',
        'student_id',
        'document_type',
        'quantity',
        'purpose',
        'amount',
        'payment_method',
        'status',
        'payment_deadline',
        'processed_by',
        'released_by',
        'released_to',
        'released_id_type',
        'released_at',
        'rejection_reason',
        'notes',
        'claimed_by_student',
        'claimed_at',
        'claim_notes',
    ];

    protected function casts(): array
    {
        return [
            'status' => DocumentRequestStatus::class,
            'amount' => 'float',
            'quantity' => 'integer',
            'payment_deadline' => 'datetime',
            'released_at' => 'datetime',
            'processed_by' => 'integer',
            'released_by' => 'integer',
            'claimed_by_student' => 'boolean',
            'claimed_at' => 'datetime',
        ];
    }

    /**
     * Get the route key name for Laravel route model binding.
     */
    public function getRouteKeyName(): string
    {
        return 'request_number';
    }

    /**
     * Get the student that owns this document request.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }

    /**
     * Get the user who processed this request.
     */
    public function processor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    /**
     * Get the user who released this document.
     */
    public function releaser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'released_by');
    }

    /**
     * Get the payments for this document request.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'request_id');
    }

    /**
     * Get the latest payment for this document request.
     */
    public function latestPayment(): HasOne
    {
        return $this->hasOne(Payment::class, 'request_id')->latest();
    }

    /**
     * Get the notifications for this document request.
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class, 'request_id');
    }

    /**
     * Check if the request is paid.
     */
    public function isPaid(): bool
    {
        return $this->status === DocumentRequestStatus::Paid || $this->payments()->where('status', 'paid')->exists();
    }

    /**
     * Check if the request is pending payment.
     */
    public function isPendingPayment(): bool
    {
        return $this->status === DocumentRequestStatus::PendingPayment;
    }

    /**
     * Check if the payment is expired.
     */
    public function isPaymentExpired(): bool
    {
        return $this->status === DocumentRequestStatus::PaymentExpired;
    }

    /**
     * Check if the request is being processed.
     */
    public function isProcessing(): bool
    {
        return $this->status === DocumentRequestStatus::Processing;
    }

    /**
     * Check if the request is ready for pickup.
     */
    public function isReadyForClaim(): bool
    {
        return $this->status === DocumentRequestStatus::ReadyForClaim;
    }

    /**
     * Check if the request has been picked up.
     */
    public function isClaimed(): bool
    {
        return $this->status === DocumentRequestStatus::Claimed;
    }

    /**
     * Check if the request is released.
     */
    public function isReleased(): bool
    {
        return $this->status === DocumentRequestStatus::Released;
    }

    /**
     * Check if the request is cancelled.
     */
    public function isCancelled(): bool
    {
        return $this->status === DocumentRequestStatus::Cancelled;
    }

    /**
     * Check if the request is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === DocumentRequestStatus::Rejected;
    }

    /**
     * Check if the request is in a final state.
     */
    public function isFinal(): bool
    {
        return $this->status->isFinal();
    }

    /**
     * Check if the request is active.
     */
    public function isActive(): bool
    {
        return $this->status->isActive();
    }

    /**
     * Scope query to only active requests.
     */
    public function scopeActive($query)
    {
        return $query->whereIn('status', DocumentRequestStatus::activeStatuses());
    }

    /**
     * Scope query to only pending payment requests.
     */
    public function scopePendingPayment($query)
    {
        return $query->where('status', DocumentRequestStatus::PendingPayment);
    }

    /**
     * Scope query to only paid requests.
     */
    public function scopePaid($query)
    {
        return $query->where('status', DocumentRequestStatus::Paid);
    }

    /**
     * Scope query to only processing requests.
     */
    public function scopeProcessing($query)
    {
        return $query->where('status', DocumentRequestStatus::Processing);
    }

    /**
     * Scope query to only ready for claim requests.
     */
    public function scopeReadyForClaim($query)
    {
        return $query->where('status', DocumentRequestStatus::ReadyForClaim);
    }

    /**
     * Scope query to only claimed requests.
     */
    public function scopeClaimed($query)
    {
        return $query->where('status', DocumentRequestStatus::Claimed);
    }

    /**
     * Scope query to only released requests.
     */
    public function scopeReleased($query)
    {
        return $query->where('status', DocumentRequestStatus::Released);
    }

    /**
     * Transition the request to a new status.
     */
    public function transitionTo(DocumentRequestStatus $newStatus, ?string $reason = null): bool
    {
        if (! $this->status->canTransitionTo($newStatus)) {
            return false;
        }

        $this->status = $newStatus;

        if ($newStatus === DocumentRequestStatus::Rejected && $reason) {
            $this->rejection_reason = $reason;
        }

        if ($newStatus === DocumentRequestStatus::Claimed) {
            $this->claimed_at = now();
            $this->claimed_by_student = true;
        }

        if ($newStatus === DocumentRequestStatus::Released) {
            $this->released_at = now();
        }

        return $this->save();
    }

    /**
     * Mark the request as paid.
     */
    public function markAsPaid(string $paymentMethod, ?string $reference = null): bool
    {
        $this->payment_method = $paymentMethod;

        return $this->transitionTo(DocumentRequestStatus::Paid);
    }

    /**
     * Mark the request as processing.
     */
    public function markAsProcessing(): bool
    {
        return $this->transitionTo(DocumentRequestStatus::Processing);
    }

    /**
     * Mark the request as ready for claim.
     */
    public function markAsReadyForClaim(): bool
    {
        return $this->transitionTo(DocumentRequestStatus::ReadyForClaim);
    }

    /**
     * Mark the request as claimed.
     */
    public function markAsClaimed(): bool
    {
        return $this->transitionTo(DocumentRequestStatus::Claimed);
    }

    /**
     * Mark the request as released.
     */
    public function markAsReleased(): bool
    {
        return $this->transitionTo(DocumentRequestStatus::Released);
    }

    /**
     * Reject the request with a reason.
     */
    public function reject(string $reason): bool
    {
        return $this->transitionTo(DocumentRequestStatus::Rejected, $reason);
    }

    /**
     * Cancel the request.
     */
    public function cancel(): bool
    {
        return $this->transitionTo(DocumentRequestStatus::Cancelled);
    }

    /**
     * Get the count of document requests created today.
     */
    public static function getTodayRequestCount(?string $studentId = null): int
    {
        $query = self::whereDate('created_at', today());

        if ($studentId !== null) {
            $query->where('student_id', $studentId);
        }

        return $query->count();
    }

    /**
     * Check if the daily request limit has been reached.
     */
    public static function hasReachedDailyLimit(?string $studentId = null): bool
    {
        $dailyLimit = config('app.document_request_daily_limit', 5);
        $todayCount = self::getTodayRequestCount($studentId);

        return $todayCount >= $dailyLimit;
    }

    /**
     * Get the number of remaining requests allowed for today.
     */
    public static function getRemainingDailyRequests(?string $studentId = null): int
    {
        $dailyLimit = config('app.document_request_daily_limit', 5);
        $todayCount = self::getTodayRequestCount($studentId);

        return max(0, $dailyLimit - $todayCount);
    }

    /**
     * Generate a unique request number.
     */
    public static function generateRequestNumber(): string
    {
        do {
            $number = 'REQ-'.now()->format('Ymd').'-'.str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        } while (self::where('request_number', $number)->exists());

        return $number;
    }
}
