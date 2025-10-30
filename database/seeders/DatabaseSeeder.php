<?php

namespace Database\Seeders;

use Database\Seeders\SAS\DigitalizedDocumentSeeder;
use Database\Seeders\SAS\InsuranceSeeder;
use Database\Seeders\SAS\OrganizationActivitySeeder;
use Database\Seeders\SAS\OrganizationSeeder;
use Database\Seeders\SAS\SASActivitySeeder;
use Database\Seeders\SAS\ScholarshipSeeder;
use Database\Seeders\USG\AnnouncementSeeder;
use Database\Seeders\USG\DocumentSeeder;
use Database\Seeders\USG\EventSeeder;
use Database\Seeders\USG\OfficerSeeder;
use Database\Seeders\USG\ResolutionSeeder;
use Database\Seeders\USG\TransparencyReportSeeder;
use Database\Seeders\USG\VMGOSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles, users, and system settings
        $this->call([
            RolesAndPermissionsSeeder::class,
            UserSeeder::class,
        ]);

        // Seed USG module data
        $this->call([
            VMGOSeeder::class,
            OfficerSeeder::class,
            ResolutionSeeder::class,
            AnnouncementSeeder::class,
            EventSeeder::class,
            DocumentSeeder::class,
            TransparencyReportSeeder::class,
        ]);

        // Seed SAS module data
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
