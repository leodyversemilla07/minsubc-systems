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

        // Create permissions based on DRS.md specifications
        $permissions = [
            // Student permissions (from DRS.md: "Submit requests, view own requests, make payments, track status")
            'submit_requests',
            'view_own_requests',
            'make_payments',
            'track_status',

            // Cashier permissions (from DRS.md: "View pending cash payments, confirm cash payments, issue OR")
            'view_pending_cash_payments',
            'confirm_cash_payments',
            'issue_official_receipts',
            'verify_payment_references', // For PRN verification

            // Registrar Staff permissions (from DRS.md: "View all requests, process documents, approve/reject, mark ready for claim")
            'view_all_requests',
            'process_documents',
            'approve_requests',
            'reject_requests',
            'mark_ready_for_claim',
            'release_documents', // For final document release

            // Registrar Admin permissions (from DRS.md: "All staff permissions + user management, system configuration")
            'manage_users',
            'system_configuration',

            // System Admin permissions (from DRS.md: "Full system access, database management, reports")
            'full_system_access',
            'database_management',
            'view_reports',
            'manage_system_settings', // Additional admin capability
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Update cache to know about the newly created permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create roles and assign permissions exactly as specified in DRS.md
        $studentRole = Role::create(['name' => 'student']);
        $studentRole->givePermissionTo([
            'submit_requests',
            'view_own_requests',
            'make_payments',
            'track_status',
        ]);

        $cashierRole = Role::create(['name' => 'cashier']);
        $cashierRole->givePermissionTo([
            'view_pending_cash_payments',
            'confirm_cash_payments',
            'issue_official_receipts',
            'verify_payment_references',
        ]);

        $registrarStaffRole = Role::create(['name' => 'registrar-staff']);
        $registrarStaffRole->givePermissionTo([
            'view_all_requests',
            'process_documents',
            'approve_requests',
            'reject_requests',
            'mark_ready_for_claim',
            'release_documents',
        ]);

        $registrarAdminRole = Role::create(['name' => 'registrar-admin']);
        $registrarAdminRole->givePermissionTo([
            // All staff permissions
            'view_all_requests',
            'process_documents',
            'approve_requests',
            'reject_requests',
            'mark_ready_for_claim',
            'release_documents',
            // Plus admin permissions
            'manage_users',
            'system_configuration',
        ]);

        $systemAdminRole = Role::create(['name' => 'system-admin']);
        $systemAdminRole->givePermissionTo([
            // All permissions for full system access
            'submit_requests',
            'view_own_requests',
            'make_payments',
            'track_status',
            'view_pending_cash_payments',
            'confirm_cash_payments',
            'issue_official_receipts',
            'verify_payment_references',
            'view_all_requests',
            'process_documents',
            'approve_requests',
            'reject_requests',
            'mark_ready_for_claim',
            'release_documents',
            'manage_users',
            'system_configuration',
            'full_system_access',
            'database_management',
            'view_reports',
            'manage_system_settings',
        ]);
    }
}
