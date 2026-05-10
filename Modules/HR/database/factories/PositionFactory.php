<?php

namespace Modules\HR\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\HR\Models\Position;

class PositionFactory extends Factory
{
    protected $model = Position::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->jobTitle(),
            'category' => $this->faker->randomElement(['faculty', 'staff', 'executive']),
            'employment_type' => $this->faker->randomElement(['full-time', 'part-time', 'contractual']),
            'description' => $this->faker->sentence(),
            'is_active' => true,
        ];
    }
}