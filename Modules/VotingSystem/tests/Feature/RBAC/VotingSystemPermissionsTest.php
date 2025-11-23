<?php

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

pest()->use(Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
});

test('voting system permissions are created correctly', function (string $permission) {
    expect(Permission::where('name', $permission)->exists())->toBeTrue();
})->with([
    'elections.view', 'elections.create', 'elections.edit', 'elections.delete', 'elections.toggle-status',
    'candidates.view', 'candidates.create', 'candidates.edit', 'candidates.delete',
    'positions.view', 'positions.create', 'positions.edit', 'positions.delete', 'positions.reorder',
    'partylists.view', 'partylists.create', 'partylists.edit', 'partylists.delete',
    'voters.view', 'voters.create', 'voters.edit', 'voters.delete', 'voters.reset-password', 'voters.reset-vote', 'voters.export',
    'activity-logs.view', 'feedback.view',
]);

test('voting-admin role has correct permissions', function () {
    $adminRole = Role::where('name', 'voting-admin')->first();
    expect($adminRole)->not->toBeNull();

    $expectedPermissions = [
        'elections.view', 'elections.create', 'elections.edit', 'elections.delete', 'elections.toggle-status',
        'candidates.view', 'candidates.create', 'candidates.edit', 'candidates.delete',
        'positions.view', 'positions.create', 'positions.edit', 'positions.delete', 'positions.reorder',
        'partylists.view', 'partylists.create', 'partylists.edit', 'partylists.delete',
        'voters.view', 'voters.create', 'voters.edit', 'voters.delete', 'voters.reset-password', 'voters.reset-vote', 'voters.export',
        'activity-logs.view', 'feedback.view',
    ];
    $actualPermissions = $adminRole->permissions->pluck('name')->toArray();

    expect($actualPermissions)->toEqual($expectedPermissions);
});

test('voting-manager role has correct permissions', function () {
    $managerRole = Role::where('name', 'voting-manager')->first();
    expect($managerRole)->not->toBeNull();

    $expectedPermissions = [
        'elections.view', 'candidates.view', 'positions.view', 'partylists.view', 'voters.view', 'activity-logs.view', 'feedback.view',
    ];
    $actualPermissions = $managerRole->permissions->pluck('name')->toArray();

    expect($actualPermissions)->toEqual($expectedPermissions);
});
