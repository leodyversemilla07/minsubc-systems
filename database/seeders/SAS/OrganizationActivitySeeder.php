<?php

namespace Database\Seeders\SAS;

use App\Models\User;
use App\Modules\SAS\Models\Organization;
use App\Modules\SAS\Models\OrganizationActivity;
use App\Modules\SAS\Models\OrganizationDocument;
use Illuminate\Database\Seeder;

class OrganizationActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create admin user
        $admin = User::firstOrCreate(
            ['email' => 'sas-admin@minsu.edu.ph'],
            [
                'first_name' => 'SAS',
                'last_name' => 'Administrator',
                'password' => bcrypt('password'),
            ]
        );

        // Get all organizations
        $organizations = Organization::all();

        if ($organizations->isEmpty()) {
            return;
        }

        foreach ($organizations as $org) {
            // Create 5-15 activities per organization
            OrganizationActivity::factory()
                ->count(rand(5, 15))
                ->create([
                    'organization_id' => $org->id,
                    'created_by' => $admin->id,
                ]);

            // Create 10-30 documents per organization
            OrganizationDocument::factory()
                ->count(rand(10, 30))
                ->create([
                    'organization_id' => $org->id,
                    'uploaded_by' => $admin->id,
                ]);
        }
    }
}
