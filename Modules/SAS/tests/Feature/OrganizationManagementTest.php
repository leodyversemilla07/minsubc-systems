<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Modules\SAS\Models\Organization;
use Modules\SAS\Models\OrganizationMember;
use Modules\SAS\Models\OrganizationOfficer;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

beforeEach(function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $this->admin = User::factory()->create();
    $this->admin->assignRole('sas-admin');

    $this->adviser = User::factory()->create();
    $this->adviser->assignRole('org_adviser');
});

describe('Public Organization Viewing', function () {
    it('displays list of active organizations', function () {
        Organization::factory()->count(5)->create(['status' => 'Active']);
        Organization::factory()->count(2)->create(['status' => 'Inactive']);

        $response = get(route('sas.organizations.index'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/organizations/index')
            ->has('organizations')
        );
    });

    it('filters organizations by type', function () {
        Organization::factory()->create(['organization_type' => 'Major', 'status' => 'Active']);
        Organization::factory()->create(['organization_type' => 'Minor', 'status' => 'Active']);

        $response = get(route('sas.organizations.index', ['type' => 'Major']));

        $response->assertSuccessful();
    });

    it('searches organizations by name or code', function () {
        Organization::factory()->create([
            'organization_name' => 'Computer Science Society',
            'organization_code' => 'CSS-2025',
            'status' => 'Active',
        ]);

        $response = get(route('sas.organizations.index', ['search' => 'Computer']));

        $response->assertSuccessful();
    });

    it('displays organization profile with details', function () {
        $organization = Organization::factory()->create([
            'organization_code' => 'TEST-ORG',
            'status' => 'Active',
        ]);

        OrganizationOfficer::factory()->count(3)->create([
            'organization_id' => $organization->id,
        ]);

        $response = get(route('sas.organizations.show', $organization->organization_code));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/organizations/show')
            ->has('organization')
        );
    });

    it('returns 404 for inactive organization', function () {
        $organization = Organization::factory()->create(['status' => 'Inactive']);

        $response = get(route('sas.organizations.show', $organization->organization_code));

        $response->assertNotFound();
    });
});

describe('Admin Organization Management', function () {
    it('allows admin to view all organizations', function () {
        actingAs($this->admin);

        Organization::factory()->count(5)->create();

        $response = get(route('sas.admin.organizations.index'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/organizations/index')
            ->has('organizations')
        );
    });

    it('allows admin to create organization', function () {
        actingAs($this->admin);

        $orgData = [
            'organization_name' => 'Test Organization',
            'organization_code' => 'TEST-001',
            'organization_type' => 'Major',
            'category' => 'Academic',
            'mission' => 'Test mission',
            'vision' => 'Test vision',
            'establishment_date' => now()->format('Y-m-d'),
            'status' => 'Active',
            'adviser_id' => $this->adviser->id,
            'contact_email' => 'test@minsu.edu.ph',
        ];

        $response = post(route('sas.admin.organizations.store'), $orgData);

        $response->assertRedirect(route('sas.admin.organizations.index'));

        assertDatabaseHas('organizations', [
            'organization_code' => 'TEST-001',
            'organization_name' => 'Test Organization',
        ]);
    });

    it('validates required fields when creating organization', function () {
        actingAs($this->admin);

        $response = post(route('sas.admin.organizations.store'), []);

        $response->assertSessionHasErrors([
            'organization_name',
            'organization_code',
            'organization_type',
        ]);
    });

    it('allows admin to update organization', function () {
        actingAs($this->admin);

        $organization = Organization::factory()->create([
            'organization_name' => 'Original Name',
        ]);

        $response = put(route('sas.admin.organizations.update', $organization->id), [
            'organization_name' => 'Updated Name',
            'organization_code' => $organization->organization_code,
            'organization_type' => 'Major',
            'category' => 'Academic',
            'status' => 'Active',
        ]);

        $response->assertRedirect(route('sas.admin.organizations.index'));

        assertDatabaseHas('organizations', [
            'id' => $organization->id,
            'organization_name' => 'Updated Name',
        ]);
    });

    it('allows admin to delete organization', function () {
        actingAs($this->admin);

        $organization = Organization::factory()->create();

        $response = delete(route('sas.admin.organizations.destroy', $organization->id));

        $response->assertRedirect(route('sas.admin.organizations.index'));
    });
});

describe('Adviser Organization Management', function () {
    it('allows adviser to view their organization dashboard', function () {
        actingAs($this->adviser);

        Organization::factory()->create(['adviser_id' => $this->adviser->id]);

        $response = get(route('sas.adviser.organization.dashboard'));

        $response->assertSuccessful();
    });

    it('allows adviser to update their organization', function () {
        actingAs($this->adviser);

        $organization = Organization::factory()->create(['adviser_id' => $this->adviser->id]);

        $response = put(route('sas.adviser.organization.update'), [
            'mission' => 'Updated mission statement',
            'vision' => 'Updated vision statement',
            'contact_email' => 'updated@minsu.edu.ph',
            'contact_phone' => '09123456789',
        ]);

        $response->assertRedirect();

        assertDatabaseHas('organizations', [
            'id' => $organization->id,
            'mission' => 'Updated mission statement',
        ]);
    });

    it('allows adviser to manage officers', function () {
        actingAs($this->adviser);

        $organization = Organization::factory()->create(['adviser_id' => $this->adviser->id]);

        $response = post(route('sas.adviser.organization.store-officer'), [
            'organization_id' => $organization->id,
            'student_id' => User::factory()->create()->id,
            'position' => 'President',
            'term_start' => now()->format('Y-m-d'),
            'term_end' => now()->addYear()->format('Y-m-d'),
            'is_current' => true,
        ]);

        $response->assertRedirect();

        assertDatabaseHas('organization_officers', [
            'organization_id' => $organization->id,
            'position' => 'President',
        ]);
    });
});

describe('Organization Model Scopes and Relationships', function () {
    it('filters active organizations', function () {
        Organization::factory()->count(3)->create(['status' => 'Active']);
        Organization::factory()->count(2)->create(['status' => 'Inactive']);

        $active = Organization::active()->get();

        expect($active)->toHaveCount(3);
    });

    it('filters organizations by type', function () {
        Organization::factory()->count(4)->create(['organization_type' => 'Major']);
        Organization::factory()->count(2)->create(['organization_type' => 'Minor']);

        $major = Organization::major()->get();

        expect($major)->toHaveCount(4);
    });

    it('loads organization with relationships', function () {
        $organization = Organization::factory()->create();
        OrganizationOfficer::factory()->count(5)->create(['organization_id' => $organization->id]);
        OrganizationMember::factory()->count(10)->create(['organization_id' => $organization->id]);

        $loaded = Organization::with(['officers', 'members'])->find($organization->id);

        expect($loaded->officers)->toHaveCount(5);
        expect($loaded->members)->toHaveCount(10);
    });

    it('filters current officers', function () {
        $organization = Organization::factory()->create();
        OrganizationOfficer::factory()->count(3)->create([
            'organization_id' => $organization->id,
            'is_current' => true,
        ]);
        OrganizationOfficer::factory()->count(2)->create([
            'organization_id' => $organization->id,
            'is_current' => false,
        ]);

        $currentOfficers = $organization->currentOfficers;

        expect($currentOfficers)->toHaveCount(3);
    });
});
