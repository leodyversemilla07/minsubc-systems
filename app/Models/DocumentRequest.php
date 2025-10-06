<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DocumentRequest extends Model
{
    protected $fillable = [
        'request_number',
        'student_id',
        'document_type',
        'processing_type',
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
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'quantity' => 'integer',
        'payment_deadline' => 'datetime',
        'released_at' => 'datetime',
        'processed_by' => 'integer',
        'released_by' => 'integer',
    ];

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
        return $this->status === 'paid' || $this->payments()->where('status', 'paid')->exists();
    }

    /**
     * Check if the request is ready for pickup.
     */
    public function isReadyForPickup(): bool
    {
        return $this->status === 'ready_for_pickup';
    }

    /**
     * Check if the request is released.
     */
    public function isReleased(): bool
    {
        return $this->status === 'released';
    }
}
