<?php

namespace Modules\SAS\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\SAS\Models\InsuranceDocument;
use Modules\SAS\Models\InsuranceRecord;

class InsuranceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create students if they don't exist
        $students = User::factory()->count(50)->create();

        foreach ($students as $student) {
            // Each student has 1-3 insurance records
            $insuranceRecords = InsuranceRecord::factory()
                ->count(rand(1, 3))
                ->create([
                    'student_id' => $student->id,
                ]);

            // For each insurance record, create 2-4 documents
            foreach ($insuranceRecords as $record) {
                InsuranceDocument::factory()
                    ->count(rand(2, 4))
                    ->create([
                        'insurance_id' => $record->id,
                    ]);
            }
        }
    }
}
