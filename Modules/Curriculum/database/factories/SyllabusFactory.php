<?php

namespace Modules\Curriculum\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Curriculum\Models\Syllabus;

class SyllabusFactory extends Factory
{
    protected $model = Syllabus::class;
    public function definition(): array
    {
        return [
            'course_id' => \Modules\Curriculum\Models\Course::factory(),
            'version' => '1.0',
            'academic_year' => fake()->year() . '-' . (fake()->year() + 1),
            'semester' => fake()->randomElement(['1st', '2nd', 'Summer']),
            'course_description' => fake()->paragraph(),
            'status' => 'draft',
        ];
    }
}