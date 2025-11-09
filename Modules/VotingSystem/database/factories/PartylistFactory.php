<?php

namespace Modules\VotingSystem\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Partylist;

class PartylistFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Partylist::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $partyNames = [
            'Progressive Alliance',
            'Unity Party',
            'Independent Coalition',
            'Student Action Front',
            'Leaders of Tomorrow',
            'Voice of Change',
            'Democratic Student Union',
        ];

        return [
            'election_id' => Election::factory(),
            'name' => fake()->randomElement($partyNames),
        ];
    }
}
