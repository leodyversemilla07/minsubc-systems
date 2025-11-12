<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('courses')->insert([
            'course' => 'BSIT',
            'year_section' => '3F1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
