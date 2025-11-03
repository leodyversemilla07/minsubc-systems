<?php

namespace Modules\USG\Database\Seeders;

use Illuminate\Database\Seeder;

class USGDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
