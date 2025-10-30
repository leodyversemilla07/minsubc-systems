<?php

namespace Database\Seeders\SAS;

use App\Modules\SAS\Models\Organization;
use App\Modules\SAS\Models\OrganizationMember;
use App\Modules\SAS\Models\OrganizationOfficer;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 11 minor organizations
        $minorOrgs = Organization::factory()
            ->count(11)
            ->minor()
            ->active()
            ->create();

        // Create 12 major organizations
        $majorOrgs = Organization::factory()
            ->count(12)
            ->major()
            ->active()
            ->create();

        $allOrgs = $minorOrgs->merge($majorOrgs);

        // For each organization, create officers and members
        foreach ($allOrgs as $org) {
            // Create 5-10 officers per organization
            OrganizationOfficer::factory()
                ->count(rand(5, 10))
                ->current()
                ->create([
                    'organization_id' => $org->id,
                ]);

            // Create 20-100 members per organization
            OrganizationMember::factory()
                ->count(rand(20, 100))
                ->active()
                ->create([
                    'organization_id' => $org->id,
                ]);
        }
    }
}
