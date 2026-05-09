<?php

namespace Modules\Library\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Library\Models\Book;
use Modules\Library\Models\BookBorrowing;

class BookBorrowingFactory extends Factory
{
    protected $model = BookBorrowing::class;

    public function definition(): array
    {
        $borrowedAt = fake()->dateTimeBetween('-30 days', 'now');
        $dueDate = (clone $borrowedAt)->modify('+7 days');

        return [
            'book_id' => Book::factory(),
            'user_id' => \App\Models\User::factory(),
            'borrow_code' => 'LIB-' . strtoupper(fake()->bothify('####??')),
            'borrowed_at' => $borrowedAt,
            'due_date' => $dueDate,
            'status' => fake()->randomElement(['active', 'returned', 'overdue']),
        ];
    }

    public function active(): static
    {
        return $this->state(fn () => ['status' => 'active', 'returned_at' => null]);
    }

    public function returned(): static
    {
        return $this->state(fn (array $attrs) => [
            'status' => 'returned',
            'returned_at' => fake()->dateTimeBetween($attrs['due_date'] ?? '-5 days', 'now'),
        ]);
    }
}