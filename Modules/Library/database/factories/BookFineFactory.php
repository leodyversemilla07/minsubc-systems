<?php

namespace Modules\Library\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Library\Models\BookBorrowing;
use Modules\Library\Models\BookFine;

class BookFineFactory extends Factory
{
    protected $model = BookFine::class;

    public function definition(): array
    {
        return [
            'borrowing_id' => BookBorrowing::factory(),
            'amount' => fake()->randomFloat(2, 10, 500),
            'paid_amount' => 0,
            'reason' => fake()->randomElement(['overdue', 'lost', 'damaged']),
            'status' => 'unpaid',
        ];
    }
}