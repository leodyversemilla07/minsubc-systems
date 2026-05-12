<?php namespace Modules\Research\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Research\Models\Proposal;

class ProposalFactory extends Factory
{
    protected $model = Proposal::class;
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(8),
            'research_type_id' => ResearchTypeFactory::new()->create()->id,
            'student_id' => \App\Models\Student::factory()->create()->student_id,
            'proposal_code' => 'RES-' . strtoupper(fake()->bothify('??###')),
            'abstract' => fake()->paragraph(),
            'keywords' => implode(', ', fake()->words(5)),
            'status' => 'draft',
        ];
    }
}