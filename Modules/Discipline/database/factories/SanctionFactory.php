<?php

namespace Modules\Discipline\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Discipline\Models\Sanction;
use Modules\Discipline\Models\Incident;
use App\Models\User;

class SanctionFactory extends Factory
{
    protected $model = Sanction::class;

    public function definition(): array
    {
        return [
            'incident_id' => Incident::factory(),
            'type' => $this->faker->randomElement(['warning', 'community_service', 'probation']),
            'description' => $this->faker->sentence(),
            'start_date' => $this->faker->date(),
            'issued_by' => User::factory(),
            'status' => 'active',
        ];
    }
}