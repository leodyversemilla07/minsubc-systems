<?php

namespace Modules\Admission\Database\Seeders;

use Illuminate\Database\Seeder;

class AdmissionDatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CourseSeeder::class,
            AdmissionPermissionsSeeder::class,
            AcademicTermSeeder::class,
            SubjectSeeder::class,
            EnrollmentFeeSeeder::class,
        ]);
    }
}