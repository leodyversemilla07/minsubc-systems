<?php

namespace Modules\VotingSystem\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\VotingSystem\Models\Election;

class ElectionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Election::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true).' Election',
            'election_code' => strtoupper(fake()->unique()->lexify('ELECT-????')),
            'status' => false,
            'end_time' => fake()->dateTimeBetween('+1 week', '+1 month'),
        ];
    }

    /**
     * Indicate that the election is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => true,
        ]);
    }

    /**
     * Indicate that the election has ended.
     */
    public function ended(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => false,
            'end_time' => fake()->dateTimeBetween('-1 month', '-1 day'),
        ]);
    }
}
