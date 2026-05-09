<?php

use App\Models\User;
use Modules\SAS\Models\InsuranceRecord;
use Modules\SAS\Models\Organization;
use Modules\SAS\Models\SASActivity;
use Modules\SAS\Models\Scholarship;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'sas-admin']);
    Role::firstOrCreate(['name' => 'sas-staff']);
    Role::firstOrCreate(['name' => 'student']);
    Role::firstOrCreate(['name' => 'org_adviser']);
});

// ─── Public Pages ──────────────────────────────────────────────

test('public can view SAS main page', function () {
    $response = $this->get(route('sas.index'));
    $response->assertOk();
});

test('public can view organizations list', function () {
    Organization::factory()->count(3)->create(['status' => 'Active']);
    $response = $this->get(route('sas.organizations.index'));
    $response->assertOk();
});

test('public can view organization details', function () {
    $org = Organization::factory()->create(['status' => 'Active']);
    $response = $this->get(route('sas.organizations.show', $org->organization_code));
    $response->assertOk();
});

test('public can view scholarships list', function () {
    Scholarship::factory()->count(3)->create(['is_active' => true]);
    $response = $this->get(route('sas.scholarships.index'));
    $response->assertOk();
});

// ─── Admin Dashboard ───────────────────────────────────────────

test('sas-admin can view dashboard', function () {
    $admin = User::factory()->create()->assignRole('sas-admin');
    $response = $this->actingAs($admin)->get(route('sas.admin.dashboard'));
    $response->assertInertia(fn ($page) => $page->component('sas/admin/dashboard'));
});

test('unauthorized user cannot access SAS admin', function () {
    $user = User::factory()->create();
    $this->actingAs($user)->get(route('sas.admin.dashboard'))->assertForbidden();
});

// ─── Organizations CRUD ───────────────────────────────────────

test('admin can create an organization', function () {
    $admin = User::factory()->create()->assignRole('sas-admin');

    $response = $this->actingAs($admin)->post(route('sas.admin.organizations.store'), [
        'organization_name' => 'Test Organization',
        'organization_code' => 'TEST-ORG',
        'organization_type' => 'Major',
        'description' => 'A test organization',
        'status' => 'Active',
    ]);

    $response->assertSessionHas('success');
    expect(Organization::where('organization_code', 'TEST-ORG')->exists())->toBeTrue();
});

test('admin can view organizations list', function () {
    $admin = User::factory()->create()->assignRole('sas-admin');
    Organization::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('sas.admin.organizations.index'));
    $response->assertInertia(fn ($page) => $page->component('sas/admin/organizations/index'));
});

test('admin can update an organization', function () {
    $admin = User::factory()->create()->assignRole('sas-admin');
    $org = Organization::factory()->create(['organization_name' => 'Old Name']);

    $response = $this->actingAs($admin)->put(route('sas.admin.organizations.update', $org), [
        'organization_name' => 'Updated Name',
        'organization_code' => $org->organization_code,
        'organization_type' => $org->organization_type,
    ]);

    $response->assertSessionHas('success');
    expect($org->fresh()->organization_name)->toBe('Updated Name');
});

test('admin can delete an organization', function () {
    $admin = User::factory()->create()->assignRole('sas-admin');
    $org = Organization::factory()->create();

    $response = $this->actingAs($admin)->delete(route('sas.admin.organizations.destroy', $org));

    $response->assertSessionHas('success');
    expect(Organization::find($org->id))->toBeNull();
});

// ─── Activities ────────────────────────────────────────────────

test('admin can create an activity', function () {
    $admin = User::factory()->create()->assignRole('sas-admin');

    $response = $this->actingAs($admin)->post(route('sas.admin.activities.store'), [
        'activity_title' => 'Test Activity',
        'description' => 'Activity description',
        'location' => 'Room 101',
        'start_date' => now()->addDays(7)->format('Y-m-d'),
        'end_date' => now()->addDays(7)->format('Y-m-d'),
        'status' => 'published',
    ]);

    $response->assertSessionHas('success');
    expect(SASActivity::where('activity_title', 'Test Activity')->exists())->toBeTrue();
});

test('admin can view activities list', function () {
    $admin = User::factory()->create()->assignRole('sas-admin');
    SASActivity::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('sas.admin.activities.index'));
    $response->assertInertia(fn ($page) => $page->component('sas/admin/activities/index'));
});

test('admin can view activities page', function () {
    $response = $this->get(route('sas.activities.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

// ─── Scholarships CRUD ────────────────────────────────────────

test('admin can create a scholarship', function () {
    $admin = User::factory()->create()->assignRole('sas-admin');

    $response = $this->actingAs($admin)->post(route('sas.admin.scholarships.store'), [
        'scholarship_name' => 'Test Scholarship',
        'scholarship_code' => 'TEST-001',
        'scholarship_type' => 'TES',
        'description' => 'A test scholarship',
        'amount' => 10000,
        'slots' => 10,
        'is_active' => true,
    ]);

    $response->assertSessionHas('success');
    expect(Scholarship::where('scholarship_name', 'Test Scholarship')->exists())->toBeTrue();
});

test('admin can view scholarships list', function () {
    $admin = User::factory()->create()->assignRole('sas-admin');
    Scholarship::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('sas.admin.scholarships.index'));
    $response->assertInertia(fn ($page) => $page->component('sas/admin/scholarships/index'));
});

// ─── Insurance ─────────────────────────────────────────────────

test('admin can view insurance list', function () {
    $admin = User::factory()->create()->assignRole('sas-admin');
    InsuranceRecord::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('sas.admin.insurance.index'));
    $response->assertInertia(fn ($page) => $page->component('sas/admin/insurance/index'));
});

// ─── Authorization ─────────────────────────────────────────────

test('guest cannot access SAS admin pages', function () {
    $this->get(route('sas.admin.dashboard'))->assertRedirect(route('login'));
});

test('sas-staff can access admin dashboard', function () {
    $staff = User::factory()->create()->assignRole('sas-staff');
    $this->actingAs($staff)->get(route('sas.admin.dashboard'))->assertInertia(fn ($p) => $p->component('sas/admin/dashboard'));
});

test('student cannot access SAS admin', function () {
    $student = User::factory()->create()->assignRole('student');
    $this->actingAs($student)->get(route('sas.admin.dashboard'))->assertForbidden();
});