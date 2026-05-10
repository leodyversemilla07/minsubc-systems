<?php

namespace Modules\HR\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\HR\Database\Factories\LeaveTypeFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LeaveType extends Model
{
    use HasFactory;

    protected static function newFactory(): LeaveTypeFactory
    {
        return LeaveTypeFactory::new();
    }

    protected $table = 'hr_leave_types';

    protected $fillable = ['name', 'code', 'description', 'days_per_year', 'is_paid', 'requires_approval', 'is_active'];

    protected function casts(): array
    {
        return [
            'days_per_year' => 'integer',
            'is_paid' => 'boolean',
            'requires_approval' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function leaveRequests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class, 'leave_type_id');
    }
}