<?php

namespace Modules\HR\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\HR\Models\Evaluation;
use Modules\HR\Models\Employee;

class EvaluationFactory extends Factory
{
    protected $model = Evaluation::class;

    public function definition(): array
    {
        $employee = Employee::factory()->create();

        return [
            'employee_id' => $employee->id,
            'evaluator_id' => $employee->id,
            'type' => $this->faker->randomElement(['periodic', 'performance', 'peer', 'self']),
            'period' => 'Q' . $this->faker->numberBetween(1, 4) . ' ' . now()->format('Y'),
            'rating' => $this->faker->numberBetween(1, 5),
            'comments' => $this->faker->paragraph(),
            'status' => 'completed',
            'submitted_at' => now(),
        ];
    }
}