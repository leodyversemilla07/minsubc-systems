<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\SAS\Database\Seeders\SASDatabaseSeeder;
use Modules\USG\Database\Seeders\USGDatabaseSeeder;

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
            USGDatabaseSeeder::class,
        ]);

        // Seed SAS module data
        $this->call([
            SASDatabaseSeeder::class,
        ]);

        // Seed Voting System data
        $this->call([
            VotingAdminSeeder::class,
            CourseSeeder::class,
        ]);
    }
}
