<?php

namespace Modules\SAS\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\SAS\Models\SASActivity;

class SASActivitySeeder extends Seeder
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

        // Create SAS Activities (Calendar of Activities)
        SASActivity::factory()
            ->count(50)
            ->create([
                'created_by' => $admin->id,
            ]);
    }
}
