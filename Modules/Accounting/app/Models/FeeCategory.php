<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Accounting\Database\Factories\FeeCategoryFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FeeCategory extends Model
{
    use HasFactory;

    protected $table = 'acc_fee_categories';

    protected $fillable = ['name', 'code', 'description', 'is_required', 'is_active'];

    protected static function newFactory(): FeeCategoryFactory
    {
        return FeeCategoryFactory::new();
    }

    protected function casts(): array
    {
        return ['is_required' => 'boolean', 'is_active' => 'boolean'];
    }

    public function feeItems(): HasMany
    {
        return $this->hasMany(FeeItem::class, 'fee_category_id');
    }
}