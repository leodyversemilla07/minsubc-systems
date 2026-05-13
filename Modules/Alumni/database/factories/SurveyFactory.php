<?php

namespace Modules\Alumni\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Alumni\Models\Survey;

class SurveyFactory extends Factory
{
    protected $model = Survey::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'survey_type' => $this->faker->randomElement(['graduate_tracer', 'satisfaction', 'feedback']),
            'target_year' => $this->faker->numberBetween(2020, 2026),
            'is_active' => true,
            'starts_at' => now()->subDays(5),
            'ends_at' => now()->addDays(30),
        ];
    }
}