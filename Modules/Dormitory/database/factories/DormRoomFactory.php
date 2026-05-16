<?php

namespace Modules\Dormitory\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Dormitory\Models\DormRoom;

class DormRoomFactory extends Factory
{
    protected $model = DormRoom::class;
    public function definition(): array
    {
        $cap = fake()->randomElement([2, 4, 6]);
        return ['hall_id' => DormHallFactory::new(), 'room_number' => (string) fake()->numberBetween(101, 610), 'floor' => fake()->numberBetween(1, 5), 'room_type' => fake()->randomElement(['standard', 'deluxe', 'suite']), 'capacity' => $cap, 'beds_count' => $cap, 'is_active' => true];
    }
}