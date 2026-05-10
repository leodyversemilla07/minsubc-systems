<?php

namespace Modules\HR\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\HR\Database\Factories\LeaveRequestFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaveRequest extends Model
{
    use HasFactory;

    protected static function newFactory(): LeaveRequestFactory
    {
        return LeaveRequestFactory::new();
    }

    protected $table = 'hr_leave_requests';

    protected $fillable = [
        'leave_code', 'employee_id', 'leave_type_id', 'start_date', 'end_date',
        'total_days', 'reason', 'status', 'approved_by', 'approved_at', 'approval_notes',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'approved_at' => 'datetime',
            'total_days' => 'integer',
        ];
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function leaveType(): BelongsTo
    {
        return $this->belongsTo(LeaveType::class, 'leave_type_id');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'approved_by');
    }
}