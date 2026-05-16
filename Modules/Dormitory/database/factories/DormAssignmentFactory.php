<?php

namespace Modules\Dormitory\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Dormitory\Models\DormAssignment;

class DormAssignmentFactory extends Factory
{
    protected $model = DormAssignment::class;
    public function definition(): array
    {
        return ['bed_id' => DormBedFactory::new(), 'student_id' => \App\Models\Student::factory(), 'checkin_date' => now()->subMonths(3), 'status' => 'active', 'fee_per_semester' => fake()->randomFloat(2, 5000, 15000)];
    }
}