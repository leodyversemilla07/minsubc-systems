<?php

namespace Modules\Scheduling\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Scheduling\Models\CalendarEvent;

class CalendarEventFactory extends Factory
{
    protected $model = CalendarEvent::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('now', '+2 months');
        $end = (clone $start)->modify('+2 hours');
        return [
            'title' => $this->faker->sentence(4),
            'event_type' => $this->faker->randomElement(['meeting', 'workshop', 'seminar', 'holiday', 'exam', 'orientation', 'celebration']),
            'start_datetime' => $start,
            'end_datetime' => $end,
            'location' => $this->faker->randomElement(['Main Hall', 'Room 101', 'Auditorium', 'Online']),
            'organizer_id' => \App\Models\User::factory(),
            'is_public' => true,
            'status' => 'scheduled',
        ];
    }
}