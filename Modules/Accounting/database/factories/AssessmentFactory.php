<?php

namespace Modules\Accounting\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Accounting\Models\Assessment;
use App\Models\Student;

class AssessmentFactory extends Factory
{
    protected $model = Assessment::class;

    public function definition(): array
    {
        return [
            'assessment_code' => 'ASM-' . now()->format('Y') . '-' . $this->faker->unique()->numerify('######'),
            'assessable_type' => Student::class,
            'assessable_id' => Student::factory(),
            'total_amount' => $this->faker->randomFloat(2, 5000, 100000),
            'paid_amount' => 0,
            'status' => 'pending',
            'due_date' => $this->faker->dateTimeBetween('now', '+3 months'),
        ];
    }
}