<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Core setup (required for any environment)
        $this->call([
            RolesAndPermissionsSeeder::class,
            UserSeeder::class,
        ]);

        // Demo data (populates all 19 modules)
        $this->call([
            DemoSeeder::class,
        ]);
    }
}
