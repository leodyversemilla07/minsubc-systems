<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentLine extends Model
{
    protected $table = 'acc_assessment_lines';

    protected $fillable = ['assessment_id', 'fee_item_id', 'amount', 'paid_amount', 'notes'];

    protected function casts(): array
    {
        return ['amount' => 'decimal:2', 'paid_amount' => 'decimal:2'];
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class, 'assessment_id');
    }

    public function feeItem(): BelongsTo
    {
        return $this->belongsTo(FeeItem::class, 'fee_item_id');
    }
}