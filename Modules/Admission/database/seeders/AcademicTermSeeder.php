<?php

namespace Modules\Admission\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Admission\Models\AcademicTerm;

class AcademicTermSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currentYear = date('Y');
        $nextYear = $currentYear + 1;

        // Create current and next academic terms
        $terms = [
            [
                'academic_year' => "{$currentYear}-{$nextYear}",
                'semester' => '1st',
                'enrollment_start' => date('Y-m-d', strtotime($currentYear . '-06-01')),
                'enrollment_end' => date('Y-m-d', strtotime($currentYear . '-08-31')),
                'classes_start' => date('Y-m-d', strtotime($currentYear . '-09-01')),
                'classes_end' => date('Y-m-d', strtotime($currentYear . '-12-15')),
                'status' => 'enrollment',
                'is_active' => true,
                'notes' => 'Current enrollment period for First Semester',
            ],
            [
                'academic_year' => "{$currentYear}-{$nextYear}",
                'semester' => '2nd',
                'enrollment_start' => date('Y-m-d', strtotime($currentYear . '-01-02')),
                'enrollment_end' => date('Y-m-d', strtotime($currentYear . '-03-15')),
                'classes_start' => date('Y-m-d', strtotime($currentYear . '-03-16')),
                'classes_end' => date('Y-m-d', strtotime($currentYear . '-06-15')),
                'status' => 'upcoming',
                'is_active' => false,
                'notes' => 'Second Semester (Scheduled)',
            ],
        ];

        foreach ($terms as $termData) {
            AcademicTerm::updateOrCreate(
                [
                    'academic_year' => $termData['academic_year'],
                    'semester' => $termData['semester'],
                ],
                $termData
            );
        }
    }
}