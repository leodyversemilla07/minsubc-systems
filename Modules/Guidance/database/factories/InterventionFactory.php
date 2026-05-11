<?php

namespace Modules\Guidance\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Guidance\Models\Intervention;

class InterventionFactory extends Factory
{
    protected $model = Intervention::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->words(4, true),
            'description' => $this->faker->paragraph(),
            'type' => $this->faker->randomElement(['workshop', 'seminar', 'group_therapy', 'peer_support']),
            'start_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'end_date' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
            'location' => $this->faker->randomElement(['Guidance Office', 'Audio Visual Room', 'Online']),
            'max_participants' => $this->faker->numberBetween(10, 50),
            'status' => 'planned',
        ];
    }
}