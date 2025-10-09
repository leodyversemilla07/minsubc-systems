<?php

namespace Database\Factories;

use App\Modules\Registrar\Models\DocumentRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\Registrar\Models\DocumentRequest>
 */
class DocumentRequestFactory extends Factory
{
    protected $model = DocumentRequest::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'request_number' => 'REQ-'.now()->format('Ymd').'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'student_id' => $this->faker->regexify('[A-Z]{3}[0-9]{5}'),
            'document_type' => $this->faker->randomElement(['coe', 'cog', 'tor', 'honorable_dismissal', 'certificate_good_moral', 'cav', 'diploma', 'so', 'form_137']),
            'processing_type' => $this->faker->randomElement(['regular', 'rush']),
            'quantity' => $this->faker->numberBetween(1, 3),
            'purpose' => $this->faker->sentence(),
            'amount' => $this->faker->randomFloat(2, 50, 200),
            'payment_method' => null,
            'status' => 'pending_payment',
            'payment_deadline' => now()->addHours(48),
        ];
    }

    /**
     * Indicate that the request is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'payment_method' => 'digital',
        ]);
    }

    /**
     * Indicate that the request is ready for pickup.
     */
    public function readyForPickup(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'ready_for_pickup',
        ]);
    }

    /**
     * Indicate that the request is processing.
     */
    public function processing(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'processing',
        ]);
    }
}
