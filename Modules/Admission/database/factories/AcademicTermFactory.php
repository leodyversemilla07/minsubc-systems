<?php

namespace Modules\Admission\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Admission\Models\AcademicTerm;

class AcademicTermFactory extends Factory
{
    protected $model = AcademicTerm::class;

    public function definition(): array
    {
        $year = $this->faker->numberBetween(2024, 2026);
        $semesters = ['1st', '2nd', 'Summer'];
        $semester = $this->faker->randomElement($semesters);

        return [
            'academic_year' => "{$year}-" . ($year + 1),
            'semester' => $semester,
            'enrollment_start' => $this->faker->dateTimeBetween($year . '-01-01', $year . '-03-01'),
            'enrollment_end' => $this->faker->dateTimeBetween($year . '-03-01', $year . '-06-01'),
            'classes_start' => $this->faker->dateTimeBetween($year . '-03-01', $year . '-06-01'),
            'classes_end' => $this->faker->dateTimeBetween($year . '-06-01', $year . '-12-31'),
            'status' => $this->faker->randomElement(['upcoming', 'enrollment', 'ongoing', 'ended']),
            'is_active' => false,
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
            'status' => 'ongoing',
        ]);
    }

    public function enrollment(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'enrollment',
            'enrollment_start' => now()->subDays(7),
            'enrollment_end' => now()->addDays(30),
        ]);
    }
}