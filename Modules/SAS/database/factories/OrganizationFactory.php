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

    // Actual MinSU Student Organizations
    private static array $minorOrgs = [
        ['name' => 'Association of Computer Studies', 'code' => 'ACS', 'category' => 'Academic'],
        ['name' => 'Business Administration Society', 'code' => 'BAS', 'category' => 'Academic'],
        ['name' => 'Junior Philippine Institute of Accountants - MinSU Chapter', 'code' => 'JPIA', 'category' => 'Academic'],
        ['name' => 'Association of Public Administration', 'code' => 'APA', 'category' => 'Academic'],
        ['name' => 'Filipino Educators Association', 'code' => 'FEA', 'category' => 'Academic'],
        ['name' => 'Criminology Society', 'code' => 'CRIM-SOC', 'category' => 'Academic'],
        ['name' => 'Junior Marketing Association', 'code' => 'JMA', 'category' => 'Academic'],
        ['name' => 'EMTECH Organization', 'code' => 'EMTECH', 'category' => 'Academic'],
        ['name' => 'Tourism Society', 'code' => 'TS', 'category' => 'Academic'],
        ['name' => 'Minuang Bangunan IT Society', 'code' => 'MITS', 'category' => 'Academic'],
        ['name' => 'Young Agriculturists of MinSUBC', 'code' => 'YAMINSUBC', 'category' => 'Academic'],
    ];

    private static array $majorOrgs = [
        ['name' => 'Supreme Student Government', 'code' => 'SSG', 'category' => 'Governance'],
        ['name' => 'MinSU Chorale', 'code' => 'MC', 'category' => 'Cultural'],
        ['name' => 'MinSU Dance Troupe', 'code' => 'MDT', 'category' => 'Cultural'],
        ['name' => 'MinSU Dramatics Guild', 'code' => 'MDG', 'category' => 'Cultural'],
        ['name' => 'Paglaum Campus Ministry', 'code' => 'PCM', 'category' => 'Religious'],
        ['name' => 'Youth for Environment in Schools Organization', 'code' => 'YES-O', 'category' => 'Environmental'],
        ['name' => 'MinSU Publication', 'code' => 'MPUB', 'category' => 'Media'],
        ['name' => 'Red Cross Youth Council', 'code' => 'RCYC', 'category' => 'Service'],
        ['name' => 'Peer Facilitators', 'code' => 'PF', 'category' => 'Service'],
        ['name' => 'Gender and Development (GAD) Organization', 'code' => 'GAD', 'category' => 'Advocacy'],
        ['name' => 'National Service Training Program', 'code' => 'NSTP', 'category' => 'Service'],
        ['name' => 'MinSU Sports Council', 'code' => 'MSC', 'category' => 'Sports'],
    ];

    private static int $minorIndex = 0;

    private static int $majorIndex = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['Major', 'Minor']);
        $isMinor = $type === 'Minor';

        if ($isMinor && self::$minorIndex < count(self::$minorOrgs)) {
            $org = self::$minorOrgs[self::$minorIndex++];
        } elseif (! $isMinor && self::$majorIndex < count(self::$majorOrgs)) {
            $org = self::$majorOrgs[self::$majorIndex++];
        } else {
            // Fallback for extra orgs
            $org = [
                'name' => fake()->words(3, true).' Organization',
                'code' => fake()->lexify('???'),
                'category' => fake()->randomElement(['Academic', 'Cultural', 'Service', 'Sports']),
            ];
        }

        return [
            'organization_code' => $org['code'],
            'organization_name' => $org['name'],
            'organization_type' => $type,
            'category' => $org['category'],
            'mission' => fake()->paragraph(2),
            'vision' => fake()->paragraph(2),
            'establishment_date' => fake()->dateTimeBetween('-20 years', '-1 year'),
            'logo_path' => 'organization_logos/'.strtolower($org['code']).'.png',
            'status' => fake()->randomElement(['Active', 'Inactive']),
            'adviser_id' => User::factory(),
            'contact_email' => strtolower($org['code']).'@minsubc.edu.ph',
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
