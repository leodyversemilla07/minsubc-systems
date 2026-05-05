<?php

namespace Modules\Admission\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Admission\Models\Course;

class CourseFactory extends Factory
{
    protected $model = Course::class;

    public function definition(): array
    {
        return [
            'code' => fake()->unique()->bothify('??##'),
            'name' => fake()->sentence(3),
            'is_active' => true,
        ];
    }
}