<?php

namespace Modules\Clinic\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Clinic\Models\Immunization;
use Modules\Clinic\Models\MedicalRecord;

class ImmunizationFactory extends Factory
{
    protected $model = Immunization::class;

    public function definition(): array
    {
        return [
            'medical_record_id' => MedicalRecord::factory(),
            'vaccine_name' => $this->faker->randomElement(['Hepatitis B', 'BCG', 'DPT', 'Polio', 'Measles', 'MMR', 'HPV', 'COVID-19']),
            'dose_number' => $this->faker->numberBetween(1, 3),
            'date_administered' => $this->faker->date(),
            'next_due_date' => $this->faker->dateTimeBetween('+1 month', '+1 year'),
        ];
    }
}