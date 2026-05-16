<?php

namespace Modules\Dormitory\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Dormitory\Models\DormHall;

class DormHallFactory extends Factory
{
    protected $model = DormHall::class;
    public function definition(): array
    {
        $name = fake()->randomElement(['Maharlika Hall', 'Lakambini Hall', 'Sampaguita Dorm', 'Ilang-Ilang Hall', 'Rosal Hall']);
        return ['name' => $name, 'code' => substr(strtoupper(str_replace(' ', '', $name)), 0, 4), 'floors' => fake()->numberBetween(2, 6), 'gender' => fake()->randomElement(['male', 'female']), 'is_active' => true];
    }
}