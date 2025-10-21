<?php

use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

pest()->use(Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
    $this->seed(\Database\Seeders\UserSeeder::class);
});

test('rbac roles are created correctly', function (string $role) {
    expect(Role::where('name', $role)->exists())->toBeTrue();
})->with([
    'student', 'cashier', 'registrar-staff', 'registrar-admin', 'system-admin',
]);

test('rbac permissions are created correctly', function (string $permission) {
    expect(Permission::where('name', $permission)->exists())->toBeTrue();
})->with([
    'submit_requests', 'view_own_requests', 'make_payments', 'track_status',
    'view_pending_cash_payments', 'confirm_cash_payments', 'issue_official_receipts', 'verify_payment_references',
    'view_all_requests', 'process_documents', 'approve_requests', 'reject_requests', 'mark_ready_for_claim', 'release_documents',
    'manage_users', 'system_configuration', 'full_system_access', 'database_management', 'view_reports', 'manage_system_settings',
]);

test('student role has correct permissions', function () {
    $studentRole = Role::where('name', 'student')->first();
    expect($studentRole)->not->toBeNull();

    $expectedPermissions = ['submit_requests', 'view_own_requests', 'make_payments', 'track_status'];
    $actualPermissions = $studentRole->permissions->pluck('name')->toArray();

    expect($actualPermissions)->toEqual($expectedPermissions);
});

test('system admin role has all permissions', function () {
    $adminRole = Role::where('name', 'system-admin')->first();
    expect($adminRole)->not->toBeNull();

    // System admin should have all 41 permissions (20 registrar + 21 USG permissions)
    expect($adminRole->permissions()->count())->toBe(41);
});

test('users have correct roles assigned', function () {
    $student = User::where('email', 'john.doe@minsu.edu.ph')->first();
    expect($student)->not->toBeNull();
    expect($student->hasRole('student'))->toBeTrue();

    $admin = User::where('email', 'admin@minsu.edu.ph')->first();
    expect($admin)->not->toBeNull();
    expect($admin->hasRole('system-admin'))->toBeTrue();
});

test('permission checks work correctly', function () {
    $student = User::where('email', 'john.doe@minsu.edu.ph')->first();
    expect($student->can('submit_requests'))->toBeTrue();
    expect($student->can('manage_users'))->toBeFalse();

    $admin = User::where('email', 'admin@minsu.edu.ph')->first();
    expect($admin->can('manage_users'))->toBeTrue();
    expect($admin->can('full_system_access'))->toBeTrue();
});

test('cache functionality works', function () {
    // Clear cache
    app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

    // Test still works after cache clear
    $admin = User::where('email', 'admin@minsu.edu.ph')->first();
    expect($admin->can('full_system_access'))->toBeTrue();
});
