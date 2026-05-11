<?php

namespace Modules\Guidance\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Guidance\Models\Counselor;

class CounselorFactory extends Factory
{
    protected $model = Counselor::class;

    public function definition(): array
    {
        return [
            'counselor_id' => 'CNL-' . $this->faker->unique()->numerify('#####'),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'specialization' => $this->faker->randomElement(['academic', 'career', 'personal', 'mental_health']),
            'is_available' => true,
            'is_active' => true,
        ];
    }
}