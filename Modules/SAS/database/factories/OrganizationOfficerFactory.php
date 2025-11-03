<?php

namespace Modules\SAS\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\SAS\Models\Organization;
use Modules\SAS\Models\OrganizationOfficer;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\SAS\Models\OrganizationOfficer>
 */
class OrganizationOfficerFactory extends Factory
{
    protected $model = OrganizationOfficer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $termStart = fake()->dateTimeBetween('-2 years', 'now');
        $termEnd = fake()->optional(0.3)->dateTimeBetween($termStart, '+1 year');

        return [
            'organization_id' => Organization::factory(),
            'student_id' => User::factory(),
            'position' => fake()->randomElement([
                'President',
                'Vice President',
                'Secretary',
                'Treasurer',
                'Auditor',
                'Public Relations Officer',
                'Business Manager',
                'Documentation Officer',
                'Project Manager',
            ]),
            'term_start' => $termStart,
            'term_end' => $termEnd,
            'responsibilities' => fake()->paragraph(2),
            'photo_path' => 'officer_photos/'.fake()->uuid().'.jpg',
            'contact_email' => fake()->email(),
            'contact_phone' => fake()->phoneNumber(),
            'is_current' => $termEnd === null,
        ];
    }

    protected static function newFactory(): OrganizationOfficerFactory
    {
        return OrganizationOfficerFactory::new();
    }

    public function current(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_current' => true,
            'term_end' => null,
        ]);
    }
}
