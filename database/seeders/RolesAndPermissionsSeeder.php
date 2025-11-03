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

            // SAS Staff permissions
            'sas_view_dashboard',
            'sas_view_scholarships',
            'sas_view_insurance',
            'sas_view_organizations',
            'sas_view_activities',
            'sas_process_scholarships',
            'sas_process_insurance',

            // SAS Admin permissions (additional to staff permissions)
            'sas_manage_scholarships',
            'sas_manage_insurance',
            'sas_manage_organizations',
            'sas_manage_activities',
            'sas_manage_documents',
            'sas_approve_applications',
            'sas_reject_applications',
            'sas_view_analytics',
            'sas_manage_settings',
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Update cache to know about the newly created permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create roles and assign permissions exactly as specified in DRS.md
        $studentRole = Role::firstOrCreate(['name' => 'student']);
        $studentRole->syncPermissions([
            'submit_requests',
            'view_own_requests',
            'make_payments',
            'track_status',
        ]);

        $cashierRole = Role::firstOrCreate(['name' => 'cashier']);
        $cashierRole->syncPermissions([
            'view_pending_cash_payments',
            'confirm_cash_payments',
            'issue_official_receipts',
            'verify_payment_references',
        ]);

        $registrarStaffRole = Role::firstOrCreate(['name' => 'registrar-staff']);
        $registrarStaffRole->syncPermissions([
            'view_all_requests',
            'process_documents',
            'approve_requests',
            'reject_requests',
            'mark_ready_for_claim',
            'release_documents',
        ]);

        $registrarAdminRole = Role::firstOrCreate(['name' => 'registrar-admin']);
        $registrarAdminRole->syncPermissions([
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

        // Create SAS Staff role
        $sasStaffRole = Role::firstOrCreate(['name' => 'sas-staff']);
        $sasStaffRole->syncPermissions([
            'sas_view_dashboard',
            'sas_view_scholarships',
            'sas_view_insurance',
            'sas_view_organizations',
            'sas_view_activities',
            'sas_process_scholarships',
            'sas_process_insurance',
        ]);

        // Create SAS Admin role (has all staff permissions plus admin-specific ones)
        $sasAdminRole = Role::firstOrCreate(['name' => 'sas-admin']);
        $sasAdminRole->syncPermissions([
            // All staff permissions
            'sas_view_dashboard',
            'sas_view_scholarships',
            'sas_view_insurance',
            'sas_view_organizations',
            'sas_view_activities',
            'sas_process_scholarships',
            'sas_process_insurance',
            // Plus admin permissions
            'sas_manage_scholarships',
            'sas_manage_insurance',
            'sas_manage_organizations',
            'sas_manage_activities',
            'sas_manage_documents',
            'sas_approve_applications',
            'sas_reject_applications',
            'sas_view_analytics',
            'sas_manage_settings',
        ]);

        // Create Super Admin role (highest authority - can manage everything)
        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin']);
        $superAdminRole->syncPermissions([
            // All existing permissions for complete system access
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
            // SAS permissions
            'sas_view_dashboard',
            'sas_view_scholarships',
            'sas_view_insurance',
            'sas_view_organizations',
            'sas_view_activities',
            'sas_process_scholarships',
            'sas_process_insurance',
            'sas_manage_scholarships',
            'sas_manage_insurance',
            'sas_manage_organizations',
            'sas_manage_activities',
            'sas_manage_documents',
            'sas_approve_applications',
            'sas_reject_applications',
            'sas_view_analytics',
            'sas_manage_settings',
            // Plus super admin specific permissions
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
        ]);
    }
}
