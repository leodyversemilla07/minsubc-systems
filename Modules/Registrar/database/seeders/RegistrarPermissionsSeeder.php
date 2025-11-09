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
            'registrar.submit_requests',
            'registrar.view_own_requests',
            'registrar.make_payments',
            'registrar.track_status',

            // Cashier permissions (from DRS.md: "View pending cash payments, confirm cash payments, issue OR")
            'registrar.view_pending_cash_payments',
            'registrar.confirm_cash_payments',
            'registrar.issue_official_receipts',
            'registrar.verify_payment_references', // For PRN verification

            // Registrar Staff permissions (from DRS.md: "View all requests, process documents, approve/reject, mark ready for claim")
            'registrar.view_all_requests',
            'registrar.process_documents',
            'registrar.approve_requests',
            'registrar.reject_requests',
            'registrar.mark_ready_for_claim',
            'registrar.release_documents', // For final document release

            // Registrar Admin permissions (from DRS.md: "All staff permissions + user management, system configuration")
            'registrar.manage_users',
            'registrar.system_configuration',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Cashier role
        $cashierRole = Role::firstOrCreate(['name' => 'cashier']);
        $cashierRole->givePermissionTo([
            'registrar.view_pending_cash_payments',
            'registrar.confirm_cash_payments',
            'registrar.issue_official_receipts',
            'registrar.verify_payment_references',
        ]);

        // Create Registrar Staff role
        $registrarStaffRole = Role::firstOrCreate(['name' => 'registrar-staff']);
        $registrarStaffRole->givePermissionTo([
            'registrar.view_all_requests',
            'registrar.process_documents',
            'registrar.approve_requests',
            'registrar.reject_requests',
            'registrar.mark_ready_for_claim',
            'registrar.release_documents',
        ]);

        // Create Registrar Admin role (has all staff permissions plus admin-specific ones)
        $registrarAdminRole = Role::firstOrCreate(['name' => 'registrar-admin']);
        $registrarAdminRole->givePermissionTo([
            // All staff permissions
            'registrar.view_all_requests',
            'registrar.process_documents',
            'registrar.approve_requests',
            'registrar.reject_requests',
            'registrar.mark_ready_for_claim',
            'registrar.release_documents',
            // Plus admin permissions
            'registrar.manage_users',
            'registrar.system_configuration',
        ]);

        // If Super Admin role exists, give it all registrar permissions
        $superAdminRole = Role::where('name', 'super-admin')->first();
        if ($superAdminRole) {
            $superAdminRole->givePermissionTo($permissions);
        }

        $this->command->info('✓ Registrar module permissions created successfully!');
    }
}
