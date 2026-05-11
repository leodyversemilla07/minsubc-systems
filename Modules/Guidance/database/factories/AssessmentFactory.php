<?php

namespace Modules\Guidance\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Guidance\Models\Assessment;
use App\Models\Student;

class AssessmentFactory extends Factory
{
    protected $model = Assessment::class;

    public function definition(): array
    {
        return [
            'assessment_code' => 'ASMT-' . now()->format('Ymd') . '-' . $this->faker->unique()->numerify('####'),
            'student_id' => Student::factory(),
            'type' => 'intake',
            'status' => 'pending',
        ];
    }
}