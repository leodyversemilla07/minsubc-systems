<?php

namespace Database\Seeders;

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
            USGAdminSeeder::class,
            UserStudentSeeder::class,
            SystemSettingsSeeder::class,
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
    }
}
