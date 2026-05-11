<?php

namespace Modules\Curriculum\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Curriculum\Models\Program;

class ProgramFactory extends Factory
{
    protected $model = Program::class;
    public function definition(): array
    {
        return [
            'code' => strtoupper(fake()->lexify('???')) . '-' . fake()->randomNumber(3),
            'name' => fake()->sentence(3),
            'full_name' => fake()->sentence(5),
            'level' => 'undergraduate',
            'college' => fake()->word(),
            'years' => 4,
            'total_units' => fake()->numberBetween(120, 180),
            'description' => fake()->paragraph(),
            'objectives' => fake()->paragraph(),
            'is_active' => true,
        ];
    }
}