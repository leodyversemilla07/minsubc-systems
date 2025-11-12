<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create core permissions (student and super admin)
        $corePermissions = [
            // Student permissions (from DRS.md: "Submit requests, view own requests, make payments, track status")
            'submit_requests',
            'view_own_requests',
            'make_payments',
            'track_status',

            // Super Admin permissions (highest authority - can manage everything including other admins)
            'super_admin_access',
            'manage_all_users',
            'manage_all_roles',
            'manage_system_admins',
            'view_all_audit_logs',
            'manage_global_settings',
            'enable_disable_modules',
            'database_admin_access',
            'system_wide_reports',
            'security_administration',
            'password_reset_admin',
            'full_system_access',
            'database_management',
            'view_reports',
        ];

        // Create core permissions
        foreach ($corePermissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Student role
        $studentRole = Role::firstOrCreate(['name' => 'student']);
        $studentRole->syncPermissions([
            'submit_requests',
            'view_own_requests',
            'make_payments',
            'track_status',
        ]);

        // Create Super Admin role (will receive all module permissions from module seeders)
        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin']);
        $superAdminRole->syncPermissions($corePermissions);

        $this->command->info('✓ Core roles and permissions created successfully!');
        $this->command->info('');
        $this->command->info('Running module-specific permission seeders...');

        // Call module-specific permission seeders
        $this->call([
            \Modules\Registrar\Database\Seeders\RegistrarPermissionsSeeder::class,
            \Modules\USG\Database\Seeders\USGPermissionsSeeder::class,
            \Modules\SAS\Database\Seeders\SASPermissionsSeeder::class,
            \Modules\VotingSystem\Database\Seeders\VotingSystemPermissionsSeeder::class,
        ]);

        $this->command->info('');
        $this->command->info('✅ All roles and permissions have been seeded successfully!');
    }
}
