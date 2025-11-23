<?php

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

pest()->use(Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
});

test('usg permissions are created correctly', function (string $permission) {
    expect(Permission::where('name', $permission)->exists())->toBeTrue();
})->with([
    'view_dashboard', 'create_announcements', 'edit_announcements', 'delete_announcements', 'publish_announcements',
    'create_events', 'edit_events', 'delete_events', 'publish_events',
    'create_resolutions', 'edit_resolutions', 'delete_resolutions', 'submit_resolutions',
    'manage_vmgo', 'manage_officers', 'approve_resolutions', 'reject_resolutions',
    'manage_documents', 'archive_content', 'view_analytics', 'manage_settings',
]);

test('usg-officer role has correct permissions', function () {
    $officerRole = Role::where('name', 'usg-officer')->first();
    expect($officerRole)->not->toBeNull();

    $expectedPermissions = [
        'view_dashboard', 'create_announcements', 'edit_announcements', 'delete_announcements', 'publish_announcements',
        'create_events', 'edit_events', 'delete_events', 'publish_events',
        'create_resolutions', 'edit_resolutions', 'delete_resolutions', 'submit_resolutions',
    ];
    $actualPermissions = $officerRole->permissions->pluck('name')->toArray();

    expect($actualPermissions)->toEqual($expectedPermissions);
});

test('usg-admin role has correct permissions', function () {
    $adminRole = Role::where('name', 'usg-admin')->first();
    expect($adminRole)->not->toBeNull();

    $expectedPermissions = [
        'view_dashboard', 'create_announcements', 'edit_announcements', 'delete_announcements', 'publish_announcements',
        'create_events', 'edit_events', 'delete_events', 'publish_events',
        'create_resolutions', 'edit_resolutions', 'delete_resolutions', 'submit_resolutions',
        'manage_vmgo', 'manage_officers', 'approve_resolutions', 'reject_resolutions',
        'manage_documents', 'archive_content', 'view_analytics', 'manage_settings',
    ];
    $actualPermissions = $adminRole->permissions->pluck('name')->toArray();

    expect($actualPermissions)->toEqual($expectedPermissions);
});
