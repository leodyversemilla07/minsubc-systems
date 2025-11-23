<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

pest()->use(Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
    $this->seed(\Database\Seeders\UserSeeder::class);
});

test('rbac roles are created correctly', function (string $role) {
    expect(Role::where('name', $role)->exists())->toBeTrue();
})->with([
    'student', 'cashier', 'registrar-staff', 'registrar-admin', 'usg-admin', 'usg-officer', 'super-admin',
]);

test('student role has correct permissions', function () {
    $studentRole = Role::where('name', 'student')->first();
    expect($studentRole)->not->toBeNull();

    $expectedPermissions = ['submit_requests', 'view_own_requests', 'make_payments', 'track_status'];
    $actualPermissions = $studentRole->permissions->pluck('name')->toArray();

    expect($actualPermissions)->toEqual($expectedPermissions);
});

test('super admin role has all permissions', function () {
    $adminRole = Role::where('name', 'super-admin')->first();
    expect($adminRole)->not->toBeNull();

    // Super admin should have all permissions
    expect($adminRole->permissions()->count())->toBeGreaterThan(40);
});

test('users have correct roles assigned', function () {
    $student = User::where('email', 'john.doe@minsu.edu.ph')->first();
    expect($student)->not->toBeNull();
    expect($student->hasRole('student'))->toBeTrue();

    $admin = User::where('email', 'superadmin@minsu.edu.ph')->first();
    expect($admin)->not->toBeNull();
    expect($admin->hasRole('super-admin'))->toBeTrue();
});

test('permission checks work correctly', function () {
    $student = User::where('email', 'john.doe@minsu.edu.ph')->first();
    expect($student->can('submit_requests'))->toBeTrue();
    expect($student->can('manage_users'))->toBeFalse();

    $admin = User::where('email', 'superadmin@minsu.edu.ph')->first();
    expect($admin->can('manage_users'))->toBeTrue();
    expect($admin->can('super_admin_access'))->toBeTrue();
});

test('cache functionality works', function () {
    // Clear cache
    app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

    // Test still works after cache clear
    $admin = User::where('email', 'superadmin@minsu.edu.ph')->first();
    expect($admin->can('super_admin_access'))->toBeTrue();
});
