<?php

namespace Modules\VotingSystem\Database\Seeders;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\VotingSystem\Models\Candidate;
use Modules\VotingSystem\Models\Election;
use Modules\VotingSystem\Models\Feedback;
use Modules\VotingSystem\Models\Partylist;
use Modules\VotingSystem\Models\Position;
use Modules\VotingSystem\Models\Vote;
use Modules\VotingSystem\Models\Voter;

class VotingSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create an active election
        $election = Election::factory()->active()->create([
            'name' => '2025 Student Council Election',
            'election_code' => 'SCE-2025',
            'end_time' => now()->addMonth(),
        ]);

        // Create partylists
        $partylists = [
            'Progressive Alliance',
            'Unity Party',
            'Independent Coalition',
        ];

        $partylistModels = [];
        foreach ($partylists as $partyName) {
            $partylistModels[] = Partylist::create([
                'election_id' => $election->id,
                'name' => $partyName,
            ]);
        }

        // Create positions
        $positions = [
            ['description' => 'President', 'max_vote' => 1, 'priority' => 1],
            ['description' => 'Vice President', 'max_vote' => 1, 'priority' => 2],
            ['description' => 'Secretary', 'max_vote' => 1, 'priority' => 3],
            ['description' => 'Treasurer', 'max_vote' => 1, 'priority' => 4],
            ['description' => 'Auditor', 'max_vote' => 1, 'priority' => 5],
            ['description' => 'P.R.O', 'max_vote' => 1, 'priority' => 6],
            ['description' => 'Board Member', 'max_vote' => 3, 'priority' => 7],
        ];

        $positionModels = [];
        foreach ($positions as $positionData) {
            $positionModels[] = Position::create([
                'election_id' => $election->id,
                ...$positionData,
            ]);
        }

        // Create candidates for each position
        foreach ($positionModels as $position) {
            // Determine number of candidates based on position
            $candidateCount = $position->description === 'Board Member' ? 8 : 3;

            for ($i = 0; $i < $candidateCount; $i++) {
                // Assign to partylist (70% chance) or independent
                $partylist = fake()->boolean(70)
                    ? fake()->randomElement($partylistModels)
                    : null;

                Candidate::create([
                    'election_id' => $election->id,
                    'position_id' => $position->position_id,
                    'firstname' => fake()->firstName(),
                    'lastname' => fake()->lastName(),
                    'photo' => null,
                    'platform' => fake()->paragraph(3),
                    'partylist_id' => $partylist?->partylist_id,
                ]);
            }
        }

        // Create some students and voters
        // Check if students already exist
        $existingStudents = Student::limit(10)->get();

        if ($existingStudents->count() >= 5) {
            // Use existing students
            foreach ($existingStudents->take(5) as $student) {
                Voter::create([
                    'election_id' => $election->id,
                    'voters_id' => $student->student_id,
                    'password' => Hash::make('password'),
                    'generation_batch' => 1,
                    'prefix' => '',
                    'has_voted' => false,
                ]);
            }
        } else {
            // Create new students and voters
            for ($i = 0; $i < 20; $i++) {
                // Create user first
                $user = User::create([
                    'first_name' => fake()->firstName(),
                    'last_name' => fake()->lastName(),
                    'email' => fake()->unique()->safeEmail(),
                    'password' => Hash::make('password'),
                ]);

                // Create student
                $student = Student::create([
                    'student_id' => '2021-'.str_pad($i + 1, 5, '0', STR_PAD_LEFT),
                    'user_id' => $user->id,
                    'phone' => fake()->phoneNumber(),
                    'course' => fake()->randomElement(['BSIT', 'BSCS', 'BSBA', 'BSED', 'BSN']),
                    'year_level' => fake()->numberBetween(1, 4),
                    'campus' => 'Main Campus',
                    'status' => 'active',
                ]);

                // Create voter for this student
                Voter::create([
                    'election_id' => $election->id,
                    'voters_id' => $student->student_id,
                    'password' => Hash::make('password'),
                    'generation_batch' => 1,
                    'prefix' => '',
                    'has_voted' => fake()->boolean(30), // 30% have voted
                ]);
            }
        }

        // Create some votes for voters who have voted
        $votedVoters = Voter::where('election_id', $election->id)
            ->where('has_voted', true)
            ->get();

        foreach ($votedVoters as $voter) {
            // Vote for one candidate per position
            foreach ($positionModels as $position) {
                $candidates = Candidate::where('election_id', $election->id)
                    ->where('position_id', $position->position_id)
                    ->inRandomOrder()
                    ->limit($position->max_vote)
                    ->get();

                foreach ($candidates as $candidate) {
                    Vote::create([
                        'election_id' => $election->id,
                        'voters_id' => $voter->id,
                        'candidate_id' => $candidate->id,
                        'position_id' => $position->position_id,
                        'timestamp' => now(),
                    ]);
                }
            }
        }

        // Create some feedback
        foreach ($votedVoters->take(5) as $voter) {
            Feedback::create([
                'election_id' => $election->id,
                'feedback' => fake()->paragraph(2),
            ]);
        }

        $this->command->info('VotingSystem seeded successfully!');
        $this->command->info("Election: {$election->name}");
        $this->command->info('Total Positions: '.count($positionModels));
        $this->command->info('Total Candidates: '.Candidate::where('election_id', $election->id)->count());
        $this->command->info('Total Voters: '.Voter::where('election_id', $election->id)->count());
        $this->command->info('Total Votes Cast: '.Vote::where('election_id', $election->id)->count());
    }
}
