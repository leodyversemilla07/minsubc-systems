<?php

namespace Database\Factories;

use App\Models\User;
use App\Modules\SAS\Models\Organization;
use App\Modules\SAS\Models\OrganizationMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\SAS\Models\OrganizationMember>
 */
class OrganizationMemberFactory extends Factory
{
    protected $model = OrganizationMember::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $membershipDate = fake()->dateTimeBetween('-3 years', 'now');
        $status = fake()->randomElement(['Active', 'Alumni', 'Inactive']);
        $membershipEndDate = in_array($status, ['Alumni', 'Inactive'])
            ? fake()->dateTimeBetween($membershipDate, 'now')
            : null;

        return [
            'organization_id' => Organization::factory(),
            'student_id' => User::factory(),
            'membership_date' => $membershipDate,
            'status' => $status,
            'membership_end_date' => $membershipEndDate,
        ];
    }

    protected static function newFactory(): OrganizationMemberFactory
    {
        return OrganizationMemberFactory::new();
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Active',
            'membership_end_date' => null,
        ]);
    }
}
