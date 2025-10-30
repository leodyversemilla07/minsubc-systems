<?php

namespace Database\Factories;

use App\Models\User;
use App\Modules\SAS\Models\DigitalizedDocument;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\SAS\Models\DigitalizedDocument>
 */
class DigitalizedDocumentFactory extends Factory
{
    protected $model = DigitalizedDocument::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = fake()->randomElement([
            'Scholarship',
            'Insurance',
            'Organization',
            'Activity',
            'Administrative',
            'Other',
        ]);

        $documentTypes = [
            'Scholarship' => ['Application Form', 'Renewal Form', 'Compliance Report', 'Grade Report'],
            'Insurance' => ['Policy Document', 'Claim Form', 'Medical Certificate', 'Beneficiary Form'],
            'Organization' => ['Constitution', 'By-Laws', 'Activity Proposal', 'Financial Report', 'Accomplishment Report'],
            'Activity' => ['Event Proposal', 'Budget Plan', 'Attendance Sheet', 'Photos', 'After-Activity Report'],
            'Administrative' => ['Memorandum', 'Policy', 'Guideline', 'Minutes of Meeting'],
            'Other' => ['Certificate', 'Letter', 'Form', 'Report'],
        ];

        $type = fake()->randomElement($documentTypes[$category]);

        return [
            'document_title' => $type.' - '.fake()->words(3, true),
            'document_category' => $category,
            'document_type' => $type,
            'reference_number' => 'DOC-'.fake()->unique()->numerify('####-####'),
            'original_date' => fake()->dateTimeBetween('-5 years', '-1 month'),
            'digitalized_date' => fake()->dateTimeBetween('-6 months', 'now'),
            'file_path' => 'documents/'.strtolower($category).'/'.fake()->uuid().'.pdf',
            'file_name' => fake()->words(3, true).'.pdf',
            'file_size' => fake()->numberBetween(100000, 5000000),
            'mime_type' => 'application/pdf',
            'academic_year' => fake()->randomElement(['2023-2024', '2024-2025', '2025-2026']),
            'related_entity_type' => fake()->boolean(60) ? fake()->randomElement([
                'App\Modules\SAS\Models\Scholarship',
                'App\Modules\SAS\Models\Organization',
                'App\Modules\SAS\Models\SASActivity',
            ]) : null,
            'related_entity_id' => fake()->boolean(60) ? fake()->numberBetween(1, 50) : null,
            'physical_location' => fake()->randomElement([
                'Cabinet A - Shelf 1',
                'Cabinet B - Shelf 2',
                'Storage Room - Box 15',
                'Filing Cabinet 3',
                'Archive Room',
            ]),
            'disposal_status' => fake()->randomElement([
                'Physical Copy Exists',
                'Pending Disposal Approval',
                'Approved for Disposal',
                'Disposed',
            ]),
            'disposal_permit_number' => fake()->boolean(30) ? 'DP-'.fake()->numerify('####') : null,
            'disposal_date' => fake()->boolean(20) ? fake()->dateTimeBetween('-1 year', 'now') : null,
            'is_public' => fake()->boolean(40),
            'uploaded_by' => User::factory(),
        ];
    }

    public function publicDocument(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_public' => true,
        ]);
    }

    public function pendingDisposal(): static
    {
        return $this->state(fn (array $attributes) => [
            'disposal_status' => 'Pending Disposal Approval',
            'disposal_permit_number' => null,
            'disposal_date' => null,
        ]);
    }

    public function disposed(): static
    {
        return $this->state(fn (array $attributes) => [
            'disposal_status' => 'Disposed',
            'disposal_permit_number' => 'DP-'.fake()->numerify('####'),
            'disposal_date' => fake()->dateTimeBetween('-1 year', 'now'),
        ]);
    }
}
