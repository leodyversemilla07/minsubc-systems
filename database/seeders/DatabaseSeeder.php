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
        $this->call(RolesAndPermissionsSeeder::class);

        // Never create accounts with published demo credentials outside development.
        if (app()->environment('local', 'development', 'testing')) {
            $this->call([UserSeeder::class, DemoSeeder::class]);
        }
    }
}
