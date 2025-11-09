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
            'sas.view_dashboard',
            'sas.view_scholarships',
            'sas.view_insurance',
            'sas.view_organizations',
            'sas.view_activities',
            'sas.process_scholarships',
            'sas.process_insurance',

            // SAS Admin permissions (additional to staff permissions)
            'sas.manage_scholarships',
            'sas.manage_insurance',
            'sas.manage_organizations',
            'sas.manage_activities',
            'sas.manage_documents',
            'sas.approve_applications',
            'sas.reject_applications',
            'sas.view_analytics',
            'sas.manage_settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create SAS Staff role
        $sasStaffRole = Role::firstOrCreate(['name' => 'sas-staff']);
        $sasStaffRole->givePermissionTo([
            'sas.view_dashboard',
            'sas.view_scholarships',
            'sas.view_insurance',
            'sas.view_organizations',
            'sas.view_activities',
            'sas.process_scholarships',
            'sas.process_insurance',
        ]);

        // Create SAS Admin role (has all staff permissions plus admin-specific ones)
        $sasAdminRole = Role::firstOrCreate(['name' => 'sas-admin']);
        $sasAdminRole->givePermissionTo([
            // All staff permissions
            'sas.view_dashboard',
            'sas.view_scholarships',
            'sas.view_insurance',
            'sas.view_organizations',
            'sas.view_activities',
            'sas.process_scholarships',
            'sas.process_insurance',
            // Plus admin permissions
            'sas.manage_scholarships',
            'sas.manage_insurance',
            'sas.manage_organizations',
            'sas.manage_activities',
            'sas.manage_documents',
            'sas.approve_applications',
            'sas.reject_applications',
            'sas.view_analytics',
            'sas.manage_settings',
        ]);

        // If Super Admin role exists, give it all SAS permissions
        $superAdminRole = Role::where('name', 'super-admin')->first();
        if ($superAdminRole) {
            $superAdminRole->givePermissionTo($permissions);
        }

        $this->command->info('✓ SAS module permissions created successfully!');
    }
}
