<?php

namespace Modules\Curriculum\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Curriculum\Models\Curriculum;

class CurriculumFactory extends Factory
{
    protected $model = Curriculum::class;
    public function definition(): array
    {
        return [
            'program_id' => \Modules\Curriculum\Models\Program::factory(),
            'version_name' => fake()->year() . ' Curriculum',
            'academic_year' => fake()->year() . '-' . (fake()->year() + 1),
            'status' => 'draft',
        ];
    }
}