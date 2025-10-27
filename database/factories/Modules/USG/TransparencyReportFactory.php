<?php

namespace Database\Factories\Modules\USG;

use App\Models\User;
use App\Modules\USG\Models\TransparencyReport;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\USG\Models\TransparencyReport>
 */
class TransparencyReportFactory extends Factory
{
    protected $model = TransparencyReport::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->words(4, true).' Report';
        $types = ['financial', 'budget', 'expenses', 'income', 'projects', 'activities', 'quarterly', 'annual'];
        $periodStart = now()->subMonths(fake()->numberBetween(1, 12))->startOfMonth();
        $periodEnd = $periodStart->copy()->addMonths(fake()->numberBetween(1, 3))->endOfMonth();

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.Str::random(6),
            'description' => fake()->paragraph(),
            'type' => fake()->randomElement($types),
            'status' => 'draft',
            'report_period_start' => $periodStart,
            'report_period_end' => $periodEnd,
            'data' => [
                'total_budget' => fake()->numberBetween(100000, 1000000),
                'total_expenses' => fake()->numberBetween(50000, 500000),
                'total_income' => fake()->numberBetween(80000, 800000),
                'projects_completed' => fake()->numberBetween(5, 50),
                'activities_held' => fake()->numberBetween(10, 100),
            ],
            'file_path' => fake()->boolean(80) ? 'transparency-reports/'.fake()->uuid().'.pdf' : null,
            'file_name' => fake()->boolean(80) ? Str::slug($title).'.pdf' : null,
            'file_size' => fake()->numberBetween(500000, 5000000), // 500KB to 5MB
            'mime_type' => 'application/pdf',
            'created_by' => User::factory(),
            'published_at' => null,
            'download_count' => 0,
            'view_count' => 0,
        ];
    }

    /**
     * Indicate that the transparency report is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => now()->subDays(fake()->numberBetween(1, 30)),
            'download_count' => fake()->numberBetween(10, 500),
            'view_count' => fake()->numberBetween(50, 1000),
        ]);
    }

    /**
     * Indicate that the transparency report is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
            'download_count' => 0,
            'view_count' => 0,
        ]);
    }

    /**
     * Indicate that the transparency report is archived.
     */
    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'archived',
            'published_at' => now()->subMonths(fake()->numberBetween(6, 24)),
        ]);
    }

    /**
     * Indicate that the transparency report is a financial report.
     */
    public function financial(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'financial',
            'data' => [
                'total_budget' => fake()->numberBetween(500000, 2000000),
                'total_expenses' => fake()->numberBetween(300000, 1500000),
                'total_income' => fake()->numberBetween(400000, 1800000),
                'surplus_deficit' => fake()->numberBetween(-100000, 500000),
            ],
        ]);
    }

    /**
     * Indicate that the transparency report is a quarterly report.
     */
    public function quarterly(): static
    {
        $year = now()->year;
        $quarter = fake()->numberBetween(1, 4);
        $periodStart = now()->setYear($year)->setMonth(($quarter - 1) * 3 + 1)->startOfMonth();
        $periodEnd = $periodStart->copy()->addMonths(2)->endOfMonth();

        return $this->state(fn (array $attributes) => [
            'type' => 'quarterly',
            'title' => sprintf('Q%d %d Transparency Report', $quarter, $year),
            'report_period_start' => $periodStart,
            'report_period_end' => $periodEnd,
        ]);
    }

    /**
     * Indicate that the transparency report is an annual report.
     */
    public function annual(): static
    {
        $year = fake()->numberBetween(now()->year - 3, now()->year);
        $periodStart = now()->setYear($year)->startOfYear();
        $periodEnd = $periodStart->copy()->endOfYear();

        return $this->state(fn (array $attributes) => [
            'type' => 'annual',
            'title' => sprintf('%d Annual Transparency Report', $year),
            'report_period_start' => $periodStart,
            'report_period_end' => $periodEnd,
        ]);
    }
}
