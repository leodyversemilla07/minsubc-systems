<?php

namespace Modules\Facilities\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Facilities\Models\Reservation;
use Modules\Facilities\Models\Facility;
use App\Models\User;

class ReservationFactory extends Factory
{
    protected $model = Reservation::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('now', '+1 month');
        $end = (clone $start)->modify('+2 hours');
        return [
            'facility_id' => Facility::factory(),
            'user_id' => User::factory(),
            'purpose' => $this->faker->sentence(),
            'start_time' => $start,
            'end_time' => $end,
            'status' => 'pending',
            'attendees_count' => $this->faker->numberBetween(5, 100),
        ];
    }
}