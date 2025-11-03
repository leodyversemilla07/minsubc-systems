<?php

namespace Modules\SAS\Database\Seeders;

use Illuminate\Database\Seeder;

class SASDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Only seed SAS demo data in development environments
        // Production will have real data entered by SAS staff
        if (! app()->environment('production')) {
            $this->call([
                ScholarshipSeeder::class,
                InsuranceSeeder::class,
                OrganizationSeeder::class,
                OrganizationActivitySeeder::class,
                SASActivitySeeder::class,
                DigitalizedDocumentSeeder::class,
            ]);
        }
    }
}
