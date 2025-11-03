<?php

namespace Modules\SAS\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\SAS\Models\Organization;
use Modules\SAS\Models\OrganizationDocument;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\SAS\Models\OrganizationDocument>
 */
class OrganizationDocumentFactory extends Factory
{
    protected $model = OrganizationDocument::class;

    public $timestamps = false;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organization_id' => Organization::factory(),
            'document_type' => fake()->randomElement([
                'Constitution and By-Laws',
                'Activity Proposal',
                'Accomplishment Report',
                'Financial Report',
                'Letter of Request',
                'Memorandum',
                'Minutes of Meeting',
                'Certificate',
            ]),
            'document_name' => fake()->words(4, true).'.pdf',
            'file_path' => 'organization_documents/'.fake()->uuid().'.pdf',
            'file_size' => fake()->numberBetween(100000, 10000000),
            'academic_year' => fake()->randomElement(['2023-2024', '2024-2025', '2025-2026']),
            'uploaded_by' => User::factory(),
            'uploaded_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    protected static function newFactory(): OrganizationDocumentFactory
    {
        return OrganizationDocumentFactory::new();
    }
}
