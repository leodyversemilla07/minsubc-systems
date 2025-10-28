<?php

namespace Database\Factories;

use App\Models\User;
use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\Registrar\Models\Payment>
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
        $paymentMethod = $this->faker->randomElement(['cash', 'digital']);

        return [
            'request_id' => DocumentRequest::factory(),
            'payment_method' => $paymentMethod,
            'paymongo_checkout_id' => $paymentMethod === 'digital' ? $this->faker->uuid() : null,
            'paymongo_payment_intent_id' => $paymentMethod === 'digital' ? $this->faker->uuid() : null,
            'paymongo_payment_method' => $paymentMethod === 'digital' ? $this->faker->randomElement(['card', 'gcash', 'paymaya']) : null,
            'payment_reference_number' => $this->faker->unique()->numerify('PAY-########'),
            'cashier_id' => $paymentMethod === 'cash' ? User::factory() : null,
            'official_receipt_number' => $this->faker->numerify('OR-########'),
            'amount' => $this->faker->randomFloat(2, 50, 500),
            'status' => 'pending',
            'paid_at' => null,
            'receipt_url' => null,
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
            'paymongo_checkout_id' => null,
            'paymongo_payment_intent_id' => null,
            'paymongo_payment_method' => null,
            'cashier_id' => User::factory(),
        ]);
    }

    /**
     * Indicate that the payment is digital.
     */
    public function digital(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_method' => 'digital',
            'paymongo_checkout_id' => $this->faker->uuid(),
            'paymongo_payment_intent_id' => $this->faker->uuid(),
            'paymongo_payment_method' => $this->faker->randomElement(['card', 'gcash', 'paymaya']),
            'cashier_id' => null,
        ]);
    }
}
