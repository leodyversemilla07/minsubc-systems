<?php

namespace Modules\Alumni\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Alumni\Models\EmploymentRecord;
use Modules\Alumni\Models\Alumnus;

class EmploymentRecordFactory extends Factory
{
    protected $model = EmploymentRecord::class;

    public function definition(): array
    {
        return [
            'alumnus_id' => Alumnus::factory(),
            'company_name' => $this->faker->company(),
            'position' => $this->faker->jobTitle(),
            'industry' => $this->faker->randomElement(['IT', 'Education', 'Finance', 'Healthcare', 'Manufacturing']),
            'employment_type' => $this->faker->randomElement(['full-time', 'part-time', 'contract', 'self-employed']),
            'monthly_income' => $this->faker->randomFloat(2, 15000, 150000),
            'start_date' => $this->faker->date(),
            'is_current' => $this->faker->boolean(40),
            'is_related_to_course' => $this->faker->boolean(60),
        ];
    }
}