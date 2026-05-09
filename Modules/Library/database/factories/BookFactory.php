<?php

namespace Modules\Library\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Library\Models\Book;
use Modules\Library\Models\BookCategory;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition(): array
    {
        return [
            'isbn' => fake()->unique()->numerify('978-##########'),
            'title' => fake()->sentence(3),
            'author' => fake()->name(),
            'publisher' => fake()->company(),
            'publication_year' => fake()->numberBetween(1990, 2024),
            'description' => fake()->paragraph(),
            'category_id' => BookCategory::factory(),
            'total_copies' => fake()->numberBetween(1, 10),
            'available_copies' => fn (array $attrs) => $attrs['total_copies'],
            'shelf_location' => 'Shelf ' . fake()->bothify('??-####'),
            'is_active' => true,
        ];
    }
}