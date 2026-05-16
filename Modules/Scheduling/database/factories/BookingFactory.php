<?php

namespace Modules\Scheduling\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    protected $model = Booking::class;

    public function definition(): array
    {
        return [
            'event_id' => CalendarEvent::factory(),
            'user_id' => \App\Models\User::factory(),
            'status' => 'confirmed',
        ];
    }
}