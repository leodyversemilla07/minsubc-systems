<?php

namespace Modules\SAS\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\SAS\Models\Organization;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\SAS\Models\Organization>
 */
class OrganizationFactory extends Factory
{
    protected $model = Organization::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organization_code' => fake()->unique()->lexify('???'),
            'organization_name' => fake()->words(3, true).' Organization',
            'organization_type' => fake()->randomElement(['Major', 'Minor']),
            'category' => fake()->randomElement(['Academic', 'Cultural', 'Service', 'Sports']),
            'mission' => fake()->paragraph(2),
            'vision' => fake()->paragraph(2),
            'establishment_date' => fake()->dateTimeBetween('-20 years', '-1 year'),
            'logo_path' => 'organization_logos/'.fake()->lexify('???').'.png',
            'status' => fake()->randomElement(['Active', 'Inactive']),
            'adviser_id' => User::factory(),
            'contact_email' => fake()->unique()->safeEmail(),
            'contact_phone' => fake()->phoneNumber(),
        ];
    }

    protected static function newFactory(): OrganizationFactory
    {
        return OrganizationFactory::new();
    }

    public function minor(): static
    {
        return $this->state(fn (array $attributes) => [
            'organization_type' => 'Minor',
        ]);
    }

    public function major(): static
    {
        return $this->state(fn (array $attributes) => [
            'organization_type' => 'Major',
        ]);
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Active',
        ]);
    }
}
