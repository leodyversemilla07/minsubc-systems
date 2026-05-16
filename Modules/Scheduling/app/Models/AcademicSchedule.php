<?php

namespace Modules\Scheduling\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicSchedule extends Model
{
    use HasFactory;

    protected $table = 'sch_academic_schedules';

    protected $fillable = [
        'academic_year', 'term', 'event_name',
        'start_date', 'end_date', 'is_holiday',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'is_holiday' => 'boolean',
        ];
    }

    protected static function newFactory(): \Modules\Scheduling\Database\Factories\AcademicScheduleFactory
    {
        return \Modules\Scheduling\Database\Factories\AcademicScheduleFactory::new();
    }
}