<?php

namespace Modules\Dormitory\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Dormitory\Models\DormBed;

class DormBedFactory extends Factory
{
    protected $model = DormBed::class;
    public function definition(): array
    {
        return ['room_id' => DormRoomFactory::new(), 'bed_label' => strtoupper(fake()->randomLetter()), 'position' => fake()->randomElement(['upper', 'lower', 'single']), 'is_occupied' => false];
    }
}