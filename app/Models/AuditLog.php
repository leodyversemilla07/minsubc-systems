<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'action',
        'model_type',
        'model_id',
        'old_values',
        'new_values',
        'ip_address',
        'user_agent',
        'description',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'old_values' => 'array',
            'new_values' => 'array',
            'metadata' => 'array',
        ];
    }

    /**
     * Get the user who performed this action.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Log an action performed by a user.
     */
    public static function log(
        string $action,
        ?int $userId = null,
        ?string $modelType = null,
        ?int $modelId = null,
        ?array $oldValues = null,
        ?array $newValues = null,
        ?string $description = null,
        ?array $metadata = null
    ): static {
        $request = request();

        return static::create([
            'user_id' => $userId,
            'action' => $action,
            'model_type' => $modelType,
            'model_id' => $modelId,
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'ip_address' => $request ? $request->ip() : null,
            'user_agent' => $request ? $request->userAgent() : null,
            'description' => $description,
            'metadata' => $metadata,
        ]);
    }

    /**
     * Get the model that was affected by this action.
     */
    public function getAffectedModel(): ?Model
    {
        if (! $this->model_type || ! $this->model_id) {
            return null;
        }

        return $this->model_type::find($this->model_id);
    }

    /**
     * Scope to filter by action type.
     */
    public function scopeAction(Builder $query, string $action): Builder
    {
        return $query->where('action', $action);
    }

    /**
     * Scope to filter by model type.
     */
    public function scopeModelType(Builder $query, string $modelType): Builder
    {
        return $query->where('model_type', $modelType);
    }

    /**
     * Scope to filter by user.
     */
    public function scopeByUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope to filter by date range.
     */
    public function scopeDateRange(Builder $query, string $from, string $to): Builder
    {
        return $query->whereBetween('created_at', [$from, $to]);
    }

    /**
     * Log a document request creation.
     */
    public static function logDocumentRequestCreated(int $userId, int $requestId, array $data): static
    {
        return static::log(
            action: 'request_created',
            userId: $userId,
            modelType: 'App\Modules\Registrar\Models\DocumentRequest',
            modelId: $requestId,
            newValues: $data
        );
    }

    /**
     * Log a payment confirmation.
     */
    public static function logPaymentConfirmed(int $userId, int $paymentId, array $data): static
    {
        return static::log(
            action: 'payment_confirmed',
            userId: $userId,
            modelType: 'App\Modules\Registrar\Models\Payment',
            modelId: $paymentId,
            newValues: $data
        );
    }

    /**
     * Log a document release.
     */
    public static function logDocumentReleased(int $userId, int $requestId, array $data): static
    {
        return static::log(
            action: 'document_released',
            userId: $userId,
            modelType: 'App\Modules\Registrar\Models\DocumentRequest',
            modelId: $requestId,
            newValues: $data
        );
    }
}
