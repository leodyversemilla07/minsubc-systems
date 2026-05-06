<?php

namespace Modules\Admission\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Admission\Models\AcademicTerm;
use Modules\Admission\Models\Course;
use Modules\Admission\Models\Section;

class SectionFactory extends Factory
{
    protected $model = Section::class;

    public function definition(): array
    {
        $yearLevel = $this->faker->numberBetween(1, 4);
        $courseCode = $this->faker->lexify('???');
        $sectionLetter = chr(65 + $this->faker->numberBetween(0, 5)); // A-F

        return [
            'academic_term_id' => AcademicTerm::factory(),
            'course_id' => Course::factory(),
            'name' => "{$courseCode}-{$yearLevel}{$sectionLetter}",
            'year_level' => $yearLevel,
            'max_students' => $this->faker->numberBetween(20, 50),
            'current_students' => 0,
            'adviser_id' => null,
            'status' => 'open',
            'room' => $this->faker->optional()->regexify('[A-Z]{1,3}-[0-9]{2}'),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    public function full(): static
    {
        return $this->state(fn (array $attributes) => [
            'current_students' => $attributes['max_students'],
            'status' => 'full',
        ]);
    }

    public function closed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'closed',
        ]);
    }

    public function forTerm(AcademicTerm $term): static
    {
        return $this->state(fn (array $attributes) => [
            'academic_term_id' => $term->id,
        ]);
    }

    public function forYearLevel(int $year): static
    {
        return $this->state(fn (array $attributes) => [
            'year_level' => $year,
            'name' => preg_replace('/-\d+/', "-{$year}", $attributes['name'] ?? 'BSIT-1A'),
        ]);
    }
}