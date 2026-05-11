<?php

namespace Modules\Accounting\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Accounting\Models\AssessmentLine;
use Modules\Accounting\Models\Assessment;
use Modules\Accounting\Models\FeeItem;

class AssessmentLineFactory extends Factory
{
    protected $model = AssessmentLine::class;

    public function definition(): array
    {
        return [
            'assessment_id' => Assessment::factory(),
            'fee_item_id' => FeeItem::factory(),
            'amount' => $this->faker->randomFloat(2, 1000, 50000),
            'paid_amount' => 0,
        ];
    }
}