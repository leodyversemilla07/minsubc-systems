<?php

namespace Modules\SAS\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Modules\SAS\Models\Organization;
use Modules\SAS\Models\SASActivity;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\SAS\Models\SASActivity>
 */
class SASActivityFactory extends Factory
{
    protected $model = SASActivity::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->randomElement([
            'Leadership Training Seminar',
            'Community Outreach Program',
            'Blood Donation Drive',
            'Environmental Awareness Campaign',
            'Cultural Festival',
            'Sports Fest',
            'Academic Symposium',
            'Career Fair',
            'Mental Health Awareness Week',
            'Student Organization Summit',
            'Volunteerism Program',
            'Skills Development Workshop',
        ]);

        $startDate = fake()->dateTimeBetween('-2 months', '+3 months');
        $endDate = (clone $startDate)->modify('+'.fake()->numberBetween(1, 7).' days');

        return [
            'activity_title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numerify('###'),
            'description' => fake()->paragraphs(3, true),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'all_day' => fake()->boolean(40),
            'location' => fake()->randomElement([
                'MinSU Gymnasium',
                'Main Auditorium',
                'Student Center',
                'Covered Court',
                'Conference Room A',
                'Online via Zoom',
                'Multi-Purpose Hall',
            ]),
            'category' => fake()->randomElement([
                'Academic',
                'Cultural',
                'Sports',
                'Social',
                'Environmental',
                'Community Service',
                'Leadership',
                'Health & Wellness',
            ]),
            'organizer' => fake()->randomElement([
                'Student Affairs Office',
                'Supreme Student Government',
                'Cultural Affairs Committee',
                'Sports Development Office',
            ]),
            'organization_id' => fake()->boolean(60) ? Organization::factory() : null,
            'color' => fake()->hexColor(),
            'is_recurring' => fake()->boolean(20),
            'recurrence_rule' => null,
            'status' => fake()->randomElement(['Scheduled', 'Ongoing', 'Completed', 'Cancelled']),
            'target_participants' => fake()->numberBetween(50, 500),
            'actual_participants' => fake()->boolean(40) ? fake()->numberBetween(30, 450) : null,
            'completion_report' => fake()->boolean(30) ? fake()->paragraphs(2, true) : null,
            'created_by' => User::factory(),
        ];
    }

    public function scheduled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Scheduled',
            'start_date' => fake()->dateTimeBetween('+1 week', '+2 months'),
            'actual_participants' => null,
            'completion_report' => null,
        ]);
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Completed',
            'start_date' => fake()->dateTimeBetween('-3 months', '-1 week'),
            'actual_participants' => fake()->numberBetween(30, 450),
            'completion_report' => fake()->paragraphs(2, true),
        ]);
    }

    public function ongoing(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Ongoing',
            'start_date' => now()->subDays(1),
            'end_date' => now()->addDays(2),
        ]);
    }
}
