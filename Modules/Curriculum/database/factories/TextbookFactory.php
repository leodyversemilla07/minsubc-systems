<?php

namespace Modules\Curriculum\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Curriculum\Models\Textbook;

class TextbookFactory extends Factory
{
    protected $model = Textbook::class;
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'author' => fake()->name(),
            'isbn' => fake()->isbn13(),
            'publisher' => fake()->company(),
            'year' => fake()->year(),
            'type' => 'textbook',
        ];
    }
}