<?php

namespace Modules\Admission\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Admission\Models\Course;
use Modules\Admission\Models\Subject;

class SubjectFactory extends Factory
{
    protected $model = Subject::class;

    public function definition(): array
    {
        $types = ['lec', 'lab', 'both'];
        $type = $this->faker->randomElement($types);

        return [
            'course_id' => Course::factory(),
            'code' => strtoupper($this->faker->lexify('???')) . ' ' . $this->faker->numberBetween(100, 499),
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->optional()->paragraph(),
            'units' => $this->faker->numberBetween(1, 6),
            'semester' => $this->faker->randomElement(['1st', '2nd', 'Summer', 'All']),
            'year_level' => $this->faker->numberBetween(1, 5),
            'type' => $type,
            'lab_hours' => $type === 'lab' || $type === 'both' ? $this->faker->numberBetween(1, 6) : 0,
            'lec_hours' => $type === 'lec' || $type === 'both' ? $this->faker->numberBetween(1, 6) : 0,
            'is_active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    public function forYearLevel(int $year): static
    {
        return $this->state(fn (array $attributes) => [
            'year_level' => $year,
        ]);
    }

    public function forSemester(string $semester): static
    {
        return $this->state(fn (array $attributes) => [
            'semester' => $semester,
        ]);
    }
}