<?php

namespace Modules\VotingSystem\Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Voter;

class VoterFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Voter::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'election_id' => Election::factory(),
            'school_id' => Student::factory()->create()->student_id,
            'password' => Hash::make('password'),
            'generation_batch' => fake()->numberBetween(1, 5),
            'prefix' => fake()->randomElement(['', 'BSIT', 'BSCS', 'BSBA', 'BSED']),
            'has_voted' => false,
        ];
    }

    /**
     * Indicate that the voter has already voted.
     */
    public function voted(): static
    {
        return $this->state(fn (array $attributes) => [
            'has_voted' => true,
        ]);
    }

    /**
     * Indicate that the voter has not voted yet.
     */
    public function notVoted(): static
    {
        return $this->state(fn (array $attributes) => [
            'has_voted' => false,
        ]);
    }
}
