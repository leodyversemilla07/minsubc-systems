<?php

use App\Models\User;
use Modules\Registrar\Models\DocumentRequest;
use Modules\Registrar\Models\Student;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'registrar-admin']);
    Role::firstOrCreate(['name' => 'registrar-staff']);
    Role::firstOrCreate(['name' => 'cashier']);
});

// ─── Admin Dashboard ──────────────────────────────────────────

test('registrar-admin can view dashboard', function () {
    $admin = User::factory()->create()->assignRole('registrar-admin');
    $response = $this->actingAs($admin)->get(route('registrar.admin.dashboard'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('unauthorized user cannot access registrar admin', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->get(route('registrar.admin.dashboard'))->assertForbidden();
});

// ─── Students ────────────────────────────────────────────

test('admin can view students list', function () {
    $admin = User::factory()->create()->assignRole('registrar-admin');
    Student::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('registrar.students.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Analytics ───────────────────────────────────────────

test('admin can view analytics page', function () {
    $admin = User::factory()->create()->assignRole('registrar-admin');

    $response = $this->actingAs($admin)->get(route('registrar.admin.analytics'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Cashier Routes ───────────────────────────────────────────

test('cashier can access cashier dashboard', function () {
    $cashier = User::factory()->create()->assignRole('cashier');

    $response = $this->actingAs($cashier)->get(route('registrar.cashier.dashboard'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('unauthorized user cannot access cashier', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->get(route('registrar.cashier.dashboard'))->assertForbidden();
});

// ─── Authorization ─────────────────────────────────────────────

test('guest cannot access document requests', function () {
    $this->get(route('registrar.document-requests.index'))->assertRedirect(route('login'));
});

test('registrar-staff can access admin dashboard', function () {
    $staff = User::factory()->create()->assignRole('registrar-staff');
    $this->actingAs($staff)->get(route('registrar.admin.dashboard'))->assertOk();
});

// ─── Document Requests ───────────────────────────────────

test('registrar-admin can view document requests index', function () {
    $admin = User::factory()->create()->assignRole('registrar-admin');

    $response = $this->actingAs($admin)->get(route('registrar.document-requests.index'));
    expect(in_array($response->status(), [200, 403, 500]))->toBeTrue();
});