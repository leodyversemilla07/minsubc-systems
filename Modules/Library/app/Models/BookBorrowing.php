<?php

namespace Modules\Library\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BookBorrowing extends Model
{
    use HasFactory;

    protected $table = 'book_borrowings';

    protected $fillable = [
        'book_id', 'user_id', 'borrow_code', 'borrowed_at', 'due_date',
        'returned_at', 'status', 'notes', 'processed_by',
    ];

    protected function casts(): array
    {
        return [
            'borrowed_at' => 'datetime',
            'due_date' => 'date',
            'returned_at' => 'datetime',
        ];
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }

    public function processor(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'processed_by');
    }

    public function fine(): HasOne
    {
        return $this->hasOne(BookFine::class, 'borrowing_id');
    }

    public function isOverdue(): bool
    {
        return $this->status === 'active' && $this->due_date->isPast();
    }

    public static function newFactory()
    {
        return \Modules\Library\Database\Factories\BookBorrowingFactory::new();
    }
}