<?php

namespace Modules\Guidance\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Guidance\Models\CounselingSession;
use Modules\Guidance\Models\Counselor;
use App\Models\Student;

class CounselingSessionFactory extends Factory
{
    protected $model = CounselingSession::class;

    public function definition(): array
    {
        $student = Student::factory()->create();
        $counselor = Counselor::factory()->create();

        return [
            'session_code' => 'SES-' . now()->format('Ymd') . '-' . $this->faker->unique()->numerify('####'),
            'student_id' => $student->id,
            'counselor_id' => $counselor->id,
            'type' => 'individual',
            'session_type' => 'initial',
            'concern' => $this->faker->paragraph(),
            'mood' => $this->faker->randomElement(['happy', 'anxious', 'sad', 'neutral']),
            'risk_level' => 'low',
            'status' => 'completed',
        ];
    }
}