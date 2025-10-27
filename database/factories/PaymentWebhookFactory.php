<?php

namespace Database\Factories;

use App\Models\PaymentWebhook;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentWebhook>
 */
class PaymentWebhookFactory extends Factory
{
    protected $model = PaymentWebhook::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $eventTypes = [
            'payment.paid',
            'payment.failed',
            'payment.refunded',
            'source.chargeable',
            'payment.refund.updated',
        ];

        return [
            'event_id' => 'evt_'.fake()->uuid(),
            'event_type' => fake()->randomElement($eventTypes),
            'payload' => [
                'data' => [
                    'id' => 'pay_'.fake()->uuid(),
                    'attributes' => [
                        'amount' => fake()->numberBetween(10000, 500000),
                        'currency' => 'PHP',
                        'status' => fake()->randomElement(['paid', 'failed', 'pending']),
                        'description' => fake()->sentence(),
                    ],
                ],
            ],
            'processed' => false,
            'processed_at' => null,
            'error_message' => null,
        ];
    }

    /**
     * Indicate that the webhook has been processed.
     */
    public function processed(): static
    {
        return $this->state(fn (array $attributes) => [
            'processed' => true,
            'processed_at' => now()->subMinutes(fake()->numberBetween(1, 1440)),
            'error_message' => null,
        ]);
    }

    /**
     * Indicate that the webhook is unprocessed.
     */
    public function unprocessed(): static
    {
        return $this->state(fn (array $attributes) => [
            'processed' => false,
            'processed_at' => null,
            'error_message' => null,
        ]);
    }

    /**
     * Indicate that the webhook processing failed.
     */
    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'processed' => true,
            'processed_at' => now()->subMinutes(fake()->numberBetween(1, 60)),
            'error_message' => fake()->randomElement([
                'Payment not found',
                'Invalid webhook signature',
                'Database error',
                'Duplicate event',
                'Processing timeout',
            ]),
        ]);
    }

    /**
     * Indicate that the webhook is for a payment.paid event.
     */
    public function paymentPaid(): static
    {
        return $this->state(fn (array $attributes) => [
            'event_type' => 'payment.paid',
            'payload' => [
                'data' => [
                    'id' => 'pay_'.fake()->uuid(),
                    'attributes' => [
                        'amount' => fake()->numberBetween(10000, 500000),
                        'currency' => 'PHP',
                        'status' => 'paid',
                        'description' => 'Document request payment',
                    ],
                ],
            ],
        ]);
    }

    /**
     * Indicate that the webhook is for a payment.failed event.
     */
    public function paymentFailed(): static
    {
        return $this->state(fn (array $attributes) => [
            'event_type' => 'payment.failed',
            'payload' => [
                'data' => [
                    'id' => 'pay_'.fake()->uuid(),
                    'attributes' => [
                        'amount' => fake()->numberBetween(10000, 500000),
                        'currency' => 'PHP',
                        'status' => 'failed',
                        'description' => 'Payment failed',
                    ],
                ],
            ],
        ]);
    }
}
