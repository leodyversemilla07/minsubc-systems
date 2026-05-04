<?php

namespace Modules\Admission\Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdmissionPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'admission_view_dashboard',
            'admission_view_applications',
            'admission_process_applications',
            'admission_evaluate_applications',
            'admission_approve_applications',
            'admission_reject_applications',
            'admission_manage_enrollments',
            'admission_manage_programs',
            'admission_view_reports',
            'admission_manage_requirements',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $staffRole = Role::firstOrCreate(['name' => 'admission-staff']);
        $staffRole->givePermissionTo([
            'admission_view_dashboard',
            'admission_view_applications',
            'admission_process_applications',
        ]);

        $adminRole = Role::firstOrCreate(['name' => 'admission-admin']);
        $adminRole->givePermissionTo($permissions);

        $superAdminRole = Role::where('name', 'super-admin')->first();
        if ($superAdminRole) {
            $superAdminRole->givePermissionTo($permissions);
        }

        $this->command->info('✓ Admission module permissions created successfully!');
    }
}
