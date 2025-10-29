<?php

namespace Database\Factories;

use App\Models\User;
use App\Modules\SAS\Models\Organization;
use App\Modules\SAS\Models\OrganizationActivity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Modules\SAS\Models\OrganizationActivity>
 */
class OrganizationActivityFactory extends Factory
{
    protected $model = OrganizationActivity::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $budget = fake()->randomFloat(2, 5000, 100000);
        $expenses = fake()->randomFloat(2, $budget * 0.5, $budget * 1.2);

        return [
            'organization_id' => Organization::factory(),
            'activity_name' => fake()->randomElement([
                'General Assembly',
                'Leadership Training',
                'Community Outreach Program',
                'Skills Workshop',
                'Sports Fest',
                'Cultural Night',
                'Fundraising Event',
                'Team Building Activity',
                'Seminar',
                'Educational Tour',
            ]),
            'description' => fake()->paragraph(3),
            'activity_date' => fake()->dateTimeBetween('-1 year', '+6 months'),
            'venue' => fake()->randomElement([
                'MinSU Auditorium',
                'Gymnasium',
                'Covered Court',
                'Function Hall',
                'Conference Room',
                'Outdoor Plaza',
            ]),
            'participants_count' => fake()->numberBetween(20, 300),
            'budget' => $budget,
            'expenses' => $expenses,
            'accomplishment_report' => fake()->optional(0.7)->paragraph(5),
            'created_by' => User::factory(),
        ];
    }

    protected static function newFactory(): OrganizationActivityFactory
    {
        return OrganizationActivityFactory::new();
    }
}
