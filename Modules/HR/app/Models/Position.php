<?php

namespace Modules\HR\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Position extends Model
{
    protected $table = 'hr_positions';

    protected $fillable = ['title', 'category', 'employment_type', 'description', 'salary_grade_min', 'salary_grade_max', 'is_active'];

    protected function casts(): array
    {
        return [
            'salary_grade_min' => 'decimal:2',
            'salary_grade_max' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class, 'position_id');
    }
}