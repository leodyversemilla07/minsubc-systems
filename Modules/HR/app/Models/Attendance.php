<?php

namespace Modules\HR\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\HR\Database\Factories\AttendanceFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasFactory;

    protected static function newFactory(): AttendanceFactory
    {
        return AttendanceFactory::new();
    }

    protected $table = 'hr_attendance';

    protected $fillable = ['employee_id', 'date', 'time_in', 'time_out', 'status', 'remarks'];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'time_in' => 'datetime',
            'time_out' => 'datetime',
        ];
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}