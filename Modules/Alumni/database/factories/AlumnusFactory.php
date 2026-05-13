<?php

namespace Modules\Alumni\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Alumni\Models\Alumnus;

class AlumnusFactory extends Factory
{
    protected $model = Alumnus::class;

    public function definition(): array
    {
        return [
            'student_id' => $this->faker->unique()->numerify('STU-####'),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'graduation_year' => $this->faker->numberBetween(2015, 2026),
            'degree_program' => $this->faker->randomElement(['BSIT', 'BSCS', 'BSBA', 'BSED', 'BSA']),
            'college' => $this->faker->randomElement(['CCS', 'CBA', 'COE', 'CED']),
            'is_employed' => $this->faker->boolean(70),
            'is_verified' => $this->faker->boolean(50),
            'gender' => $this->faker->randomElement(['male', 'female']),
        ];
    }
}