<?php

namespace Database\Factories;

use App\Modules\SAS\Models\Scholarship;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\SAS\Models\Scholarship>
 */
class ScholarshipFactory extends Factory
{
    protected $model = Scholarship::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'scholarship_code' => 'SCH-'.fake()->unique()->numerify('####'),
            'scholarship_name' => fake()->randomElement([
                'Tertiary Education Subsidy (TES)',
                'Tulong Dunong Program (TDP)',
                'CHED Merit Scholarship',
                'Academic Excellence Scholarship',
                'Athletic Scholarship',
                'Cultural Scholarship',
                'Private Donor Scholarship',
            ]),
            'scholarship_type' => fake()->randomElement(['TES', 'TDP', 'CHED Merit', 'Private', 'University', 'Other']),
            'description' => fake()->paragraph(3),
            'provider' => fake()->randomElement(['CHED', 'UNIFAST', 'MinSU', 'Private Donor', 'Local Government']),
            'is_active' => fake()->boolean(80),
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}
