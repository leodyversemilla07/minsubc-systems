<?php

namespace Modules\Helpdesk\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Helpdesk\Models\TicketComment;
use App\Models\User;

class TicketCommentFactory extends Factory
{
    protected $model = TicketComment::class;
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'body' => fake()->paragraph(),
            'is_internal' => false,
        ];
    }
}