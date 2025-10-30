<?php

use App\Models\User;
use App\Modules\SAS\Models\Scholarship;
use App\Modules\SAS\Models\ScholarshipRecipient;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

beforeEach(function () {
    // Create admin user with proper permissions
    $this->admin = User::factory()->create();
    $this->admin->assignRole('admin');
});

describe('Scholarship Listing', function () {
    it('allows admin to view scholarships list', function () {
        actingAs($this->admin);

        Scholarship::factory()->count(3)->create();

        $response = get(route('sas.admin.scholarships.index'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/scholarships/index')
            ->has('scholarships')
        );
    });

    it('filters scholarships by type', function () {
        actingAs($this->admin);

        Scholarship::factory()->create(['scholarship_type' => 'TES']);
        Scholarship::factory()->create(['scholarship_type' => 'CHED Merit']);

        $response = get(route('sas.admin.scholarships.index', ['scholarship_type' => 'TES']));

        $response->assertSuccessful();
    });

    it('filters scholarships by active status', function () {
        actingAs($this->admin);

        Scholarship::factory()->active()->create();
        Scholarship::factory()->inactive()->create();

        $response = get(route('sas.admin.scholarships.index', ['is_active' => '1']));

        $response->assertSuccessful();
    });

    it('searches scholarships by name or code', function () {
        actingAs($this->admin);

        Scholarship::factory()->create([
            'scholarship_name' => 'Test Scholarship Program',
            'scholarship_code' => 'TEST-001',
        ]);

        $response = get(route('sas.admin.scholarships.index', ['search' => 'Test']));

        $response->assertSuccessful();
    });
});

describe('Scholarship Creation', function () {
    it('displays scholarship creation form', function () {
        actingAs($this->admin);

        $response = get(route('sas.admin.scholarships.create'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/scholarships/create')
        );
    });

    it('creates a new scholarship with valid data', function () {
        actingAs($this->admin);

        $scholarshipData = [
            'scholarship_name' => 'New Scholarship Program',
            'scholarship_code' => 'SCH-2025',
            'scholarship_type' => 'TES',
            'description' => 'Test scholarship description',
            'provider' => 'CHED',
        ];

        $response = post(route('sas.admin.scholarships.store'), $scholarshipData);

        $response->assertRedirect(route('sas.admin.scholarships.index'));
        $response->assertSessionHas('success', 'Scholarship created successfully.');

        assertDatabaseHas('scholarships', [
            'scholarship_name' => 'New Scholarship Program',
            'scholarship_code' => 'SCH-2025',
            'scholarship_type' => 'TES',
        ]);
    });

    it('validates required fields when creating scholarship', function () {
        actingAs($this->admin);

        $response = post(route('sas.admin.scholarships.store'), []);

        $response->assertSessionHasErrors(['scholarship_name', 'scholarship_code', 'scholarship_type']);
    });

    it('validates scholarship code uniqueness', function () {
        actingAs($this->admin);

        Scholarship::factory()->create(['scholarship_code' => 'EXISTING-001']);

        $response = post(route('sas.admin.scholarships.store'), [
            'scholarship_name' => 'Test Scholarship',
            'scholarship_code' => 'EXISTING-001',
            'scholarship_type' => 'TES',
        ]);

        $response->assertSessionHasErrors(['scholarship_code']);
    });

    it('validates scholarship type is from allowed values', function () {
        actingAs($this->admin);

        $response = post(route('sas.admin.scholarships.store'), [
            'scholarship_name' => 'Test Scholarship',
            'scholarship_code' => 'TEST-001',
            'scholarship_type' => 'Invalid Type',
        ]);

        $response->assertSessionHasErrors(['scholarship_type']);
    });
});

describe('Scholarship Viewing', function () {
    it('displays scholarship details', function () {
        actingAs($this->admin);

        $scholarship = Scholarship::factory()->create();

        $response = get(route('sas.admin.scholarships.show', $scholarship->id));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/scholarships/show')
            ->has('scholarship')
        );
    });

    it('returns 404 for non-existent scholarship', function () {
        actingAs($this->admin);

        $response = get(route('sas.admin.scholarships.show', 99999));

        $response->assertNotFound();
    });
});

describe('Scholarship Update', function () {
    it('displays scholarship edit form', function () {
        actingAs($this->admin);

        $scholarship = Scholarship::factory()->create();

        $response = get(route('sas.admin.scholarships.edit', $scholarship->id));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('sas/admin/scholarships/edit')
            ->has('scholarship')
        );
    });

    it('updates scholarship with valid data', function () {
        actingAs($this->admin);

        $scholarship = Scholarship::factory()->create([
            'scholarship_name' => 'Original Name',
        ]);

        $response = put(route('sas.admin.scholarships.update', $scholarship->id), [
            'scholarship_name' => 'Updated Name',
            'scholarship_code' => $scholarship->scholarship_code,
            'scholarship_type' => 'CHED Merit',
            'description' => 'Updated description',
            'provider' => 'MinSU',
        ]);

        $response->assertRedirect(route('sas.admin.scholarships.index'));
        $response->assertSessionHas('success', 'Scholarship updated successfully.');

        assertDatabaseHas('scholarships', [
            'id' => $scholarship->id,
            'scholarship_name' => 'Updated Name',
            'scholarship_type' => 'CHED Merit',
        ]);
    });

    it('validates required fields when updating scholarship', function () {
        actingAs($this->admin);

        $scholarship = Scholarship::factory()->create();

        $response = put(route('sas.admin.scholarships.update', $scholarship->id), [
            'scholarship_name' => '',
            'scholarship_code' => '',
        ]);

        $response->assertSessionHasErrors(['scholarship_name', 'scholarship_code']);
    });
});

describe('Scholarship Deletion', function () {
    it('deletes scholarship successfully', function () {
        actingAs($this->admin);

        $scholarship = Scholarship::factory()->create();

        $response = delete(route('sas.admin.scholarships.destroy', $scholarship->id));

        $response->assertRedirect(route('sas.admin.scholarships.index'));
        $response->assertSessionHas('success', 'Scholarship deleted successfully.');

        assertDatabaseMissing('scholarships', ['id' => $scholarship->id]);
    });

    it('returns 404 when deleting non-existent scholarship', function () {
        actingAs($this->admin);

        $response = delete(route('sas.admin.scholarships.destroy', 99999));

        $response->assertNotFound();
    });
});

describe('Scholarship Recipients', function () {
    it('loads scholarship with recipients relationship', function () {
        $scholarship = Scholarship::factory()->create();
        ScholarshipRecipient::factory()->count(3)->create([
            'scholarship_id' => $scholarship->id,
        ]);

        $loadedScholarship = Scholarship::with('recipients')->find($scholarship->id);

        expect($loadedScholarship->recipients)->toHaveCount(3);
    });

    it('can filter active scholarships', function () {
        Scholarship::factory()->active()->count(5)->create();
        Scholarship::factory()->inactive()->count(3)->create();

        $activeScholarships = Scholarship::active()->get();

        expect($activeScholarships)->toHaveCount(5);
        expect($activeScholarships->every(fn ($s) => $s->is_active))->toBeTrue();
    });
});
