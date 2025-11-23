<?php

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

pest()->use(Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
});

test('sas permissions are created correctly', function (string $permission) {
    expect(Permission::where('name', $permission)->exists())->toBeTrue();
})->with([
    'view_dashboard', 'view_scholarships', 'view_insurance', 'view_organizations', 'view_activities',
    'process_scholarships', 'process_insurance',
    'manage_scholarships', 'manage_insurance', 'manage_organizations', 'manage_activities',
    'manage_documents', 'approve_applications', 'reject_applications', 'view_analytics', 'manage_settings',
]);

test('sas-staff role has correct permissions', function () {
    $staffRole = Role::where('name', 'sas-staff')->first();
    expect($staffRole)->not->toBeNull();

    $expectedPermissions = [
        'view_dashboard', 'view_scholarships', 'view_insurance', 'view_organizations', 'view_activities',
        'process_scholarships', 'process_insurance',
    ];
    $actualPermissions = $staffRole->permissions->pluck('name')->toArray();

    expect($actualPermissions)->toEqual($expectedPermissions);
});

test('sas-admin role has correct permissions', function () {
    $adminRole = Role::where('name', 'sas-admin')->first();
    expect($adminRole)->not->toBeNull();

    $expectedPermissions = [
        'view_dashboard', 'view_scholarships', 'view_insurance', 'view_organizations', 'view_activities',
        'process_scholarships', 'process_insurance',
        'manage_scholarships', 'manage_insurance', 'manage_organizations', 'manage_activities',
        'manage_documents', 'approve_applications', 'reject_applications', 'view_analytics', 'manage_settings',
    ];
    $actualPermissions = $adminRole->permissions->pluck('name')->toArray();

    expect($actualPermissions)->toEqual($expectedPermissions);
});
