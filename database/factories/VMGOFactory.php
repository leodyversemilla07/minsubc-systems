<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\USG\Models\VMGO>
 */
class VMGOFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \App\Modules\USG\Models\VMGO::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vision' => $this->faker->paragraph(),
            'mission' => $this->faker->paragraph(),
            'goals' => [
                $this->faker->sentence(),
                $this->faker->sentence(),
                $this->faker->sentence(),
            ],
            'objectives' => [
                $this->faker->sentence(),
                $this->faker->sentence(),
                $this->faker->sentence(),
            ],
            'effective_date' => now(),
            'updated_by' => \App\Models\User::factory(),
        ];
    }

    /**
     * Indicate that this is the current year's VMGO.
     */
    public function currentYear(): static
    {
        return $this->state(fn (array $attributes) => [
            'effective_date' => now()->startOfYear(),
        ]);
    }
}
