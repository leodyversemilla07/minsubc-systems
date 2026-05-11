<?php

namespace Modules\Guidance\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Guidance\Models\Referral;
use Modules\Guidance\Models\Counselor;
use App\Models\Student;

class ReferralFactory extends Factory
{
    protected $model = Referral::class;

    public function definition(): array
    {
        return [
            'referral_code' => 'REF-' . $this->faker->unique()->numerify('########'),
            'student_id' => Student::factory(),
            'referred_by' => Counselor::factory(),
            'reason' => $this->faker->sentence(),
            'urgency' => 'normal',
            'status' => 'pending',
        ];
    }
}