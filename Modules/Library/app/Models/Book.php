<?php

namespace Modules\Library\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $table = 'books';

    protected $fillable = [
        'isbn', 'title', 'author', 'publisher', 'publication_year', 'edition',
        'description', 'category_id', 'total_copies', 'available_copies',
        'shelf_location', 'cover_image', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'publication_year' => 'integer',
            'total_copies' => 'integer',
            'available_copies' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(BookCategory::class, 'category_id');
    }

    public function borrowings(): HasMany
    {
        return $this->hasMany(BookBorrowing::class, 'book_id');
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(BookReservation::class, 'book_id');
    }

    public function isAvailable(): bool
    {
        return $this->is_active && $this->available_copies > 0;
    }

    public static function newFactory()
    {
        return \Modules\Library\Database\Factories\BookFactory::new();
    }
}