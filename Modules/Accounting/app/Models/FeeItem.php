<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Accounting\Database\Factories\FeeItemFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FeeItem extends Model
{
    use HasFactory;

    protected $table = 'acc_fee_items';

    protected $fillable = ['fee_category_id', 'name', 'code', 'amount', 'type', 'billing_cycle', 'description', 'is_active'];

    protected static function newFactory(): FeeItemFactory
    {
        return FeeItemFactory::new();
    }

    protected function casts(): array
    {
        return ['amount' => 'decimal:2', 'is_active' => 'boolean'];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(FeeCategory::class, 'fee_category_id');
    }
}