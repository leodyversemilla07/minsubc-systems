<?php

namespace Modules\USG\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\USG\Models\Officer>
 */
class OfficerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \Modules\USG\Models\Officer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'name' => $this->faker->name(),
            'position' => $this->faker->randomElement(['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor']),
            'department' => $this->faker->randomElement(['Executive', 'Finance', 'Operations', 'Communications']),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'bio' => $this->faker->paragraph(),
            'term_start' => now()->subMonths(6),
            'term_end' => now()->addMonths(6),
            'order' => $this->faker->numberBetween(1, 10),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the officer is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the officer is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the officer is in current term.
     */
    public function currentTerm(): static
    {
        return $this->state(fn (array $attributes) => [
            'term_start' => now()->subMonths(3),
            'term_end' => now()->addMonths(9),
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the officer's term has ended.
     */
    public function pastTerm(): static
    {
        return $this->state(fn (array $attributes) => [
            'term_start' => now()->subMonths(15),
            'term_end' => now()->subMonths(3),
            'is_active' => false,
        ]);
    }
}
