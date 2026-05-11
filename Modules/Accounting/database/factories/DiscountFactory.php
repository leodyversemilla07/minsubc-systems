<?php

namespace Modules\Accounting\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Accounting\Models\Discount;

class DiscountFactory extends Factory
{
    protected $model = Discount::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true) . ' Discount',
            'code' => strtoupper($this->faker->lexify('DISC-' . $this->faker->numerify('##'))),
            'type' => $this->faker->randomElement(['percentage', 'fixed']),
            'value' => $this->faker->randomFloat(2, 5, 50),
            'description' => $this->faker->sentence(),
            'is_active' => true,
        ];
    }
}