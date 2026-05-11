<?php

namespace Modules\Curriculum\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Curriculum\Models\Course;

class CourseFactory extends Factory
{
    protected $model = Course::class;
    public function definition(): array
    {
        return [
            'code' => strtoupper(fake()->lexify('???')) . ' ' . fake()->randomNumber(3),
            'name' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'units' => fake()->randomFloat(1, 1, 5),
            'lecture_hours' => fake()->randomFloat(1, 1, 5),
            'lab_hours' => fake()->randomFloat(1, 0, 3),
            'category' => fake()->randomElement(['major', 'general_education', 'elective']),
            'is_lab' => false,
            'is_active' => true,
        ];
    }
}