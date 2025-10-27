<?php

namespace App\Modules\Registrar\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'payment_method',
        'paymongo_checkout_id',
        'paymongo_payment_intent_id',
        'paymongo_payment_method',
        'payment_reference_number',
        'cashier_id',
        'official_receipt_number',
        'amount',
        'status',
        'paid_at',
        'receipt_url',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'float',
            'paid_at' => 'datetime',
            'metadata' => 'array',
            'cashier_id' => 'integer',
        ];
    }

    /**
     * Get the document request that this payment belongs to.
     */
    public function documentRequest(): BelongsTo
    {
        return $this->belongsTo(DocumentRequest::class, 'request_id');
    }

    /**
     * Get the cashier who processed this cash payment.
     */
    public function cashier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'cashier_id');
    }

    /**
     * Check if this is a digital payment.
     */
    public function isDigitalPayment(): bool
    {
        return $this->payment_method === 'digital';
    }

    /**
     * Check if this is a cash payment.
     */
    public function isCashPayment(): bool
    {
        return $this->payment_method === 'cash';
    }

    /**
     * Check if the payment is successful.
     */
    public function isPaid(): bool
    {
        return $this->status === 'paid';
    }

    /**
     * Check if the payment is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if the payment failed.
     */
    public function isFailed(): bool
    {
        return $this->status === 'failed';
    }
}
