<?php

namespace Modules\Accounting\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Accounting\Models\Payment;
use Modules\Accounting\Models\Assessment;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {
        return [
            'payment_code' => 'PAY-' . now()->format('Ymd') . '-' . $this->faker->unique()->numerify('#####'),
            'assessment_id' => Assessment::factory(),
            'user_id' => \App\Models\User::factory(),
            'amount' => $this->faker->randomFloat(2, 100, 50000),
            'payment_method' => $this->faker->randomElement(['cash', 'check', 'bank_transfer', 'gcash', 'paymaya']),
            'payment_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'status' => 'completed',
        ];
    }
}