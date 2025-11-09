<?php

namespace Modules\SAS\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class SASUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure required roles exist
        $requiredRoles = ['sas-staff', 'sas-admin'];

        foreach ($requiredRoles as $roleName) {
            if (! Role::where('name', $roleName)->exists()) {
                $this->command->error("The {$roleName} role does not exist. Please run SASPermissionsSeeder first.");

                return;
            }
        }

        // Create SAS module users
        $users = [
            // SAS Staff
            [
                'first_name' => 'Sophia',
                'middle_name' => 'Mae',
                'last_name' => 'Villanueva',
                'email' => 'sophia.villanueva@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'sas-staff',
            ],
            [
                'first_name' => 'Marco',
                'middle_name' => 'Luis',
                'last_name' => 'Ramos',
                'email' => 'marco.ramos@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'sas-staff',
            ],

            // SAS Admin
            [
                'first_name' => 'SAS',
                'middle_name' => null,
                'last_name' => 'Administrator',
                'email' => 'sas-admin@minsu.edu.ph',
                'password' => Hash::make('SASAdmin@2024'),
                'email_verified_at' => now(),
                'role' => 'sas-admin',
            ],
        ];

        foreach ($users as $userData) {
            $role = $userData['role'];
            unset($userData['role']);

            // Create or update user
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                $userData
            );

            // Assign role to user
            if (! $user->hasRole($role)) {
                $user->assignRole($role);
            }
        }

        $this->command->info('✓ SAS module users created successfully!');
    }
}
