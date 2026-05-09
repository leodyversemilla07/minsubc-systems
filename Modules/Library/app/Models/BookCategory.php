<?php

namespace Modules\Library\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class BookCategory extends Model
{
    use HasFactory;

    protected $table = 'book_categories';

    protected $fillable = ['name', 'slug', 'description', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    protected static function booted(): void
    {
        static::creating(fn ($category) => $category->slug = $category->slug ?: Str::slug($category->name));
        static::updating(fn ($category) => $category->slug = $category->slug ?: Str::slug($category->name));
    }

    public function books(): HasMany
    {
        return $this->hasMany(Book::class, 'category_id');
    }

    public static function newFactory()
    {
        return \Modules\Library\Database\Factories\BookCategoryFactory::new();
    }
}