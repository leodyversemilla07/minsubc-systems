<?php

namespace Modules\VotingSystem\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\VotingSystem\Models\Candidate;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Partylist;
use Modules\VotingSystem\Models\Position;

class CandidateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Candidate::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'election_id' => Election::factory(),
            'position_id' => Position::factory(),
            'firstname' => fake()->firstName(),
            'lastname' => fake()->lastName(),
            'photo' => null,
            'platform' => fake()->paragraph(3),
            'partylist_id' => fake()->boolean(70) ? Partylist::factory() : null,
        ];
    }

    /**
     * Indicate that the candidate has no partylist (independent).
     */
    public function independent(): static
    {
        return $this->state(fn (array $attributes) => [
            'partylist_id' => null,
        ]);
    }

    /**
     * Indicate that the candidate has a photo.
     */
    public function withPhoto(): static
    {
        return $this->state(fn (array $attributes) => [
            'photo' => 'candidates/'.fake()->uuid().'.jpg',
        ]);
    }
}
