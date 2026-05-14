<?php

namespace Modules\Clinic\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Clinic\Models\Consultation;
use Modules\Clinic\Models\MedicalRecord;

class ConsultationFactory extends Factory
{
    protected $model = Consultation::class;

    public function definition(): array
    {
        return [
            'medical_record_id' => MedicalRecord::factory(),
            'complaint' => $this->faker->sentence(),
            'diagnosis' => $this->faker->randomElement(['URTI', 'Headache', 'Fever', 'Cough', 'Sore throat', 'Sinusitis']),
            'treatment' => $this->faker->sentence(6),
            'consultation_date' => $this->faker->dateTimeBetween('-6 months'),
            'status' => 'completed',
        ];
    }
}