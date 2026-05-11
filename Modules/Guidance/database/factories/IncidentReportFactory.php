<?php

namespace Modules\Guidance\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Guidance\Models\IncidentReport;
use App\Models\Student;

class IncidentReportFactory extends Factory
{
    protected $model = IncidentReport::class;

    public function definition(): array
    {
        return [
            'incident_code' => 'INC-' . $this->faker->unique()->numerify('########'),
            'student_id' => Student::factory(),
            'type' => $this->faker->randomElement(['behavioral', 'academic', 'disciplinary', 'concern']),
            'incident_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'description' => $this->faker->paragraph(),
            'severity' => $this->faker->randomElement(['minor', 'moderate', 'serious']),
            'status' => 'open',
        ];
    }
}