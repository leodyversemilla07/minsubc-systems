<?php namespace Modules\Research\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Research\Models\Journal;

class JournalFactory extends Factory
{
    protected $model = Journal::class;
    public function definition(): array
    {
        return [
            'name' => fake()->company() . ' Research Journal',
            'issn' => fake()->isbn13(),
            'publisher' => fake()->company(),
            'frequency' => 'semiannual',
            'status' => 'active',
        ];
    }
}