<?php

namespace Modules\Accounting\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Accounting\Models\Invoice;
use Modules\Accounting\Models\Assessment;

class InvoiceFactory extends Factory
{
    protected $model = Invoice::class;

    public function definition(): array
    {
        $assessment = Assessment::factory()->create();

        return [
            'invoice_number' => 'INV-ASM-' . $this->faker->unique()->numerify('######'),
            'assessment_id' => $assessment->id,
            'status' => 'sent',
            'issued_date' => now(),
            'due_date' => $this->faker->dateTimeBetween('now', '+2 months'),
            'total_amount' => $assessment->total_amount,
            'paid_amount' => 0,
        ];
    }
}