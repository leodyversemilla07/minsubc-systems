<?php

namespace Modules\USG\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\USG\Models\TransparencyReport>
 */
class TransparencyReportFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \Modules\USG\Models\TransparencyReport::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence();
        $fileName = $this->faker->word().'.pdf';

        return [
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'description' => $this->faker->paragraph(),
            'type' => $this->faker->randomElement(['financial', 'activity', 'annual', 'quarterly']),
            'status' => 'published',
            'report_period_start' => now()->subMonths(3),
            'report_period_end' => now(),
            'data' => [
                'total_budget' => $this->faker->numberBetween(100000, 500000),
                'total_spent' => $this->faker->numberBetween(50000, 400000),
            ],
            'file_path' => 'transparency_reports/'.$fileName,
            'file_name' => $fileName,
            'file_size' => $this->faker->numberBetween(1024, 10485760), // 1KB to 10MB
            'mime_type' => 'application/pdf',
            'created_by' => \App\Models\User::factory(),
            'published_at' => now(),
            'download_count' => $this->faker->numberBetween(0, 200),
            'view_count' => $this->faker->numberBetween(0, 500),
        ];
    }

    /**
     * Indicate that the report is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }

    /**
     * Indicate that the report is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => now(),
        ]);
    }

    /**
     * Indicate that the report is financial.
     */
    public function financial(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'financial',
            'data' => [
                'total_budget' => $this->faker->numberBetween(100000, 500000),
                'total_spent' => $this->faker->numberBetween(50000, 400000),
                'balance' => $this->faker->numberBetween(10000, 100000),
            ],
        ]);
    }
}
