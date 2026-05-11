<?php

namespace Modules\Accounting\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ChartAccount extends Model
{
    protected $table = 'acc_chart_accounts';

    protected $fillable = ['account_code', 'name', 'type', 'parent_id', 'balance', 'is_active'];

    protected function casts(): array
    {
        return ['balance' => 'decimal:2', 'is_active' => 'boolean'];
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(ChartAccount::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(ChartAccount::class, 'parent_id');
    }
}