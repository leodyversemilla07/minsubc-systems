<?php

namespace Modules\Admission\Database\Seeders;

use Illuminate\Database\Seeder;

class AdmissionDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            CourseSeeder::class,
            AdmissionPermissionsSeeder::class,
        ]);
    }
}
