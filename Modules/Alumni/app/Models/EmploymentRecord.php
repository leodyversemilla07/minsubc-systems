<?php

namespace Modules\Alumni\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Alumni\Database\Factories\EmploymentRecordFactory;

class EmploymentRecord extends Model
{
    use HasFactory;

    protected $table = 'alm_employment_records';

    protected $fillable = [
        'alumnus_id', 'company_name', 'position', 'industry',
        'employment_type', 'monthly_income',
        'start_date', 'end_date', 'is_current',
        'address', 'city',
        'is_related_to_course',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'is_current' => 'boolean',
            'is_related_to_course' => 'boolean',
            'monthly_income' => 'decimal:2',
        ];
    }

    public function alumnus(): BelongsTo
    {
        return $this->belongsTo(Alumnus::class);
    }

    protected static function newFactory(): EmploymentRecordFactory
    {
        return EmploymentRecordFactory::new();
    }
}