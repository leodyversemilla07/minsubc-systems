<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class USGAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure the usg-admin role exists
        if (! Role::where('name', 'usg-admin')->exists()) {
            $this->command->error('The usg-admin role does not exist. Please run RolesAndPermissionsSeeder first.');

            return;
        }

        // Create default USG admin user if it doesn't exist
        $user = User::firstOrCreate(
            ['email' => 'usg-admin@minsu.edu.ph'],
            [
                'first_name' => 'USG',
                'middle_name' => null,
                'last_name' => 'Administrator',
                'password' => Hash::make('USGAdmin@2024'),
                'email_verified_at' => now(),
            ]
        );

        // Assign the usg-admin role if not already assigned
        if (! $user->hasRole('usg-admin')) {
            $user->assignRole('usg-admin');
            $this->command->info("✅ USG Admin user created: {$user->email}");
            $this->command->warn('⚠️  Default password: USGAdmin@2024 (Please change this immediately!)');
        } else {
            $this->command->info("ℹ️  USG Admin user already exists: {$user->email}");
        }
    }
}
