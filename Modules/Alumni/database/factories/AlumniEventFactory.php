<?php

namespace Modules\Alumni\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Alumni\Models\AlumniEvent;

class AlumniEventFactory extends Factory
{
    protected $model = AlumniEvent::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4),
            'slug' => $this->faker->unique()->slug(),
            'description' => $this->faker->paragraph(),
            'event_type' => $this->faker->randomElement(['homecoming', 'reunion', 'networking', 'fundraiser', 'webinar', 'sportsfest']),
            'event_date' => $this->faker->dateTimeBetween('now', '+6 months'),
            'location' => $this->faker->randomElement(['Main Campus', 'Off-site Venue', 'Online']),
            'status' => 'upcoming',
            'is_public' => $this->faker->boolean(80),
            'max_participants' => $this->faker->numberBetween(30, 500),
        ];
    }
}