<?php

namespace Database\Factories\Modules\Registrar\Models;

use App\Enums\DocumentType;
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
        $documentType = $this->faker->randomElement(DocumentType::cases());
        $quantity = $documentType->isPerPage() ? $this->faker->numberBetween(1, 5) : 1;
        $amount = $documentType->basePrice() * $quantity;

        $purposeOptions = [
            'Scholarship',
            'Provincial scholarship',
            'Municipal scholarship',
            'Educational assistance',
            'Financial assistance',
        ];

        return [
            'request_number' => 'REQ-'.now()->format('Ymd').'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'student_id' => $this->faker->regexify('[A-Z]{3}[0-9]{5}'),
            'document_type' => $documentType->value,
            'quantity' => $quantity,
            'purpose' => $this->faker->randomElement($purposeOptions),
            'amount' => $amount,
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
     * Indicate that the request is ready for claim.
     */
    public function readyForClaim(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'ready_for_claim',
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
