<?php

namespace Modules\Discipline\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Discipline\Models\OffenseCategory;

class OffenseCategoryFactory extends Factory
{
    protected $model = OffenseCategory::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Minor Offenses', 'Major Offenses', 'Grave Offenses']),
            'tier' => $this->faker->randomElement(['minor', 'major', 'grave']),
            'color' => $this->faker->randomElement(['#22c55e', '#eab308', '#ef4444']),
        ];
    }
}