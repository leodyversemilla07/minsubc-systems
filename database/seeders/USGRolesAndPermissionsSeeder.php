<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class USGRolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create USG-specific permissions
        $permissions = [
            // USG Officer permissions
            'usg_view_dashboard',
            'usg_create_announcements',
            'usg_edit_announcements',
            'usg_delete_announcements',
            'usg_publish_announcements',
            'usg_create_events',
            'usg_edit_events',
            'usg_delete_events',
            'usg_publish_events',
            'usg_create_resolutions',
            'usg_edit_resolutions',
            'usg_delete_resolutions',
            'usg_submit_resolutions',

            // USG Admin permissions (additional to officer permissions)
            'usg_manage_vmgo',
            'usg_manage_officers',
            'usg_approve_resolutions',
            'usg_reject_resolutions',
            'usg_manage_documents',
            'usg_archive_content',
            'usg_view_analytics',
            'usg_manage_settings',
        ];

        // Create permissions if they don't exist
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Update cache to know about the newly created permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create USG Officer role
        $usgOfficerRole = Role::firstOrCreate(['name' => 'usg-officer']);
        $usgOfficerRole->syncPermissions([
            'usg_view_dashboard',
            'usg_create_announcements',
            'usg_edit_announcements',
            'usg_delete_announcements',
            'usg_publish_announcements',
            'usg_create_events',
            'usg_edit_events',
            'usg_delete_events',
            'usg_publish_events',
            'usg_create_resolutions',
            'usg_edit_resolutions',
            'usg_delete_resolutions',
            'usg_submit_resolutions',
        ]);

        // Create USG Admin role (has all officer permissions plus admin-specific ones)
        $usgAdminRole = Role::firstOrCreate(['name' => 'usg-admin']);
        $usgAdminRole->syncPermissions([
            // All officer permissions
            'usg_view_dashboard',
            'usg_create_announcements',
            'usg_edit_announcements',
            'usg_delete_announcements',
            'usg_publish_announcements',
            'usg_create_events',
            'usg_edit_events',
            'usg_delete_events',
            'usg_publish_events',
            'usg_create_resolutions',
            'usg_edit_resolutions',
            'usg_delete_resolutions',
            'usg_submit_resolutions',
            // Plus admin permissions
            'usg_manage_vmgo',
            'usg_manage_officers',
            'usg_approve_resolutions',
            'usg_reject_resolutions',
            'usg_manage_documents',
            'usg_archive_content',
            'usg_view_analytics',
            'usg_manage_settings',
        ]);

        // Note: system-admin role should already exist from RolesAndPermissionsSeeder
        // and should have access to all permissions in the system
    }
}
