<?php

namespace Database\Factories;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AuditLog>
 */
class AuditLogFactory extends Factory
{
    protected $model = AuditLog::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $actions = [
            'created',
            'updated',
            'deleted',
            'viewed',
            'exported',
            'imported',
            'approved',
            'rejected',
            'published',
            'archived',
        ];

        $modelTypes = [
            'App\Models\User',
            'App\Models\SystemSetting',
            'Modules\Registrar\Models\DocumentRequest',
            'Modules\Registrar\Models\Payment',
            'Modules\USG\Models\Announcement',
            'Modules\USG\Models\Event',
        ];

        return [
            'user_id' => User::factory(),
            'action' => fake()->randomElement($actions),
            'model_type' => fake()->randomElement($modelTypes),
            'model_id' => fake()->numberBetween(1, 1000),
            'old_values' => fake()->boolean(50) ? [
                'name' => fake()->word(),
                'status' => fake()->randomElement(['active', 'inactive', 'pending']),
            ] : null,
            'new_values' => [
                'name' => fake()->word(),
                'status' => fake()->randomElement(['active', 'inactive', 'approved', 'completed']),
            ],
            'ip_address' => fake()->ipv4(),
            'user_agent' => fake()->userAgent(),
            'description' => fake()->boolean(70) ? fake()->sentence() : null,
            'metadata' => fake()->boolean(40) ? [
                'source' => fake()->randomElement(['web', 'api', 'mobile']),
                'duration' => fake()->numberBetween(100, 5000),
            ] : null,
        ];
    }

    /**
     * Indicate that the audit log is for a create action.
     */
    public function created(): static
    {
        return $this->state(fn (array $attributes) => [
            'action' => 'created',
            'old_values' => null,
            'new_values' => [
                'status' => 'active',
                'created_at' => now()->toDateTimeString(),
            ],
        ]);
    }

    /**
     * Indicate that the audit log is for an update action.
     */
    public function updated(): static
    {
        return $this->state(fn (array $attributes) => [
            'action' => 'updated',
            'old_values' => [
                'status' => 'pending',
                'updated_at' => now()->subHours(2)->toDateTimeString(),
            ],
            'new_values' => [
                'status' => 'approved',
                'updated_at' => now()->toDateTimeString(),
            ],
        ]);
    }

    /**
     * Indicate that the audit log is for a delete action.
     */
    public function deleted(): static
    {
        return $this->state(fn (array $attributes) => [
            'action' => 'deleted',
            'old_values' => [
                'status' => 'active',
                'deleted_at' => null,
            ],
            'new_values' => [
                'status' => 'deleted',
                'deleted_at' => now()->toDateTimeString(),
            ],
        ]);
    }

    /**
     * Indicate that the audit log is for a specific model type.
     */
    public function forModel(string $modelType): static
    {
        return $this->state(fn (array $attributes) => [
            'model_type' => $modelType,
        ]);
    }
}
