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
            'voting.elections.view',
            'voting.elections.create',
            'voting.elections.edit',
            'voting.elections.delete',
            'voting.elections.toggle-status',

            // Candidate Management
            'voting.candidates.view',
            'voting.candidates.create',
            'voting.candidates.edit',
            'voting.candidates.delete',

            // Position Management
            'voting.positions.view',
            'voting.positions.create',
            'voting.positions.edit',
            'voting.positions.delete',
            'voting.positions.reorder',

            // Partylist Management
            'voting.partylists.view',
            'voting.partylists.create',
            'voting.partylists.edit',
            'voting.partylists.delete',

            // Voter Management
            'voting.voters.view',
            'voting.voters.create',
            'voting.voters.edit',
            'voting.voters.delete',
            'voting.voters.reset-password',
            'voting.voters.reset-vote',
            'voting.voters.export',

            // Activity Logs
            'voting.activity-logs.view',

            // Feedback
            'voting.feedback.view',
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
            'voting.elections.view',
            'voting.candidates.view',
            'voting.positions.view',
            'voting.partylists.view',
            'voting.voters.view',
            'voting.activity-logs.view',
            'voting.feedback.view',
        ]);

        // If Super Admin role exists, give it all voting permissions
        $superAdminRole = Role::where('name', 'super-admin')->first();
        if ($superAdminRole) {
            $superAdminRole->givePermissionTo($permissions);
        }

        $this->command->info('✓ Voting System permissions created successfully!');
    }
}
