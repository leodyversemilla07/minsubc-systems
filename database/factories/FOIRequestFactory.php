<?php

namespace Database\Factories;

use App\Enums\FOIPriority;
use App\Enums\FOIRequestStatus;
use App\Enums\FOIRequestType;
use App\Models\User;
use App\Modules\USG\Models\FOIRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FOIRequest>
 */
class FOIRequestFactory extends Factory
{
    protected $model = FOIRequest::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(),
            'description' => fake()->paragraphs(3, true),
            'request_type' => fake()->randomElement(FOIRequestType::values()),
            'status' => FOIRequestStatus::Pending->value,
            'priority' => fake()->randomElement(FOIPriority::values()),
            'submitted_at' => now(),
        ];
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => FOIRequestStatus::Pending->value,
            'submitted_at' => now(),
        ]);
    }

    public function underReview(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => FOIRequestStatus::UnderReview->value,
            'submitted_at' => now()->subDays(2),
            'reviewed_at' => now()->subDay(),
            'reviewer_id' => User::factory(),
        ]);
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => FOIRequestStatus::Completed->value,
            'submitted_at' => now()->subDays(5),
            'reviewed_at' => now()->subDays(3),
            'completed_at' => now(),
            'reviewer_id' => User::factory(),
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => FOIRequestStatus::Rejected->value,
            'submitted_at' => now()->subDays(3),
            'reviewed_at' => now()->subDay(),
            'rejected_at' => now(),
            'reviewer_id' => User::factory(),
            'rejection_reason' => fake()->sentence(),
        ]);
    }

    public function highPriority(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => FOIPriority::High->value,
        ]);
    }

    public function lowPriority(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => FOIPriority::Low->value,
        ]);
    }
}
