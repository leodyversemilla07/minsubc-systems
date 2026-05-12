<?php namespace Modules\Research\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Research\Models\ResearchType;

class ResearchTypeFactory extends Factory
{
    protected $model = ResearchType::class;
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Thesis', 'Capstone', 'Dissertation', 'Feasibility Study']),
            'code' => strtoupper(fake()->lexify('???')),
            'description' => fake()->sentence(),
            'is_active' => true,
        ];
    }
}