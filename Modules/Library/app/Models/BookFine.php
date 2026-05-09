<?php

namespace Modules\Library\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookFine extends Model
{
    use HasFactory;

    protected $table = 'book_fines';

    protected $fillable = [
        'borrowing_id', 'amount', 'paid_amount', 'reason', 'status', 'paid_at', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'paid_amount' => 'decimal:2',
            'paid_at' => 'datetime',
        ];
    }

    public function borrowing(): BelongsTo
    {
        return $this->belongsTo(BookBorrowing::class, 'borrowing_id');
    }

    public function getRemainingAmountAttribute(): float
    {
        return max(0, $this->amount - $this->paid_amount);
    }

    public static function newFactory()
    {
        return \Modules\Library\Database\Factories\BookFineFactory::new();
    }
}