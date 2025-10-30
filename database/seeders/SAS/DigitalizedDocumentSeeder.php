<?php

namespace Database\Seeders\SAS;

use App\Models\User;
use App\Modules\SAS\Models\DigitalizedDocument;
use Illuminate\Database\Seeder;

class DigitalizedDocumentSeeder extends Seeder
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

        // Create Digitalized Documents
        DigitalizedDocument::factory()
            ->count(100)
            ->create([
                'uploaded_by' => $admin->id,
            ]);
    }
}
