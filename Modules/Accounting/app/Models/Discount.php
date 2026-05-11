<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Accounting\Database\Factories\DiscountFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $table = 'acc_discounts';

    protected $fillable = ['name', 'code', 'type', 'value', 'description', 'is_active'];

    protected static function newFactory(): DiscountFactory
    {
        return DiscountFactory::new();
    }

    protected function casts(): array
    {
        return ['value' => 'decimal:2', 'is_active' => 'boolean'];
    }
}