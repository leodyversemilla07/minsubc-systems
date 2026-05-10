<?php

namespace Modules\HR\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\HR\Models\Attendance;
use Modules\HR\Models\Employee;

class AttendanceFactory extends Factory
{
    protected $model = Attendance::class;

    public function definition(): array
    {
        return [
            'employee_id' => Employee::factory(),
            'date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'time_in' => $this->faker->dateTimeBetween('07:30', '08:30'),
            'time_out' => $this->faker->dateTimeBetween('16:00', '18:00'),
            'status' => $this->faker->randomElement(['present', 'late', 'absent', 'leave']),
        ];
    }
}