<?php

namespace Database\Factories\Modules\USG;

use App\Models\User;
use App\Modules\USG\Models\VMGO;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\USG\Models\VMGO>
 */
class VMGOFactory extends Factory
{
    protected $model = VMGO::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vision' => fake()->sentence(15),
            'mission' => fake()->paragraph(3),
            'goals' => [
                fake()->sentence(10),
                fake()->sentence(12),
                fake()->sentence(11),
                fake()->sentence(13),
            ],
            'objectives' => [
                fake()->sentence(15),
                fake()->sentence(14),
                fake()->sentence(16),
                fake()->sentence(13),
                fake()->sentence(17),
            ],
            'effective_date' => now()->startOfYear(),
            'updated_by' => User::factory(),
        ];
    }

    /**
     * Indicate that the VMGO is for the current year.
     */
    public function currentYear(): static
    {
        return $this->state(fn (array $attributes) => [
            'effective_date' => now()->startOfYear(),
        ]);
    }

    /**
     * Indicate that the VMGO is for a past year.
     */
    public function pastYear(): static
    {
        return $this->state(fn (array $attributes) => [
            'effective_date' => now()->subYears(fake()->numberBetween(1, 5))->startOfYear(),
        ]);
    }
}
