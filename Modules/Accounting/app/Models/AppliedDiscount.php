<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AppliedDiscount extends Model
{
    protected $table = 'acc_applied_discounts';

    protected $fillable = ['assessment_id', 'discount_id', 'amount', 'reason', 'approved_by'];

    protected function casts(): array
    {
        return ['amount' => 'decimal:2'];
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class, 'assessment_id');
    }

    public function discount(): BelongsTo
    {
        return $this->belongsTo(Discount::class, 'discount_id');
    }
}