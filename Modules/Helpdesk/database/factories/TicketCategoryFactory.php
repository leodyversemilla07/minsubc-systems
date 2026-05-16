<?php

namespace Modules\Helpdesk\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Helpdesk\Models\TicketCategory;

class TicketCategoryFactory extends Factory
{
    protected $model = TicketCategory::class;
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Hardware', 'Software', 'Network', 'Email', 'Printer', 'Account Access']),
            'description' => fake()->sentence(),
            'color' => fake()->hexColor(),
            'is_active' => true,
        ];
    }
}