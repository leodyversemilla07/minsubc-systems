<?php

namespace Database\Factories\Modules\USG;

use App\Models\User;
use App\Modules\USG\Models\Announcement;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\USG\Models\Announcement>
 */
class AnnouncementFactory extends Factory
{
    protected $model = Announcement::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(6);
        $categories = ['Assembly', 'Event', 'Meeting', 'Election', 'Project', 'Announcement', 'Advisory'];
        $priorities = ['low', 'normal', 'high'];

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.Str::random(6),
            'content' => fake()->paragraphs(5, true),
            'excerpt' => fake()->sentence(20),
            'category' => fake()->randomElement($categories),
            'priority' => fake()->randomElement($priorities),
            'featured_image' => null,
            'status' => 'draft',
            'publish_date' => null,
            'expiry_date' => null,
            'author_id' => User::factory(),
            'views_count' => 0,
        ];
    }

    /**
     * Indicate that the announcement is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'publish_date' => now()->subDays(rand(1, 30)),
            'expiry_date' => now()->addDays(rand(30, 90)),
            'views_count' => rand(10, 500),
        ]);
    }

    /**
     * Indicate that the announcement is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'publish_date' => null,
            'expiry_date' => null,
        ]);
    }

    /**
     * Indicate that the announcement is archived.
     */
    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'archived',
            'publish_date' => now()->subDays(rand(60, 180)),
            'expiry_date' => now()->subDays(rand(1, 30)),
        ]);
    }

    /**
     * Indicate that the announcement is featured (high priority).
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'high',
            'featured_image' => '/images/announcements/featured-'.rand(1, 10).'.jpg',
        ]);
    }

    /**
     * Indicate that the announcement is scheduled for future publishing.
     */
    public function scheduled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'publish_date' => now()->addDays(rand(1, 14)),
            'expiry_date' => now()->addDays(rand(30, 90)),
        ]);
    }
}
