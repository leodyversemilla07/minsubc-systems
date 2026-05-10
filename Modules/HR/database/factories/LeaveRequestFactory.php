<?php

namespace Modules\HR\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\HR\Models\LeaveRequest;
use Modules\HR\Models\Employee;
use Modules\HR\Models\LeaveType;

class LeaveRequestFactory extends Factory
{
    protected $model = LeaveRequest::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('now', '+2 months');
        $end = (clone $start)->modify('+' . $this->faker->numberBetween(1, 5) . ' days');

        return [
            'leave_code' => 'LV-' . now()->format('Y') . '-' . $this->faker->unique()->numerify('#####'),
            'employee_id' => Employee::factory(),
            'leave_type_id' => LeaveType::factory(),
            'start_date' => $start,
            'end_date' => $end,
            'total_days' => $start->diff($end)->days + 1,
            'reason' => $this->faker->sentence(),
            'status' => 'pending',
        ];
    }
}