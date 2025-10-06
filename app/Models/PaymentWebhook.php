<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentWebhook extends Model
{
    protected $fillable = [
        'event_id',
        'event_type',
        'payload',
        'processed',
        'processed_at',
        'error_message',
    ];

    protected $casts = [
        'payload' => 'array',
        'processed' => 'boolean',
        'processed_at' => 'datetime',
    ];

    /**
     * Mark the webhook as processed.
     */
    public function markAsProcessed(): void
    {
        $this->update([
            'processed' => true,
            'processed_at' => now(),
        ]);
    }

    /**
     * Mark the webhook as failed with an error message.
     */
    public function markAsFailed(string $errorMessage): void
    {
        $this->update([
            'processed' => false,
            'error_message' => $errorMessage,
        ]);
    }

    /**
     * Check if the webhook has been processed.
     */
    public function isProcessed(): bool
    {
        return $this->processed;
    }
}
