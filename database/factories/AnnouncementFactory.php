<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\USG\Models\Announcement>
 */
class AnnouncementFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \App\Modules\USG\Models\Announcement::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence();

        return [
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'content' => $this->faker->paragraphs(5, true),
            'excerpt' => $this->faker->paragraph(),
            'category' => $this->faker->randomElement(['general', 'academic', 'events', 'urgent']),
            'priority' => $this->faker->randomElement(['low', 'normal', 'high']),
            'status' => 'published',
            'publish_date' => now(),
            'expiry_date' => now()->addMonths(3),
            'author_id' => \App\Models\User::factory(),
            'views_count' => $this->faker->numberBetween(0, 500),
        ];
    }

    /**
     * Indicate that the announcement is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'publish_date' => null,
        ]);
    }

    /**
     * Indicate that the announcement is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'publish_date' => now(),
        ]);
    }

    /**
     * Indicate that the announcement is archived.
     */
    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'archived',
            'expiry_date' => now()->subDays(7),
        ]);
    }
}
