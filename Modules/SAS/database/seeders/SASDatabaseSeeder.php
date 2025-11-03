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
