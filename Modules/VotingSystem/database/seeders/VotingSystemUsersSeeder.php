<?php

namespace Modules\VotingSystem\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class VotingSystemUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure required roles exist
        $requiredRoles = ['voting-admin', 'voting-manager'];

        foreach ($requiredRoles as $roleName) {
            if (! Role::where('name', $roleName)->exists()) {
                $this->command->error("The {$roleName} role does not exist. Please run VotingSystemPermissionsSeeder first.");

                return;
            }
        }

        // Create VotingSystem module users
        $users = [
            // Voting Admin
            [
                'first_name' => 'Kian',
                'middle_name' => null,
                'last_name' => 'Rodriguez',
                'email' => 'kian.rodriguez@minsu.edu.ph',
                'password' => Hash::make('VotingAdmin@2024'),
                'email_verified_at' => now(),
                'role' => 'voting-admin',
            ],

            // Voting Manager (View-only)
            [
                'first_name' => 'Voting',
                'middle_name' => null,
                'last_name' => 'Manager',
                'email' => 'voting-manager@minsu.edu.ph',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'voting-manager',
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

        $this->command->info('✓ VotingSystem module users created successfully!');
    }
}
