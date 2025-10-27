<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentWebhook extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'event_type',
        'payload',
        'processed',
        'processed_at',
        'error_message',
    ];

    protected function casts(): array
    {
        return [
            'payload' => 'array',
            'processed' => 'boolean',
            'processed_at' => 'datetime',
        ];
    }

    /**
     * Scope to get unprocessed webhooks.
     */
    public function scopeUnprocessed($query): mixed
    {
        return $query->where('processed', false);
    }

    /**
     * Scope to get failed webhooks.
     */
    public function scopeFailed($query): mixed
    {
        return $query->whereNotNull('error_message');
    }

    /**
     * Mark webhook as processed.
     */
    public function markAsProcessed(): void
    {
        $this->update([
            'processed' => true,
            'processed_at' => now(),
        ]);
    }

    /**
     * Mark webhook as failed.
     */
    public function markAsFailed(string $errorMessage): void
    {
        $this->update([
            'processed' => true,
            'processed_at' => now(),
            'error_message' => $errorMessage,
        ]);
    }
}
