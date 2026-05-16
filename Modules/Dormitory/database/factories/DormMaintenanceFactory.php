<?php

namespace Modules\Dormitory\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Dormitory\Models\DormMaintenanceRequest;

class DormMaintenanceFactory extends Factory
{
    protected $model = DormMaintenanceRequest::class;
    public function definition(): array
    {
        return ['room_id' => DormRoomFactory::new(), 'reported_by' => \App\Models\User::factory(), 'issue_type' => fake()->randomElement(['plumbing', 'electrical', 'furniture', 'cleaning', 'pest_control', 'other']), 'description' => fake()->sentence(), 'priority' => fake()->randomElement(['low', 'medium', 'high']), 'status' => 'pending'];
    }
}