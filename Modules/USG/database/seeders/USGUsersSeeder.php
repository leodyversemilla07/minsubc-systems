<?php

namespace Modules\USG\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class USGUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure required roles exist
        $requiredRoles = ['usg-officer', 'usg-admin'];

        foreach ($requiredRoles as $roleName) {
            if (! Role::where('name', $roleName)->exists()) {
                $this->command->error("The {$roleName} role does not exist. Please run USGPermissionsSeeder first.");

                return;
            }
        }

        // Create USG module users
        $users = [
            // USG Admin
            [
                'first_name' => 'USG',
                'middle_name' => null,
                'last_name' => 'Administrator',
                'email' => 'usg-admin@minsu.edu.ph',
                'password' => Hash::make('USGAdmin@2024'),
                'email_verified_at' => now(),
                'role' => 'usg-admin',
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

        $this->command->info('✓ USG module users created successfully!');
    }
}
