<?php

namespace Modules\USG\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\USG\Models\Event;
use Modules\USG\Models\EventRegistration;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\USG\Models\EventRegistration>
 */
class EventRegistrationFactory extends Factory
{
    protected $model = EventRegistration::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_id' => Event::factory(),
            'user_id' => User::factory(),
            'status' => 'registered',
            'notes' => fake()->optional()->sentence(),
            'registered_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the registration has been cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
            'cancelled_at' => fake()->dateTimeBetween($attributes['registered_at'], 'now'),
        ]);
    }

    /**
     * Indicate that the user attended the event.
     */
    public function attended(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'attended',
        ]);
    }
}
