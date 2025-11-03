<?php

namespace Modules\SAS\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\SAS\Models\DigitalizedDocument;

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
