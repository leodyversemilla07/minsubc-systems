<?php

namespace Modules\Registrar\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Registrar\Models\DocumentRequest;
use Modules\Registrar\Models\Payment;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\Registrar\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Payment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'request_id' => DocumentRequest::factory(),
            'payment_method' => 'cash',
            'payment_reference_number' => $this->faker->unique()->numerify('PRN-20251008-####'),
            'cashier_id' => User::factory(),
            'official_receipt_number' => $this->faker->numerify('OR-########'),
            'amount' => $this->faker->randomFloat(2, 50, 500),
            'status' => 'pending',
            'paid_at' => null,
            'metadata' => null,
        ];
    }

    /**
     * Indicate that the payment is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'paid_at' => now(),
        ]);
    }

    /**
     * Indicate that the payment is for cash.
     */
    public function cash(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_method' => 'cash',
            'cashier_id' => User::factory(),
        ]);
    }
}
