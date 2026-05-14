<?php

namespace Modules\Clinic\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Clinic\Models\PhysicalExam;
use Modules\Clinic\Models\MedicalRecord;

class PhysicalExamFactory extends Factory
{
    protected $model = PhysicalExam::class;

    public function definition(): array
    {
        $height = $this->faker->numberBetween(150, 185);
        $weight = $this->faker->numberBetween(45, 90);
        return [
            'medical_record_id' => MedicalRecord::factory(),
            'exam_date' => $this->faker->date(),
            'height_cm' => $height,
            'weight_kg' => $weight,
            'bmi' => round($weight / (($height / 100) ** 2), 1),
            'blood_pressure' => $this->faker->randomElement(['110/70', '120/80', '130/85']),
            'heart_rate' => $this->faker->numberBetween(60, 100),
            'temperature' => $this->faker->randomFloat(1, 36.0, 37.5),
            'vision_left' => '20/20',
            'vision_right' => '20/20',
            'is_cleared' => $this->faker->boolean(90),
        ];
    }
}