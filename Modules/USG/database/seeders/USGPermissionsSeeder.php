<?php

namespace Modules\USG\Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class USGPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions for USG Module
        $permissions = [
            // USG Officer permissions
            'usg.view_dashboard',
            'usg.create_announcements',
            'usg.edit_announcements',
            'usg.delete_announcements',
            'usg.publish_announcements',
            'usg.create_events',
            'usg.edit_events',
            'usg.delete_events',
            'usg.publish_events',
            'usg.create_resolutions',
            'usg.edit_resolutions',
            'usg.delete_resolutions',
            'usg.submit_resolutions',

            // USG Admin permissions (additional to officer permissions)
            'usg.manage_vmgo',
            'usg.manage_officers',
            'usg.approve_resolutions',
            'usg.reject_resolutions',
            'usg.manage_documents',
            'usg.archive_content',
            'usg.view_analytics',
            'usg.manage_settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create USG Officer role
        $usgOfficerRole = Role::firstOrCreate(['name' => 'usg-officer']);
        $usgOfficerRole->givePermissionTo([
            'usg.view_dashboard',
            'usg.create_announcements',
            'usg.edit_announcements',
            'usg.delete_announcements',
            'usg.publish_announcements',
            'usg.create_events',
            'usg.edit_events',
            'usg.delete_events',
            'usg.publish_events',
            'usg.create_resolutions',
            'usg.edit_resolutions',
            'usg.delete_resolutions',
            'usg.submit_resolutions',
        ]);

        // Create USG Admin role (has all officer permissions plus admin-specific ones)
        $usgAdminRole = Role::firstOrCreate(['name' => 'usg-admin']);
        $usgAdminRole->givePermissionTo([
            // All officer permissions
            'usg.view_dashboard',
            'usg.create_announcements',
            'usg.edit_announcements',
            'usg.delete_announcements',
            'usg.publish_announcements',
            'usg.create_events',
            'usg.edit_events',
            'usg.delete_events',
            'usg.publish_events',
            'usg.create_resolutions',
            'usg.edit_resolutions',
            'usg.delete_resolutions',
            'usg.submit_resolutions',
            // Plus admin permissions
            'usg.manage_vmgo',
            'usg.manage_officers',
            'usg.approve_resolutions',
            'usg.reject_resolutions',
            'usg.manage_documents',
            'usg.archive_content',
            'usg.view_analytics',
            'usg.manage_settings',
        ]);

        // If Super Admin role exists, give it all USG permissions
        $superAdminRole = Role::where('name', 'super-admin')->first();
        if ($superAdminRole) {
            $superAdminRole->givePermissionTo($permissions);
        }

        $this->command->info('✓ USG module permissions created successfully!');
    }
}
