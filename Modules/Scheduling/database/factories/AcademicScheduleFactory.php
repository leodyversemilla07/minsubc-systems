<?php

namespace Modules\Scheduling\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AcademicScheduleFactory extends Factory
{
    protected $model = AcademicSchedule::class;

    public function definition(): array
    {
        return [
            'academic_year' => '2025-2026',
            'term' => $this->faker->randomElement(['1st Semester', '2nd Semester', 'Summer']),
            'event_name' => $this->faker->randomElement(['Start of Classes', 'Midterm Exam', 'Final Exam', 'Graduation', 'Enrollment Week', 'Semester Break', 'Holiday']),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'is_holiday' => $this->faker->boolean(20),
        ];
    }
}