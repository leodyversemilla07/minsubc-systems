<?php

namespace Modules\SAS\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\SAS\Models\Scholarship;
use Modules\SAS\Models\ScholarshipRecipient;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\SAS\Models\ScholarshipRecipient>
 */
class ScholarshipRecipientFactory extends Factory
{
    protected $model = ScholarshipRecipient::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dateAwarded = fake()->dateTimeBetween('-2 years', 'now');

        return [
            'scholarship_id' => Scholarship::factory(),
            'student_id' => User::factory(),
            'academic_year' => fake()->randomElement(['2023-2024', '2024-2025', '2025-2026']),
            'semester' => fake()->randomElement(['1st', '2nd', 'Summer']),
            'amount' => fake()->randomElement([5000, 10000, 15000, 20000, 25000, 30000]),
            'status' => fake()->randomElement(['Active', 'Suspended', 'Completed', 'Cancelled']),
            'date_awarded' => $dateAwarded,
            'expiration_date' => fake()->dateTimeBetween($dateAwarded, '+2 years'),
            'renewal_status' => fake()->randomElement(['Not Applicable', 'Pending', 'Approved', 'Denied']),
            'remarks' => fake()->optional(0.3)->sentence(),
            'requirements_complete' => fake()->boolean(70),
            'created_by' => User::factory(),
            'updated_by' => User::factory(),
        ];
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Active',
            'requirements_complete' => true,
        ]);
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Active',
            'requirements_complete' => false,
        ]);
    }
}
