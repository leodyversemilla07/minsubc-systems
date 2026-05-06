<?php

namespace Modules\Admission\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\Applicant;
use Modules\Admission\Models\Course;
use Modules\Admission\Models\Enrollment;
use Modules\Admission\Models\Section;

class EnrollmentFactory extends Factory
{
    protected $model = Enrollment::class;

    public function definition(): array
    {
        $year = $this->faker->numberBetween(2024, 2026);
        $semesters = ['1st', '2nd', 'Summer'];
        $statuses = ['pending', 'confirmed', 'enrolled', 'dropped', 'cancelled'];
        $status = $this->faker->randomElement($statuses);

        return [
            'applicant_id' => Applicant::factory(),
            'user_id' => null,
            'student_id' => "MSU{$year}-" . $this->faker->numerify('####'),
            'academic_term_id' => AcademicTerm::factory(),
            'section_id' => null,
            'status' => $status,
            'academic_year' => "{$year}-" . ($year + 1),
            'semester' => $this->faker->randomElement($semesters),
            'year_level' => (string) $this->faker->numberBetween(1, 4),
            'enrollment_data' => null,
            'confirmed_at' => in_array($status, ['confirmed', 'enrolled']) ? now() : null,
            'enrolled_at' => $status === 'enrolled' ? now() : null,
            'confirmed_by' => null,
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    public function enrolled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'enrolled',
            'confirmed_at' => now()->subDays(7),
            'enrolled_at' => now()->subDays(5),
        ]);
    }

    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
            'confirmed_at' => now()->subDays(2),
        ]);
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'confirmed_at' => null,
            'enrolled_at' => null,
        ]);
    }

    public function withSection(Section $section): static
    {
        return $this->state(fn (array $attributes) => [
            'section_id' => $section->id,
            'academic_term_id' => $section->academic_term_id,
            'year_level' => (string) $section->year_level,
        ]);
    }

    public function forCourse(Course $course): static
    {
        return $this->state(fn (array $attributes) => [
            'applicant_id' => Applicant::factory()->forCourse($course),
        ]);
    }

    public function forAcademicYear(string $year): static
    {
        return $this->state(fn (array $attributes) => [
            'academic_year' => $year,
        ]);
    }

    public function forSemester(string $semester): static
    {
        return $this->state(fn (array $attributes) => [
            'semester' => $semester,
        ]);
    }
}