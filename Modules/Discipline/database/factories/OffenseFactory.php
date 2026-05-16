<?php

namespace Modules\Discipline\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Discipline\Models\Offense;
use Modules\Discipline\Models\OffenseCategory;

class OffenseFactory extends Factory
{
    protected $model = Offense::class;

    public function definition(): array
    {
        return [
            'category_id' => OffenseCategory::factory(),
            'name' => $this->faker->randomElement(['Tardiness', 'Cutting Classes', 'Cheating', 'Bullying', 'Vandalism', 'Fighting', 'Theft', 'Disrespect', 'Smoking', 'Cyber Offense']),
            'code' => $this->faker->unique()->regexify('OFF-\d{3}'),
            'penalty_guideline' => $this->faker->sentence(),
        ];
    }
}