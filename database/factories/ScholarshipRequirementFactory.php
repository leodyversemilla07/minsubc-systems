<?php

namespace Database\Factories;

use App\Modules\SAS\Models\ScholarshipRecipient;
use App\Modules\SAS\Models\ScholarshipRequirement;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\SAS\Models\ScholarshipRequirement>
 */
class ScholarshipRequirementFactory extends Factory
{
    protected $model = ScholarshipRequirement::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $requirementNames = [
            'Certificate of Registration',
            'Grade Report',
            'Certificate of Good Moral Character',
            'Recommendation Letter',
            'Essay or Statement of Purpose',
            'Income Certificate',
            'Birth Certificate',
            'Valid ID',
        ];

        $isSubmitted = fake()->boolean(70);

        return [
            'recipient_id' => ScholarshipRecipient::factory(),
            'requirement_name' => fake()->randomElement($requirementNames),
            'is_submitted' => $isSubmitted,
            'submission_date' => $isSubmitted ? fake()->dateTimeBetween('-3 months', 'now') : null,
            'file_path' => $isSubmitted ? 'scholarship_requirements/'.fake()->uuid().'.pdf' : null,
            'deadline' => fake()->dateTimeBetween('now', '+1 month'),
            'remarks' => fake()->optional(0.3)->sentence(),
        ];
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_submitted' => true,
            'submission_date' => now()->subDays(fake()->numberBetween(1, 30)),
        ]);
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_submitted' => false,
            'submission_date' => null,
        ]);
    }
}
