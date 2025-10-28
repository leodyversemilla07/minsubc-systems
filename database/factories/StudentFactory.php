<?php

namespace Database\Factories;

use App\Models\User;
use App\Modules\Registrar\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\Registrar\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => $this->faker->unique()->numerify('####-####'),
            'user_id' => User::factory(),
            'phone' => $this->faker->phoneNumber(),
            'course' => $this->faker->randomElement([
                'Bachelor of Science in Information Technology',
                'Bachelor of Science in Computer Science',
                'Bachelor of Science in Business Administration',
                'Bachelor of Science in Accountancy',
                'Bachelor of Arts in Communication',
                'Bachelor of Elementary Education',
                'Bachelor of Secondary Education',
            ]),
            'year_level' => $this->faker->numberBetween(1, 4),
            'campus' => $this->faker->randomElement(['Main Campus', 'North Campus', 'South Campus']),
            'status' => 'active',
        ];
    }

    /**
     * Indicate that the student is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }

    /**
     * Indicate that the student is a first year.
     */
    public function firstYear(): static
    {
        return $this->state(fn (array $attributes) => [
            'year_level' => 1,
        ]);
    }

    /**
     * Indicate that the student is a senior.
     */
    public function senior(): static
    {
        return $this->state(fn (array $attributes) => [
            'year_level' => 4,
        ]);
    }
}
