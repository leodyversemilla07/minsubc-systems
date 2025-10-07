<?php

namespace Database\Factories\Modules\Registrar\Models;

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
     * @var class-string<\Illuminate\Database\Eloquent\Model>
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
            'student_id' => 'MBC2025-'.str_pad(fake()->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT),
            'phone' => fake()->phoneNumber(),
            'course' => fake()->randomElement([
                'Bachelor of Science in Computer Science',
                'Bachelor of Science in Information Technology',
                'Bachelor of Science in Business Administration',
                'Bachelor of Science in Accountancy',
                'Bachelor of Science in Nursing',
                'Bachelor of Arts in Communication',
                'Bachelor of Science in Engineering',
                'Bachelor of Science in Education',
            ]),
            'year_level' => fake()->numberBetween(1, 4),
            'campus' => 'Bongabong Campus',
            'status' => fake()->randomElement([
                'active',
                'inactive',
                'graduated',
            ]),
        ];
    }
}
