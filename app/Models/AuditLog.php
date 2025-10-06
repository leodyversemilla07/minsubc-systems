<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditLog extends Model
{
    protected $fillable = [
        'user_id',
        'action',
        'entity_type',
        'entity_id',
        'old_values',
        'new_values',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
        'user_id' => 'integer',
        'entity_id' => 'integer',
    ];

    /**
     * Get the user who performed this action.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Create an audit log entry.
     */
    public static function log(
        int $userId,
        string $action,
        string $entityType,
        int $entityId,
        ?array $oldValues = null,
        ?array $newValues = null
    ): static {
        return static::create([
            'user_id' => $userId,
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    /**
     * Log a document request creation.
     */
    public static function logDocumentRequestCreated(int $userId, int $requestId, array $data): static
    {
        return static::log($userId, 'request_created', 'document_request', $requestId, null, $data);
    }

    /**
     * Log a payment confirmation.
     */
    public static function logPaymentConfirmed(int $userId, int $paymentId, array $data): static
    {
        return static::log($userId, 'payment_confirmed', 'payment', $paymentId, null, $data);
    }

    /**
     * Log a document release.
     */
    public static function logDocumentReleased(int $userId, int $requestId, array $data): static
    {
        return static::log($userId, 'document_released', 'document_request', $requestId, null, $data);
    }
}
