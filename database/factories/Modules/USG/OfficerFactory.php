<?php

namespace Database\Factories\Modules\USG;

use App\Models\User;
use App\Modules\USG\Models\Officer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\USG\Models\Officer>
 */
class OfficerFactory extends Factory
{
    protected $model = Officer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $positions = [
            'President',
            'Vice President',
            'Secretary',
            'Treasurer',
            'Auditor',
            'Public Relations Officer',
            'Sports Coordinator',
            'Cultural Affairs Officer',
            'Academic Affairs Officer',
            'Business Manager',
        ];

        $departments = [
            'Executive Board',
            'Legislative Council',
            'Finance Committee',
            'Academic Affairs',
            'Student Affairs',
            'External Affairs',
            'Internal Affairs',
        ];

        $termStart = now()->startOfYear();

        return [
            'user_id' => fake()->boolean(70) ? User::factory() : null,
            'name' => fake()->name(),
            'position' => fake()->randomElement($positions),
            'department' => fake()->randomElement($departments),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->boolean(60) ? fake()->phoneNumber() : null,
            'photo' => fake()->boolean(50) ? 'officers/'.fake()->uuid().'.jpg' : null,
            'bio' => fake()->boolean(70) ? fake()->paragraphs(2, true) : null,
            'term_start' => $termStart,
            'term_end' => $termStart->copy()->addYear(),
            'order' => fake()->numberBetween(1, 20),
            'is_active' => true,
        ];
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
     * Indicate that the officer is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the officer is in current term.
     */
    public function currentTerm(): static
    {
        $termStart = now()->subMonths(fake()->numberBetween(1, 6));

        return $this->state(fn (array $attributes) => [
            'term_start' => $termStart,
            'term_end' => $termStart->copy()->addYear(),
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the officer is in a past term.
     */
    public function pastTerm(): static
    {
        $termStart = now()->subYears(fake()->numberBetween(1, 3))->startOfYear();

        return $this->state(fn (array $attributes) => [
            'term_start' => $termStart,
            'term_end' => $termStart->copy()->addYear(),
            'is_active' => false,
        ]);
    }

    /**
     * Indicate that the officer is a president.
     */
    public function president(): static
    {
        return $this->state(fn (array $attributes) => [
            'position' => 'President',
            'department' => 'Executive Board',
            'order' => 1,
        ]);
    }
}
