<?php

namespace Database\Factories;

use App\Models\User;
use App\Modules\USG\Models\FOIRequest;
use App\Modules\USG\Models\FOIResponse;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FOIResponse>
 */
class FOIResponseFactory extends Factory
{
    protected $model = FOIResponse::class;

    public function definition(): array
    {
        return [
            'foi_request_id' => FOIRequest::factory(),
            'response_text' => fake()->paragraphs(2, true),
            'responder_id' => User::factory(),
        ];
    }

    public function withDocument(): static
    {
        return $this->state(fn (array $attributes) => [
            'document_path' => 'foi_responses/'.fake()->uuid().'.pdf',
        ]);
    }
}
