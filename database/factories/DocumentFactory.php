<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\USG\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \App\Modules\USG\Models\Document::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fileName = $this->faker->word().'.pdf';

        return [
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'file_path' => 'documents/'.$fileName,
            'file_name' => $fileName,
            'file_size' => $this->faker->numberBetween(1024, 5242880), // 1KB to 5MB
            'mime_type' => 'application/pdf',
            'category' => $this->faker->randomElement(['policy', 'report', 'form', 'guideline']),
            'is_public' => true,
            'uploaded_by' => \App\Models\User::factory(),
            'download_count' => $this->faker->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the document is private.
     */
    public function private(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_public' => false,
        ]);
    }

    /**
     * Indicate that the document is public.
     */
    public function public(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_public' => true,
        ]);
    }
}
