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
            'view_dashboard',
            'create_announcements',
            'edit_announcements',
            'delete_announcements',
            'publish_announcements',
            'create_events',
            'edit_events',
            'delete_events',
            'publish_events',
            'create_resolutions',
            'edit_resolutions',
            'delete_resolutions',
            'submit_resolutions',

            // USG Admin permissions (additional to officer permissions)
            'manage_vmgo',
            'manage_officers',
            'approve_resolutions',
            'reject_resolutions',
            'manage_documents',
            'archive_content',
            'view_analytics',
            'manage_settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create USG Officer role
        $usgOfficerRole = Role::firstOrCreate(['name' => 'usg-officer']);
        $usgOfficerRole->givePermissionTo([
            'view_dashboard',
            'create_announcements',
            'edit_announcements',
            'delete_announcements',
            'publish_announcements',
            'create_events',
            'edit_events',
            'delete_events',
            'publish_events',
            'create_resolutions',
            'edit_resolutions',
            'delete_resolutions',
            'submit_resolutions',
        ]);

        // Create USG Admin role (has all officer permissions plus admin-specific ones)
        $usgAdminRole = Role::firstOrCreate(['name' => 'usg-admin']);
        $usgAdminRole->givePermissionTo([
            // All officer permissions
            'view_dashboard',
            'create_announcements',
            'edit_announcements',
            'delete_announcements',
            'publish_announcements',
            'create_events',
            'edit_events',
            'delete_events',
            'publish_events',
            'create_resolutions',
            'edit_resolutions',
            'delete_resolutions',
            'submit_resolutions',
            // Plus admin permissions
            'manage_vmgo',
            'manage_officers',
            'approve_resolutions',
            'reject_resolutions',
            'manage_documents',
            'archive_content',
            'view_analytics',
            'manage_settings',
        ]);

        // If Super Admin role exists, give it all USG permissions
        $superAdminRole = Role::where('name', 'super-admin')->first();
        if ($superAdminRole) {
            $superAdminRole->givePermissionTo($permissions);
        }

        $this->command->info('✓ USG module permissions created successfully!');
    }
}
