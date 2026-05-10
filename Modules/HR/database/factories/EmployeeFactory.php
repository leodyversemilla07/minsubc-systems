<?php

namespace Modules\HR\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\HR\Models\Employee;
use Modules\HR\Models\Department;
use Modules\HR\Models\Position;

class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            'employee_id' => 'EMP-' . $this->faker->unique()->numerify('#####'),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'hire_date' => $this->faker->dateTimeBetween('-5 years', '-1 month'),
            'employment_status' => 'active',
            'department_id' => Department::factory(),
            'position_id' => Position::factory(),
        ];
    }
}