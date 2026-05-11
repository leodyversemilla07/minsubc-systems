<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Accounting\Database\Factories\PaymentFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'acc_payments';

    protected $fillable = [
        'payment_code', 'assessment_id', 'user_id', 'amount',
        'payment_method', 'reference_number', 'payment_date', 'notes', 'status',
    ];

    protected static function newFactory(): PaymentFactory
    {
        return PaymentFactory::new();
    }

    protected function casts(): array
    {
        return ['amount' => 'decimal:2', 'payment_date' => 'date'];
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class, 'assessment_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }

    public function allocations(): HasMany
    {
        return $this->hasMany(PaymentAllocation::class, 'payment_id');
    }
}