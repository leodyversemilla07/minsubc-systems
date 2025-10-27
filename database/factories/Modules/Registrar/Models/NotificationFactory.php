<?php

namespace Database\Factories\Modules\Registrar\Models;

use App\Modules\Registrar\Models\DocumentRequest;
use App\Modules\Registrar\Models\Notification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\Registrar\Models\Notification>
 */
class NotificationFactory extends Factory
{
    protected $model = Notification::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['email', 'sms', 'both'];
        $statuses = ['pending', 'sent', 'failed'];

        return [
            'request_id' => DocumentRequest::factory(),
            'student_id' => fake()->unique()->numerify('MBC2024-####'),
            'type' => fake()->randomElement($types),
            'message' => fake()->sentence(15),
            'status' => 'pending',
            'sent_at' => null,
            'error_message' => null,
        ];
    }

    /**
     * Indicate that the notification has been sent.
     */
    public function sent(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'sent',
            'sent_at' => now()->subMinutes(fake()->numberBetween(1, 1440)),
            'error_message' => null,
        ]);
    }

    /**
     * Indicate that the notification is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'sent_at' => null,
            'error_message' => null,
        ]);
    }

    /**
     * Indicate that the notification failed.
     */
    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'failed',
            'sent_at' => null,
            'error_message' => fake()->randomElement([
                'Invalid phone number',
                'Email delivery failed',
                'Service temporarily unavailable',
                'Recipient not found',
                'Invalid email address',
            ]),
        ]);
    }

    /**
     * Indicate that the notification is SMS only.
     */
    public function sms(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'sms',
        ]);
    }

    /**
     * Indicate that the notification is email only.
     */
    public function email(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'email',
        ]);
    }

    /**
     * Indicate that the notification is both SMS and email.
     */
    public function both(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'both',
        ]);
    }
}
