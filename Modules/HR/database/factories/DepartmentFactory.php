<?php

namespace Modules\HR\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\HR\Models\Department;

class DepartmentFactory extends Factory
{
    protected $model = Department::class;

    public function definition(): array
    {
        return [
            'code' => strtoupper($this->faker->lexify('???')),
            'name' => $this->faker->company(),
            'type' => $this->faker->randomElement(['academic', 'administrative', 'office']),
            'description' => $this->faker->sentence(),
            'is_active' => true,
        ];
    }
}