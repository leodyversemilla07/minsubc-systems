<?php

namespace Database\Factories;

use App\Models\User;
use App\Modules\SAS\Models\InsuranceRecord;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\SAS\Models\InsuranceRecord>
 */
class InsuranceRecordFactory extends Factory
{
    protected $model = InsuranceRecord::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $effectiveDate = fake()->dateTimeBetween('-2 years', 'now');
        $expirationDate = fake()->dateTimeBetween($effectiveDate, '+1 year');

        return [
            'student_id' => User::factory(),
            'insurance_provider' => fake()->randomElement([
                'PhilHealth',
                'GSIS',
                'SSS',
                'Maxicare',
                'Medicard',
                'Intellicare',
                'Cocolife',
                'Insular Life',
            ]),
            'policy_number' => fake()->unique()->regexify('[A-Z]{3}-[0-9]{6}'),
            'policy_type' => fake()->randomElement(['Health', 'Accident', 'Travel', 'Life']),
            'coverage_amount' => fake()->randomFloat(2, 100000, 5000000),
            'effective_date' => $effectiveDate,
            'expiration_date' => $expirationDate,
            'status' => fake()->randomElement(['Pending Review', 'Approved', 'Rejected', 'Expired', 'Renewed']),
            'beneficiary_name' => fake()->name(),
            'beneficiary_relationship' => fake()->randomElement(['Spouse', 'Parent', 'Sibling', 'Child']),
            'policy_document_path' => 'insurance_policies/'.fake()->uuid().'.pdf',
            'submission_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'reviewed_by' => User::factory(),
            'reviewed_at' => fake()->optional(0.7)->dateTimeBetween('-6 months', 'now'),
            'review_notes' => fake()->optional(0.3)->sentence(),
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Approved',
            'effective_date' => now()->subMonths(6),
            'expiration_date' => now()->addMonths(6),
        ]);
    }

    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Expired',
            'expiration_date' => now()->subDays(fake()->numberBetween(1, 365)),
        ]);
    }

    public function expiringSoon(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Approved',
            'expiration_date' => now()->addDays(fake()->numberBetween(1, 30)),
        ]);
    }
}
