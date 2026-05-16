<?php

namespace Modules\Discipline\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Discipline\Models\Incident;
use Modules\Discipline\Models\Offense;
use App\Models\User;

class IncidentFactory extends Factory
{
    protected $model = Incident::class;

    public function definition(): array
    {
        return [
            'student_id' => \App\Models\Student::factory(),
            'offense_id' => Offense::factory(),
            'reported_by' => User::factory(),
            'incident_date' => $this->faker->date(),
            'location' => $this->faker->randomElement(['Main Building', 'Science Lab', 'Library', 'Cafeteria', 'Gymnasium']),
            'description' => $this->faker->paragraph(),
            'status' => 'pending',
        ];
    }
}