<?php

namespace Modules\Library\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Library\Models\Book;
use Modules\Library\Models\BookReservation;

class BookReservationFactory extends Factory
{
    protected $model = BookReservation::class;

    public function definition(): array
    {
        return [
            'book_id' => Book::factory(),
            'user_id' => \App\Models\User::factory(),
            'reserved_at' => now(),
            'expires_at' => now()->addDays(3),
            'status' => 'active',
        ];
    }
}