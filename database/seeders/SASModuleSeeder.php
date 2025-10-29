<?php

namespace Database\Seeders;

use App\Models\User;
use App\Modules\SAS\Models\DigitalizedDocument;
use App\Modules\SAS\Models\InsuranceDocument;
use App\Modules\SAS\Models\InsuranceRecord;
use App\Modules\SAS\Models\Organization;
use App\Modules\SAS\Models\OrganizationActivity;
use App\Modules\SAS\Models\OrganizationDocument;
use App\Modules\SAS\Models\OrganizationMember;
use App\Modules\SAS\Models\OrganizationOfficer;
use App\Modules\SAS\Models\SASActivity;
use App\Modules\SAS\Models\Scholarship;
use App\Modules\SAS\Models\ScholarshipRecipient;
use App\Modules\SAS\Models\ScholarshipRequirement;
use Illuminate\Database\Seeder;

class SASModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Seeding SAS Module data...');

        // Create some admin/staff users if they don't exist
        $admin = User::firstOrCreate(
            ['email' => 'sas.admin@minsubc.edu.ph'],
            [
                'first_name' => 'SAS',
                'last_name' => 'Administrator',
                'password' => bcrypt('password'),
            ]
        );

        // Create scholarships
        $this->command->info('Creating scholarships...');
        $scholarships = Scholarship::factory()
            ->count(10)
            ->create();

        // For each scholarship, create recipients
        $this->command->info('Creating scholarship recipients...');
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

        // Create insurance records for students
        $this->command->info('Creating insurance records...');
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

        // Create the 23 MinSU Organizations (11 minor + 12 major)
        $this->command->info('Creating organizations...');

        // Create 11 minor organizations
        $minorOrgs = Organization::factory()
            ->count(11)
            ->minor()
            ->active()
            ->create();

        // Create 12 major organizations
        $majorOrgs = Organization::factory()
            ->count(12)
            ->major()
            ->active()
            ->create();

        $allOrgs = $minorOrgs->merge($majorOrgs);

        // For each organization, create officers, members, activities, and documents
        $this->command->info('Creating organization officers, members, activities, and documents...');
        foreach ($allOrgs as $org) {
            // Create 5-10 officers per organization
            $officers = OrganizationOfficer::factory()
                ->count(rand(5, 10))
                ->current()
                ->create([
                    'organization_id' => $org->id,
                ]);

            // Create 20-100 members per organization
            $members = OrganizationMember::factory()
                ->count(rand(20, 100))
                ->active()
                ->create([
                    'organization_id' => $org->id,
                ]);

            // Create 5-15 activities per organization
            $activities = OrganizationActivity::factory()
                ->count(rand(5, 15))
                ->create([
                    'organization_id' => $org->id,
                    'created_by' => $admin->id,
                ]);

            // Create 10-30 documents per organization
            $documents = OrganizationDocument::factory()
                ->count(rand(10, 30))
                ->create([
                    'organization_id' => $org->id,
                    'uploaded_by' => $admin->id,
                ]);
        }

        $this->command->info('SAS Module seeding completed!');
        $this->command->info('- Scholarships: '.Scholarship::count());
        $this->command->info('- Scholarship Recipients: '.ScholarshipRecipient::count());
        $this->command->info('- Scholarship Requirements: '.ScholarshipRequirement::count());
        $this->command->info('- Insurance Records: '.InsuranceRecord::count());
        $this->command->info('- Insurance Documents: '.InsuranceDocument::count());
        $this->command->info('- Organizations: '.Organization::count());
        $this->command->info('- Organization Officers: '.OrganizationOfficer::count());
        $this->command->info('- Organization Members: '.OrganizationMember::count());
        $this->command->info('- Organization Activities: '.OrganizationActivity::count());
        $this->command->info('- Organization Documents: '.OrganizationDocument::count());

        // Create SAS Activities (Calendar of Activities)
        $this->command->info('Creating SAS activities...');
        SASActivity::factory()
            ->count(50)
            ->create([
                'created_by' => $admin->id,
            ]);

        // Create Digitalized Documents
        $this->command->info('Creating digitalized documents...');
        DigitalizedDocument::factory()
            ->count(100)
            ->create([
                'uploaded_by' => $admin->id,
            ]);

        $this->command->info('');
        $this->command->info('SAS Module seeding completed!');
        $this->command->info('- Scholarships: '.Scholarship::count());
        $this->command->info('- Scholarship Recipients: '.ScholarshipRecipient::count());
        $this->command->info('- Scholarship Requirements: '.ScholarshipRequirement::count());
        $this->command->info('- Insurance Records: '.InsuranceRecord::count());
        $this->command->info('- Insurance Documents: '.InsuranceDocument::count());
        $this->command->info('- Organizations: '.Organization::count());
        $this->command->info('- Organization Officers: '.OrganizationOfficer::count());
        $this->command->info('- Organization Members: '.OrganizationMember::count());
        $this->command->info('- Organization Activities: '.OrganizationActivity::count());
        $this->command->info('- Organization Documents: '.OrganizationDocument::count());
        $this->command->info('- SAS Activities: '.SASActivity::count());
        $this->command->info('- Digitalized Documents: '.DigitalizedDocument::count());
    }
}
