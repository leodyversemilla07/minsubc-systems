<?php

namespace Modules\USG\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\USG\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \Modules\USG\Models\Event::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence();
        $startDate = $this->faker->dateTimeBetween('+1 week', '+3 months');

        return [
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'description' => $this->faker->paragraphs(3, true),
            'location' => $this->faker->randomElement(['Main Hall', 'Conference Room A', 'Online', 'Auditorium']),
            'start_date' => $startDate,
            'end_date' => (clone $startDate)->modify('+2 hours'),
            'all_day' => false,
            'category' => $this->faker->randomElement(['conference', 'workshop', 'meeting', 'seminar']),
            'color' => $this->faker->hexColor(),
            'organizer' => $this->faker->company(),
            'is_recurring' => false,
            'recurrence_rule' => null,
            'status' => 'published',
            'created_by' => \App\Models\User::factory(),
        ];
    }

    /**
     * Indicate that the event is recurring.
     */
    public function recurring(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_recurring' => true,
            'recurrence_rule' => 'FREQ=WEEKLY;BYDAY=MO;COUNT=10',
        ]);
    }

    /**
     * Indicate that the event is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
        ]);
    }

    /**
     * Indicate that the event is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
        ]);
    }

    /**
     * Indicate that the event is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
        ]);
    }

    /**
     * Indicate that the event is upcoming (in the future).
     */
    public function upcoming(): static
    {
        $startDate = $this->faker->dateTimeBetween('+1 week', '+3 months');

        return $this->state(fn (array $attributes) => [
            'start_date' => $startDate,
            'end_date' => (clone $startDate)->modify('+2 hours'),
        ]);
    }

    /**
     * Indicate that the event is in the past.
     */
    public function past(): static
    {
        $startDate = $this->faker->dateTimeBetween('-3 months', '-1 week');

        return $this->state(fn (array $attributes) => [
            'start_date' => $startDate,
            'end_date' => (clone $startDate)->modify('+2 hours'),
        ]);
    }
}
