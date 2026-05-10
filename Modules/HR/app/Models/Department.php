<?php

namespace Modules\HR\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\HR\Database\Factories\DepartmentFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Department extends Model
{
    use HasFactory;

    protected static function newFactory(): DepartmentFactory
    {
        return DepartmentFactory::new();
    }

    protected $table = 'hr_departments';

    protected $fillable = ['code', 'name', 'type', 'description', 'head_id', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function head(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'head_id');
    }

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class, 'department_id');
    }
}