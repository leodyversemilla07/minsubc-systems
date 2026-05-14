<?php

namespace Modules\Clinic\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Clinic\Models\DentalRecord;
use Modules\Clinic\Models\MedicalRecord;

class DentalRecordFactory extends Factory
{
    protected $model = DentalRecord::class;

    public function definition(): array
    {
        return [
            'medical_record_id' => MedicalRecord::factory(),
            'procedure' => $this->faker->randomElement(['Cleaning', 'Filling', 'Extraction', 'Check-up', 'Root Canal']),
            'findings' => $this->faker->sentence(),
            'dentist' => $this->faker->name(),
            'dental_date' => $this->faker->dateTimeBetween('-3 months'),
        ];
    }
}