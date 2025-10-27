<?php

namespace App\Modules\Registrar\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'student_id',
        'type',
        'message',
        'status',
        'sent_at',
        'error_message',
    ];

    protected function casts(): array
    {
        return [
            'sent_at' => 'datetime',
        ];
    }

    /**
     * Get the document request that this notification belongs to.
     */
    public function documentRequest(): BelongsTo
    {
        return $this->belongsTo(DocumentRequest::class, 'request_id');
    }

    /**
     * Get the student that this notification is for.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }

    /**
     * Check if this is an SMS notification.
     */
    public function isSms(): bool
    {
        return $this->type === 'sms';
    }

    /**
     * Check if this is an email notification.
     */
    public function isEmail(): bool
    {
        return $this->type === 'email';
    }

    /**
     * Check if this is a combined SMS and email notification.
     */
    public function isBoth(): bool
    {
        return $this->type === 'both';
    }

    /**
     * Check if the notification has been sent.
     */
    public function isSent(): bool
    {
        return $this->status === 'sent';
    }

    /**
     * Check if the notification is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if the notification failed.
     */
    public function isFailed(): bool
    {
        return $this->status === 'failed';
    }

    /**
     * Mark the notification as sent.
     */
    public function markAsSent(): void
    {
        $this->update([
            'status' => 'sent',
            'sent_at' => now(),
        ]);
    }

    /**
     * Mark the notification as failed with an error message.
     */
    public function markAsFailed(string $errorMessage): void
    {
        $this->update([
            'status' => 'failed',
            'error_message' => $errorMessage,
        ]);
    }
}
