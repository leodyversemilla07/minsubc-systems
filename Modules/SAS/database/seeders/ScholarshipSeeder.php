<?php

namespace Modules\SAS\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\SAS\Models\Scholarship;
use Modules\SAS\Models\ScholarshipRecipient;
use Modules\SAS\Models\ScholarshipRequirement;

class ScholarshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create admin user
        $admin = User::firstOrCreate(
            ['email' => 'sas-admin@minsu.edu.ph'],
            [
                'first_name' => 'SAS',
                'last_name' => 'Administrator',
                'password' => bcrypt('password'),
            ]
        );

        // Create scholarships
        $scholarships = Scholarship::factory()
            ->count(10)
            ->create();

        // For each scholarship, create recipients
        foreach ($scholarships as $scholarship) {
            // Create 5-15 recipients per scholarship
            $recipients = ScholarshipRecipient::factory()
                ->count(rand(5, 15))
                ->create([
                    'scholarship_id' => $scholarship->id,
                    'created_by' => $admin->id,
                    'updated_by' => $admin->id,
                ]);

            // For each recipient, create 3-5 requirements
            foreach ($recipients as $recipient) {
                ScholarshipRequirement::factory()
                    ->count(rand(3, 5))
                    ->create([
                        'recipient_id' => $recipient->id,
                    ]);
            }
        }
    }
}
