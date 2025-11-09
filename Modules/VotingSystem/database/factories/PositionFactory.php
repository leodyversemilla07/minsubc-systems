<?php

namespace Modules\VotingSystem\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Position;

class PositionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Position::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $positions = [
            ['description' => 'President', 'max_vote' => 1, 'priority' => 1],
            ['description' => 'Vice President', 'max_vote' => 1, 'priority' => 2],
            ['description' => 'Secretary', 'max_vote' => 1, 'priority' => 3],
            ['description' => 'Treasurer', 'max_vote' => 1, 'priority' => 4],
            ['description' => 'Auditor', 'max_vote' => 1, 'priority' => 5],
            ['description' => 'P.R.O', 'max_vote' => 1, 'priority' => 6],
            ['description' => 'Board Member', 'max_vote' => 3, 'priority' => 7],
        ];

        $position = fake()->randomElement($positions);

        return [
            'election_id' => Election::factory(),
            'description' => $position['description'],
            'max_vote' => $position['max_vote'],
            'priority' => $position['priority'],
        ];
    }
}
