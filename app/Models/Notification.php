<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\DatabaseNotification;

class Notification extends DatabaseNotification
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'notifications';

    /**
     * Indicates if the IDs are auto-incrementing.
     */
    public $incrementing = false;

    /**
     * The "type" of the primary key ID.
     */
    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'data' => 'array',
            'read_at' => 'datetime',
        ];
    }

    /**
     * Get the request ID from notification data.
     */
    public function getRequestIdAttribute(): ?int
    {
        return $this->data['request_id'] ?? null;
    }

    /**
     * Get the student ID from notification data.
     */
    public function getStudentIdAttribute(): ?string
    {
        return $this->data['student_id'] ?? null;
    }

    /**
     * Get the notification type (sms, email, both) from data.
     */
    public function getNotificationTypeAttribute(): ?string
    {
        return $this->data['notification_type'] ?? null;
    }

    /**
     * Get the message from notification data.
     */
    public function getMessageAttribute(): ?string
    {
        return $this->data['message'] ?? null;
    }

    /**
     * Get the status from notification data.
     */
    public function getStatusAttribute(): ?string
    {
        return $this->data['status'] ?? 'pending';
    }

    /**
     * Get the sent_at timestamp from notification data.
     */
    public function getSentAtAttribute(): ?string
    {
        return $this->data['sent_at'] ?? null;
    }

    /**
     * Get the error message from notification data.
     */
    public function getErrorMessageAttribute(): ?string
    {
        return $this->data['error_message'] ?? null;
    }

    /**
     * Check if this is an SMS notification.
     */
    public function isSms(): bool
    {
        return $this->notification_type === 'sms';
    }

    /**
     * Check if this is an email notification.
     */
    public function isEmail(): bool
    {
        return $this->notification_type === 'email';
    }

    /**
     * Check if this is a combined SMS and email notification.
     */
    public function isBoth(): bool
    {
        return $this->notification_type === 'both';
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
        $data = $this->data;
        $data['status'] = 'sent';
        $data['sent_at'] = now()->toISOString();

        $this->update(['data' => $data]);
    }

    /**
     * Mark the notification as failed with an error message.
     */
    public function markAsFailed(string $errorMessage): void
    {
        $data = $this->data;
        $data['status'] = 'failed';
        $data['error_message'] = $errorMessage;

        $this->update(['data' => $data]);
    }
}
