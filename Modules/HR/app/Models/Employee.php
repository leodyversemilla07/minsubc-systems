<?php

namespace Modules\HR\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\HR\Database\Factories\EmployeeFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    use HasFactory;

    protected static function newFactory(): EmployeeFactory
    {
        return EmployeeFactory::new();
    }

    protected $table = 'hr_employees';

    protected $fillable = [
        'employee_id', 'user_id', 'first_name', 'last_name', 'middle_name',
        'email', 'phone', 'address', 'birth_date', 'gender', 'civil_status',
        'department_id', 'position_id', 'employment_status', 'hire_date',
        'regularization_date', 'resignation_date', 'education_level',
        'specialization', 'profile_photo', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'hire_date' => 'date',
            'regularization_date' => 'date',
            'resignation_date' => 'date',
        ];
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id');
    }

    public function attendance(): HasMany
    {
        return $this->hasMany(Attendance::class, 'employee_id');
    }

    public function leaveRequests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class, 'employee_id');
    }

    public function evaluations(): HasMany
    {
        return $this->hasMany(Evaluation::class, 'employee_id');
    }

    public function getFullNameAttribute(): string
    {
        return trim("{$this->last_name}, {$this->first_name} " . ($this->middle_name ?? ''));
    }
}