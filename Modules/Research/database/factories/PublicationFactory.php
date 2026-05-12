<?php namespace Modules\Research\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Research\Models\Publication;

class PublicationFactory extends Factory
{
    protected $model = Publication::class;
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(8),
            'abstract' => fake()->paragraph(),
            'journal_name' => fake()->company() . ' Journal',
            'status' => 'submitted',
        ];
    }
}