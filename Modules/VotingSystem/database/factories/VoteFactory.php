<?php

namespace Modules\VotingSystem\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\VotingSystem\Models\Candidate;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Position;
use Modules\VotingSystem\Models\Vote;
use Modules\VotingSystem\Models\Voter;

class VoteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Vote::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'election_id' => Election::factory(),
            'voter_id' => Voter::factory(),
            'candidate_id' => Candidate::factory(),
            'position_id' => Position::factory(),
            'timestamp' => now(),
        ];
    }
}
