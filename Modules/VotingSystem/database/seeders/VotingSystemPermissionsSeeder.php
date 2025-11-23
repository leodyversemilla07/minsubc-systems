<?php

namespace Modules\VotingSystem\Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class VotingSystemPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions for Voting System
        $permissions = [
            // Election Management
            'elections.view',
            'elections.create',
            'elections.edit',
            'elections.delete',
            'elections.toggle-status',

            // Candidate Management
            'candidates.view',
            'candidates.create',
            'candidates.edit',
            'candidates.delete',

            // Position Management
            'positions.view',
            'positions.create',
            'positions.edit',
            'positions.delete',
            'positions.reorder',

            // Partylist Management
            'partylists.view',
            'partylists.create',
            'partylists.edit',
            'partylists.delete',

            // Voter Management
            'voters.view',
            'voters.create',
            'voters.edit',
            'voters.delete',
            'voters.reset-password',
            'voters.reset-vote',
            'voters.export',

            // Activity Logs
            'activity-logs.view',

            // Feedback
            'feedback.view',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Voting Admin role and assign all permissions
        $votingAdminRole = Role::firstOrCreate(['name' => 'voting-admin']);
        $votingAdminRole->givePermissionTo($permissions);

        // Create Voting Manager role with limited permissions
        $votingManagerRole = Role::firstOrCreate(['name' => 'voting-manager']);
        $votingManagerRole->givePermissionTo([
            'elections.view',
            'candidates.view',
            'positions.view',
            'partylists.view',
            'voters.view',
            'activity-logs.view',
            'feedback.view',
        ]);

        // If Super Admin role exists, give it all voting permissions
        $superAdminRole = Role::where('name', 'super-admin')->first();
        if ($superAdminRole) {
            $superAdminRole->givePermissionTo($permissions);
        }

        $this->command->info('✓ Voting System permissions created successfully!');
    }
}
