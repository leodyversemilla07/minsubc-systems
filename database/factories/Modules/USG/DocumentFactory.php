<?php

namespace Database\Factories\Modules\USG;

use App\Models\User;
use App\Modules\USG\Models\Document;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\USG\Models\Document>
 */
class DocumentFactory extends Factory
{
    protected $model = Document::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Constitution',
            'By-Laws',
            'Financial Report',
            'Minutes',
            'Proposal',
            'Resolution',
            'Policy',
            'Form',
            'Guide',
            'Other',
        ];

        $mimeTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/plain',
        ];

        $extensions = [
            'application/pdf' => 'pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xlsx',
            'application/vnd.ms-excel' => 'xls',
            'text/plain' => 'txt',
        ];

        $mimeType = fake()->randomElement($mimeTypes);
        $extension = $extensions[$mimeType];
        $fileName = fake()->words(3, true).'.'.$extension;

        return [
            'title' => fake()->sentence(4),
            'description' => fake()->boolean(70) ? fake()->paragraph() : null,
            'file_path' => 'documents/'.fake()->uuid().'.'.$extension,
            'file_name' => $fileName,
            'file_size' => fake()->numberBetween(100000, 5000000), // 100KB to 5MB
            'mime_type' => $mimeType,
            'category' => fake()->randomElement($categories),
            'is_public' => true,
            'uploaded_by' => User::factory(),
            'download_count' => fake()->numberBetween(0, 500),
        ];
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

    /**
     * Indicate that the document is private.
     */
    public function private(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_public' => false,
            'download_count' => fake()->numberBetween(0, 50),
        ]);
    }

    /**
     * Indicate that the document is a PDF.
     */
    public function pdf(): static
    {
        $fileName = fake()->words(3, true).'.pdf';

        return $this->state(fn (array $attributes) => [
            'file_path' => 'documents/'.fake()->uuid().'.pdf',
            'file_name' => $fileName,
            'mime_type' => 'application/pdf',
        ]);
    }

    /**
     * Indicate that the document is popular (high download count).
     */
    public function popular(): static
    {
        return $this->state(fn (array $attributes) => [
            'download_count' => fake()->numberBetween(500, 2000),
        ]);
    }
}
