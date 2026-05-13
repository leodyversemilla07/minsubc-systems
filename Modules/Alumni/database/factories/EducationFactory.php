<?php

namespace Modules\Alumni\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Alumni\Models\Education;

class EducationFactory extends Factory
{
    protected $model = Education::class;

    public function definition(): array
    {
        return [
            'degree' => $this->faker->randomElement(['Master of IT', 'MBA', 'Doctorate in Education', 'Master in Public Admin']),
            'institution' => $this->faker->company(),
            'year_graduated' => $this->faker->numberBetween(2016, 2026),
            'is_higher_education' => $this->faker->boolean(70),
        ];
    }
}