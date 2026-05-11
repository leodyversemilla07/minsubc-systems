<?php

namespace Modules\Guidance\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Guidance\Models\Appointment;
use Modules\Guidance\Models\AppointmentSlot;
use Modules\Guidance\Models\Counselor;
use App\Models\Student;

class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    public function definition(): array
    {
        $counselor = Counselor::factory()->create();
        $slot = AppointmentSlot::factory()->create(['counselor_id' => $counselor->id]);

        return [
            'appointment_code' => 'APT-' . now()->format('Ymd') . '-' . $this->faker->unique()->numerify('####'),
            'slot_id' => $slot->id,
            'student_id' => Student::factory(),
            'counselor_id' => $counselor->id,
            'reason' => $this->faker->sentence(),
            'status' => 'scheduled',
        ];
    }
}