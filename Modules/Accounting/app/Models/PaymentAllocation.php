<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentAllocation extends Model
{
    protected $table = 'acc_payment_allocations';

    protected $fillable = ['payment_id', 'assessment_line_id', 'amount'];

    protected function casts(): array
    {
        return ['amount' => 'decimal:2'];
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class, 'payment_id');
    }

    public function assessmentLine(): BelongsTo
    {
        return $this->belongsTo(AssessmentLine::class, 'assessment_line_id');
    }
}