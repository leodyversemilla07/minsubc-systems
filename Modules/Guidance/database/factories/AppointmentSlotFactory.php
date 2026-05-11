<?php

namespace Modules\Guidance\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Guidance\Models\AppointmentSlot;
use Modules\Guidance\Models\Counselor;

class AppointmentSlotFactory extends Factory
{
    protected $model = AppointmentSlot::class;

    public function definition(): array
    {
        return [
            'counselor_id' => Counselor::factory(),
            'date' => $this->faker->dateTimeBetween('now', '+2 weeks'),
            'start_time' => $this->faker->randomElement(['08:00', '09:00', '10:00', '13:00', '14:00']),
            'end_time' => $this->faker->randomElement(['09:00', '10:00', '11:00', '14:00', '15:00']),
            'max_students' => 1,
            'booked_count' => 0,
            'type' => 'individual',
            'is_available' => true,
        ];
    }
}