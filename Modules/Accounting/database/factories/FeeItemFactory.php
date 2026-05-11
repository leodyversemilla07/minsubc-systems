<?php

namespace Modules\Accounting\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Accounting\Models\FeeItem;
use Modules\Accounting\Models\FeeCategory;

class FeeItemFactory extends Factory
{
    protected $model = FeeItem::class;

    public function definition(): array
    {
        return [
            'fee_category_id' => FeeCategory::factory(),
            'name' => $this->faker->words(3, true),
            'code' => strtoupper($this->faker->lexify('???-' . $this->faker->numerify('####'))),
            'amount' => $this->faker->randomFloat(2, 100, 50000),
            'type' => $this->faker->randomElement(['tuition', 'laboratory', 'miscellaneous', 'other']),
            'billing_cycle' => $this->faker->randomElement(['per_term', 'per_year', 'one_time']),
            'is_active' => true,
        ];
    }
}