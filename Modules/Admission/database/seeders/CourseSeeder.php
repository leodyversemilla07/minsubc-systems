<?php

namespace Modules\Admission\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Admission\Models\Course;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            ['code' => 'BSIT', 'name' => 'Bachelor of Science in Information Technology', 'abbreviation' => 'BSIT'],
            ['code' => 'BSCS', 'name' => 'Bachelor of Science in Computer Science', 'abbreviation' => 'BSCS'],
            ['code' => 'BSBA', 'name' => 'Bachelor of Science in Business Administration', 'abbreviation' => 'BSBA'],
            ['code' => 'BSEd', 'name' => 'Bachelor of Secondary Education', 'abbreviation' => 'BSEd'],
            ['code' => 'BEEd', 'name' => 'Bachelor of Elementary Education', 'abbreviation' => 'BEEd'],
            ['code' => 'BSHM', 'name' => 'Bachelor of Science in Hospitality Management', 'abbreviation' => 'BSHM'],
            ['code' => 'BSTM', 'name' => 'Bachelor of Science in Tourism Management', 'abbreviation' => 'BSTM'],
            ['code' => 'BSCrim', 'name' => 'Bachelor of Science in Criminology', 'abbreviation' => 'BSCrim'],
            ['code' => 'BSA', 'name' => 'Bachelor of Science in Accountancy', 'abbreviation' => 'BSA'],
            ['code' => 'BSAgri', 'name' => 'Bachelor of Science in Agriculture', 'abbreviation' => 'BSAgri'],
        ];

        foreach ($courses as $course) {
            Course::firstOrCreate(['code' => $course['code']], $course);
        }

        $this->command->info('✓ Courses seeded successfully!');
    }
}
