<?php

namespace Modules\SAS\Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class SASPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions for SAS Module
        $permissions = [
            // SAS Staff permissions
            'view_dashboard',
            'view_scholarships',
            'view_insurance',
            'view_organizations',
            'view_activities',
            'process_scholarships',
            'process_insurance',

            // SAS Admin permissions (additional to staff permissions)
            'manage_scholarships',
            'manage_insurance',
            'manage_organizations',
            'manage_activities',
            'manage_documents',
            'approve_applications',
            'reject_applications',
            'view_analytics',
            'manage_settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create SAS Staff role
        $sasStaffRole = Role::firstOrCreate(['name' => 'sas-staff']);
        $sasStaffRole->givePermissionTo([
            'view_dashboard',
            'view_scholarships',
            'view_insurance',
            'view_organizations',
            'view_activities',
            'process_scholarships',
            'process_insurance',
        ]);

        // Create SAS Admin role (has all staff permissions plus admin-specific ones)
        $sasAdminRole = Role::firstOrCreate(['name' => 'sas-admin']);
        $sasAdminRole->givePermissionTo([
            // All staff permissions
            'view_dashboard',
            'view_scholarships',
            'view_insurance',
            'view_organizations',
            'view_activities',
            'process_scholarships',
            'process_insurance',
            // Plus admin permissions
            'manage_scholarships',
            'manage_insurance',
            'manage_organizations',
            'manage_activities',
            'manage_documents',
            'approve_applications',
            'reject_applications',
            'view_analytics',
            'manage_settings',
        ]);

        // Create Organization Adviser role
        $orgAdviserRole = Role::firstOrCreate(['name' => 'org_adviser']);
        $orgAdviserRole->givePermissionTo([
            'view_dashboard',
            'view_organizations',
            'manage_organizations', // Limited management for their organization
        ]);

        // If Super Admin role exists, give it all SAS permissions
        $superAdminRole = Role::where('name', 'super-admin')->first();
        if ($superAdminRole) {
            $superAdminRole->givePermissionTo($permissions);
        }

        $this->command->info('✓ SAS module permissions created successfully!');
    }
}
