<?php

namespace Modules\Registrar\Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RegistrarPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions for Registrar Module
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
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Cashier role
        $cashierRole = Role::firstOrCreate(['name' => 'cashier']);
        $cashierRole->givePermissionTo([
            'view_pending_cash_payments',
            'confirm_cash_payments',
            'issue_official_receipts',
            'verify_payment_references',
        ]);

        // Create Registrar Staff role
        $registrarStaffRole = Role::firstOrCreate(['name' => 'registrar-staff']);
        $registrarStaffRole->givePermissionTo([
            'view_all_requests',
            'process_documents',
            'approve_requests',
            'reject_requests',
            'mark_ready_for_claim',
            'release_documents',
        ]);

        // Create Registrar Admin role (has all staff permissions plus admin-specific ones)
        $registrarAdminRole = Role::firstOrCreate(['name' => 'registrar-admin']);
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

        // If Super Admin role exists, give it all registrar permissions
        $superAdminRole = Role::where('name', 'super-admin')->first();
        if ($superAdminRole) {
            $superAdminRole->givePermissionTo($permissions);
        }

        $this->command->info('✓ Registrar module permissions created successfully!');
    }
}
