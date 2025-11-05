<?php

namespace Modules\USG\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\USG\Models\Resolution>
 */
class ResolutionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \Modules\USG\Models\Resolution::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'resolution_number' => 'RES-'.$this->faker->unique()->numberBetween(1000, 9999),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'content' => $this->faker->paragraphs(5, true),
            'category' => $this->faker->randomElement(['policy', 'budget', 'governance', 'academic']),
            'status' => 'published',
            'resolution_date' => now(),
            'submitted_by' => \App\Models\User::factory(),
            'approved_by' => \App\Models\User::factory(),
            'approved_at' => now(),
            'published_at' => now(),
        ];
    }

    /**
     * Indicate that the resolution is archived.
     */
    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'archived',
        ]);
    }

    /**
     * Indicate that the resolution is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'approved_at' => now(),
            'approved_by' => \App\Models\User::factory(),
            'published_at' => now(),
        ]);
    }
}
