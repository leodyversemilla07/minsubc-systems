<?php

namespace Modules\Registrar\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class RegistrarUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure required roles exist
        $requiredRoles = ['cashier', 'registrar-staff', 'registrar-admin'];

        foreach ($requiredRoles as $roleName) {
            if (! Role::where('name', $roleName)->exists()) {
                $this->command->error("The {$roleName} role does not exist. Please run RegistrarPermissionsSeeder first.");

                return;
            }
        }

        // Create Registrar module users
        $users = [
            // Cashier
            [
                'first_name' => 'Elena',
                'middle_name' => 'Cruz',
                'last_name' => 'Martinez',
                'email' => 'elena.martinez@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'cashier',
            ],

            // Registrar Staff
            [
                'first_name' => 'Roberto',
                'middle_name' => 'Diaz',
                'last_name' => 'Santiago',
                'email' => 'roberto.santiago@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'registrar-staff',
            ],
            [
                'first_name' => 'Patricia',
                'middle_name' => 'Luna',
                'last_name' => 'Fernandez',
                'email' => 'patricia.fernandez@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'registrar-staff',
            ],

            // Registrar Admin
            [
                'first_name' => 'Miguel',
                'middle_name' => 'Antonio',
                'last_name' => 'Torres',
                'email' => 'miguel.torres@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'registrar-admin',
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

        $this->command->info('✓ Registrar module users created successfully!');
    }
}
