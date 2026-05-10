<?php

namespace Modules\HR\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\HR\Models\LeaveType;

class LeaveTypeFactory extends Factory
{
    protected $model = LeaveType::class;

    public function definition(): array
    {
        $leaves = [
            ['name' => 'Sick Leave', 'code' => 'SL'],
            ['name' => 'Vacation Leave', 'code' => 'VL'],
            ['name' => 'Personal Leave', 'code' => 'PL'],
            ['name' => 'Maternity Leave', 'code' => 'ML'],
            ['name' => 'Paternity Leave', 'code' => 'PTL'],
        ];
        $leave = $this->faker->randomElement($leaves);

        return [
            'name' => $leave['name'],
            'code' => $leave['code'],
            'days_per_year' => 15,
            'is_paid' => true,
            'requires_approval' => true,
            'is_active' => true,
        ];
    }
}