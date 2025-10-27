<?php

namespace Database\Factories\Modules\USG;

use App\Models\User;
use App\Modules\USG\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\USG\Models\Event>
 */
class EventFactory extends Factory
{
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(4);
        $categories = ['Academic', 'Sports', 'Cultural', 'Social', 'Competition', 'Workshop', 'Seminar'];
        $colors = ['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo'];
        $startDate = now()->addDays(rand(1, 30));

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.Str::random(6),
            'description' => fake()->paragraphs(3, true),
            'location' => fake()->randomElement([
                'University Auditorium',
                'Main Gymnasium',
                'Covered Court',
                'University Grounds',
                'Student Center',
                'Conference Hall',
            ]),
            'start_date' => $startDate,
            'end_date' => $startDate->copy()->addHours(rand(2, 8)),
            'all_day' => false,
            'category' => fake()->randomElement($categories),
            'color' => fake()->randomElement($colors),
            'organizer' => 'University Student Government',
            'is_recurring' => false,
            'recurrence_rule' => null,
            'status' => 'scheduled',
            'created_by' => User::factory(),
        ];
    }

    /**
     * Indicate that the event is upcoming.
     */
    public function upcoming(): static
    {
        $startDate = now()->addDays(rand(1, 30));

        return $this->state(fn (array $attributes) => [
            'start_date' => $startDate,
            'end_date' => $startDate->copy()->addHours(rand(2, 8)),
            'status' => 'scheduled',
        ]);
    }

    /**
     * Indicate that the event is in the past.
     */
    public function past(): static
    {
        $startDate = now()->subDays(rand(1, 90));

        return $this->state(fn (array $attributes) => [
            'start_date' => $startDate,
            'end_date' => $startDate->copy()->addHours(rand(2, 8)),
            'status' => 'completed',
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
     * Indicate that the event is ongoing.
     */
    public function ongoing(): static
    {
        $startDate = now()->subHours(2);

        return $this->state(fn (array $attributes) => [
            'start_date' => $startDate,
            'end_date' => $startDate->copy()->addHours(6),
            'status' => 'scheduled',
        ]);
    }

    /**
     * Indicate that the event is an all-day event.
     */
    public function allDay(): static
    {
        $startDate = now()->addDays(rand(1, 30))->startOfDay();

        return $this->state(fn (array $attributes) => [
            'start_date' => $startDate,
            'end_date' => $startDate->copy()->endOfDay(),
            'all_day' => true,
        ]);
    }

    /**
     * Indicate that the event is recurring.
     */
    public function recurring(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_recurring' => true,
            'recurrence_rule' => 'FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10',
        ]);
    }
}
