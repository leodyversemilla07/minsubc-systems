<?php

namespace Modules\Discipline\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Offense extends Model
{
    use HasFactory;

    protected $table = 'dsc_offenses';

    protected $fillable = ['category_id', 'name', 'code', 'description', 'penalty_guideline'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(OffenseCategory::class, 'category_id');
    }

    public function incidents(): HasMany
    {
        return $this->hasMany(Incident::class);
    }

    protected static function newFactory(): \Modules\Discipline\Database\Factories\OffenseFactory
    {
        return \Modules\Discipline\Database\Factories\OffenseFactory::new();
    }
}