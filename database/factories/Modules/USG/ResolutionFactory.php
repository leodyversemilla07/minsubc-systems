<?php

namespace Database\Factories\Modules\USG;

use App\Models\User;
use App\Modules\USG\Models\Resolution;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\USG\Models\Resolution>
 */
class ResolutionFactory extends Factory
{
    protected $model = Resolution::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $year = now()->year;
        $number = fake()->numberBetween(1, 999);
        $categories = ['Academic', 'Finance', 'Student Welfare', 'Policy', 'Operations', 'Events', 'Infrastructure'];

        return [
            'resolution_number' => sprintf('RES-%d-%03d', $year, $number),
            'title' => fake()->sentence(6),
            'description' => fake()->paragraph(),
            'content' => fake()->paragraphs(5, true),
            'category' => fake()->randomElement($categories),
            'file_path' => fake()->boolean(70) ? 'resolutions/'.fake()->uuid().'.pdf' : null,
            'status' => 'draft',
            'resolution_date' => null,
            'submitted_by' => User::factory(),
            'approved_by' => null,
            'approved_at' => null,
            'published_at' => null,
        ];
    }

    /**
     * Indicate that the resolution is published.
     */
    public function published(): static
    {
        return $this->state(function (array $attributes) {
            $resolutionDate = now()->subDays(fake()->numberBetween(1, 90));
            $approvedAt = $resolutionDate->copy()->subDays(fake()->numberBetween(1, 7));

            return [
                'status' => 'published',
                'resolution_date' => $resolutionDate,
                'approved_by' => User::factory(),
                'approved_at' => $approvedAt,
                'published_at' => $resolutionDate->copy()->addDays(fake()->numberBetween(0, 3)),
            ];
        });
    }

    /**
     * Indicate that the resolution is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'resolution_date' => null,
            'approved_by' => null,
            'approved_at' => null,
            'published_at' => null,
        ]);
    }

    /**
     * Indicate that the resolution is pending review.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'review',
            'resolution_date' => null,
            'approved_by' => null,
            'approved_at' => null,
            'published_at' => null,
        ]);
    }

    /**
     * Indicate that the resolution is rejected.
     */
    public function rejected(): static
    {
        return $this->state(function (array $attributes) {
            $reviewedAt = now()->subDays(fake()->numberBetween(1, 30));

            return [
                'status' => 'rejected',
                'resolution_date' => null,
                'approved_by' => User::factory(),
                'approved_at' => $reviewedAt,
                'published_at' => null,
            ];
        });
    }

    /**
     * Indicate that the resolution is archived.
     */
    public function archived(): static
    {
        return $this->state(function (array $attributes) {
            $resolutionDate = now()->subDays(fake()->numberBetween(180, 365));

            return [
                'status' => 'archived',
                'resolution_date' => $resolutionDate,
                'approved_by' => User::factory(),
                'approved_at' => $resolutionDate->copy()->subDays(fake()->numberBetween(1, 7)),
                'published_at' => $resolutionDate->copy()->addDays(fake()->numberBetween(0, 3)),
            ];
        });
    }
}
