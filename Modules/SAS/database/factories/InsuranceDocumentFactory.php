<?php

namespace Modules\SAS\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\SAS\Models\InsuranceDocument;
use Modules\SAS\Models\InsuranceRecord;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\SAS\Models\InsuranceDocument>
 */
class InsuranceDocumentFactory extends Factory
{
    protected $model = InsuranceDocument::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'insurance_id' => InsuranceRecord::factory(),
            'document_name' => fake()->randomElement([
                'Policy Document',
                'Coverage Certificate',
                'Beneficiary Form',
                'Claims Form',
                'Premium Receipt',
                'Medical Certificate',
            ]),
            'file_path' => 'insurance_documents/'.fake()->uuid().'.pdf',
            'file_size' => fake()->numberBetween(50000, 5000000),
            'uploaded_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
