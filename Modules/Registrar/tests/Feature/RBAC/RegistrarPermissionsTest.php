<?php

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

pest()->use(Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
});

test('registrar permissions are created correctly', function (string $permission) {
    expect(Permission::where('name', $permission)->exists())->toBeTrue();
})->with([
    'submit_requests', 'view_own_requests', 'make_payments', 'track_status',
    'view_pending_cash_payments', 'confirm_cash_payments', 'issue_official_receipts', 'verify_payment_references',
    'view_all_requests', 'process_documents', 'approve_requests', 'reject_requests', 'mark_ready_for_claim', 'release_documents',
    'manage_users', 'system_configuration',
]);

test('cashier role has correct permissions', function () {
    $cashierRole = Role::where('name', 'cashier')->first();
    expect($cashierRole)->not->toBeNull();

    $expectedPermissions = ['view_pending_cash_payments', 'confirm_cash_payments', 'issue_official_receipts', 'verify_payment_references'];
    $actualPermissions = $cashierRole->permissions->pluck('name')->toArray();

    expect($actualPermissions)->toEqual($expectedPermissions);
});

test('registrar-staff role has correct permissions', function () {
    $staffRole = Role::where('name', 'registrar-staff')->first();
    expect($staffRole)->not->toBeNull();

    $expectedPermissions = ['view_all_requests', 'process_documents', 'approve_requests', 'reject_requests', 'mark_ready_for_claim', 'release_documents'];
    $actualPermissions = $staffRole->permissions->pluck('name')->toArray();

    expect($actualPermissions)->toEqual($expectedPermissions);
});

test('registrar-admin role has correct permissions', function () {
    $adminRole = Role::where('name', 'registrar-admin')->first();
    expect($adminRole)->not->toBeNull();

    $expectedPermissions = [
        'view_all_requests', 'process_documents', 'approve_requests', 'reject_requests', 'mark_ready_for_claim', 'release_documents',
        'manage_users', 'system_configuration',
    ];
    $actualPermissions = $adminRole->permissions->pluck('name')->toArray();

    expect($actualPermissions)->toEqual($expectedPermissions);
});
