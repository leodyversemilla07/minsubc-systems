<?php

namespace Modules\Library\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Library\Models\BookCategory;

class BookCategoryFactory extends Factory
{
    protected $model = BookCategory::class;

    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement(['Fiction', 'Non-Fiction', 'Science', 'Mathematics', 'History', 'Philosophy', 'Engineering', 'Medicine', 'Arts', 'Religion']),
            'description' => fake()->sentence(),
            'is_active' => true,
        ];
    }
}