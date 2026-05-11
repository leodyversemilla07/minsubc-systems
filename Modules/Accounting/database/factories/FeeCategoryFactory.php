<?php

namespace Modules\Accounting\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Accounting\Models\FeeCategory;

class FeeCategoryFactory extends Factory
{
    protected $model = FeeCategory::class;

    public function definition(): array
    {
        $categories = [
            ['name' => 'Tuition Fee', 'code' => 'TUITION'],
            ['name' => 'Laboratory Fee', 'code' => 'LAB'],
            ['name' => 'Miscellaneous', 'code' => 'MISC'],
            ['name' => 'Other Fees', 'code' => 'OTHER'],
        ];
        $cat = $this->faker->randomElement($categories);
        return [
            'name' => $cat['name'] . ' ' . $this->faker->year(),
            'code' => $cat['code'] . '-' . $this->faker->randomNumber(3),
            'description' => $this->faker->sentence(),
            'is_required' => true,
            'is_active' => true,
        ];
    }
}