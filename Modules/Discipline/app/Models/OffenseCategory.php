<?php

namespace Modules\Discipline\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OffenseCategory extends Model
{
    use HasFactory;

    protected $table = 'dsc_offense_categories';

    protected $fillable = ['name', 'tier', 'description', 'color'];

    public function offenses(): HasMany
    {
        return $this->hasMany(Offense::class, 'category_id');
    }

    protected static function newFactory(): \Modules\Discipline\Database\Factories\OffenseCategoryFactory
    {
        return \Modules\Discipline\Database\Factories\OffenseCategoryFactory::new();
    }
}