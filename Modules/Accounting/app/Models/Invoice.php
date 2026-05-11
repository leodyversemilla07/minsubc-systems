<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Accounting\Database\Factories\InvoiceFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    use HasFactory;

    protected $table = 'acc_invoices';

    protected $fillable = [
        'invoice_number', 'assessment_id', 'status', 'issued_date',
        'due_date', 'total_amount', 'paid_amount', 'notes',
    ];

    protected static function newFactory(): InvoiceFactory
    {
        return InvoiceFactory::new();
    }

    protected function casts(): array
    {
        return ['issued_date' => 'date', 'due_date' => 'date', 'total_amount' => 'decimal:2', 'paid_amount' => 'decimal:2'];
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class, 'assessment_id');
    }
}