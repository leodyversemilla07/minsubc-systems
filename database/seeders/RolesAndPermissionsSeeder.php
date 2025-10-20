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

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
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
            // USG permissions
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
            'usg_manage_vmgo',
            'usg_manage_officers',
            'usg_approve_resolutions',
            'usg_reject_resolutions',
            'usg_manage_documents',
            'usg_archive_content',
            'usg_view_analytics',
            'usg_manage_settings',
        ]);

        // Create USG Officer role
        $usgOfficerRole = Role::create(['name' => 'usg-officer']);
        $usgOfficerRole->givePermissionTo([
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
        $usgAdminRole = Role::create(['name' => 'usg-admin']);
        $usgAdminRole->givePermissionTo([
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
    }
}
