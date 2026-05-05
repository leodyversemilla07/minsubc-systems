<?php

namespace Modules\Admission\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Admission\Models\AdmissionProgram;

class AdmissionProgramFactory extends Factory
{
    protected $model = AdmissionProgram::class;

    public function definition(): array
    {
        return [
            'course_id' => \Modules\Admission\Models\Course::factory(),
            'academic_year' => '2025-2026',
            'semester' => fake()->randomElement(['1st', '2nd']),
            'name' => fake()->sentence(3),
            'slots' => fake()->numberBetween(20, 100),
            'slots_filled' => 0,
            'application_start' => now()->subMonth(),
            'application_end' => now()->addMonth(),
            'status' => 'open',
        ];
    }
}