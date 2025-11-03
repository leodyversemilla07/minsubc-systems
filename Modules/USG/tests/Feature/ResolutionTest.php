<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Modules\USG\Models\Resolution;

uses(RefreshDatabase::class);

// Resolution Listing & Index Tests
test('usg-admin can view resolutions index', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    Resolution::factory()->count(5)->create(['submitted_by' => $usgAdmin->id]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.resolutions.index'));

    $response->assertSuccessful();
    $response->assertInertia(
        fn ($page) => $page
            ->component('usg/admin/resolutions/index')
            ->has('resolutions')
            ->has('categories')
            ->has('statistics')
    );
});

test('non-usg-admin cannot access resolutions admin index', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $student = User::factory()->create();
    $student->assignRole('student');

    $response = $this->actingAs($student)
        ->get(route('usg.admin.resolutions.index'));

    $response->assertForbidden();
});

test('resolutions can be filtered by search', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    Resolution::factory()->create([
        'title' => 'Student Welfare Resolution',
        'submitted_by' => $usgAdmin->id,
    ]);
    Resolution::factory()->create([
        'title' => 'Academic Policy Resolution',
        'submitted_by' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.resolutions.index', ['search' => 'Student Welfare']));

    $response->assertSuccessful();
});

test('resolutions can be filtered by category', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    Resolution::factory()->create([
        'category' => 'Academic',
        'submitted_by' => $usgAdmin->id,
    ]);
    Resolution::factory()->create([
        'category' => 'Finance',
        'submitted_by' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.resolutions.index', ['category' => 'Academic']));

    $response->assertSuccessful();
});

// Resolution Creation Tests
test('usg-admin can view resolution create form', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.resolutions.create'));

    $response->assertSuccessful();
    $response->assertInertia(
        fn ($page) => $page
            ->component('usg/admin/resolutions/create')
            ->has('categories')
    );
});

test('resolution can be created with valid data', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $resolutionData = [
        'title' => 'New USG Resolution',
        'resolution_number' => 'RES-2025-001',
        'description' => 'This is a test resolution',
        'content' => 'Full content of the resolution',
        'category' => 'Academic',
        'resolution_date' => now()->format('Y-m-d'),
    ];

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.resolutions.store'), $resolutionData);

    $response->assertRedirect(route('usg.admin.resolutions.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('resolutions', [
        'title' => 'New USG Resolution',
        'submitted_by' => $usgAdmin->id,
        'status' => 'draft',
    ]);
});

test('resolution creation validates required fields', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.resolutions.store'), []);

    $response->assertSessionHasErrors(['title', 'content', 'resolution_date']);
});

test('resolution can be created with file attachment', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    Storage::fake('public');

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $resolutionData = [
        'title' => 'Resolution with File',
        'content' => 'Test content',
        'resolution_date' => now()->format('Y-m-d'),
        'file_path' => UploadedFile::fake()->create('resolution.pdf', 1000),
    ];

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.resolutions.store'), $resolutionData);

    $response->assertRedirect(route('usg.admin.resolutions.index'));

    $resolution = Resolution::where('title', 'Resolution with File')->first();
    expect($resolution->file_path)->not->toBeNull();
});

// Resolution Viewing Tests
test('usg-admin can view resolution edit form', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $resolution = Resolution::factory()->create(['submitted_by' => $usgAdmin->id]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.resolutions.edit', $resolution->id));

    $response->assertSuccessful();
    $response->assertInertia(
        fn ($page) => $page
            ->component('usg/admin/resolutions/edit')
            ->has('resolution')
            ->has('categories')
    );
});

// Resolution Update Tests
test('resolution can be updated with valid data', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $resolution = Resolution::factory()->create([
        'submitted_by' => $usgAdmin->id,
        'title' => 'Original Title',
    ]);

    $updateData = [
        'title' => 'Updated Resolution Title',
        'description' => 'Updated description',
        'content' => 'Updated content',
        'category' => 'Finance',
        'resolution_date' => now()->format('Y-m-d'),
    ];

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.resolutions.update', $resolution->id), $updateData);

    $response->assertRedirect(route('usg.admin.resolutions.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('resolutions', [
        'id' => $resolution->id,
        'title' => 'Updated Resolution Title',
    ]);
});

// Resolution Deletion Tests
test('usg-admin can delete resolution', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $resolution = Resolution::factory()->create(['submitted_by' => $usgAdmin->id]);

    $response = $this->actingAs($usgAdmin)
        ->delete(route('usg.admin.resolutions.destroy', $resolution->id));

    $response->assertRedirect(route('usg.admin.resolutions.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseMissing('resolutions', [
        'id' => $resolution->id,
    ]);
});

test('non-admin cannot delete resolutions', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $student = User::factory()->create();
    $student->assignRole('student');

    $resolution = Resolution::factory()->create();

    $response = $this->actingAs($student)
        ->delete(route('usg.admin.resolutions.destroy', $resolution->id));

    $response->assertForbidden();
});

// Resolution Workflow Tests
test('draft resolution can be submitted for review', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $resolution = Resolution::factory()->draft()->create([
        'submitted_by' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.resolutions.submit', $resolution->id));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('resolutions', [
        'id' => $resolution->id,
        'status' => 'review',
    ]);
});

test('resolution can be approved', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $resolution = Resolution::factory()->review()->create([
        'submitted_by' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.resolutions.approve', $resolution->id));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $resolution->refresh();
    expect($resolution->status)->toBe('published');
    expect($resolution->approved_by)->toBe($usgAdmin->id);
    expect($resolution->approved_at)->not->toBeNull();
});

test('resolution can be rejected', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $resolution = Resolution::factory()->review()->create([
        'submitted_by' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.resolutions.reject', $resolution->id));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $resolution->refresh();
    expect($resolution->status)->toBe('rejected');
    expect($resolution->approved_by)->toBe($usgAdmin->id);
});

test('resolution can be archived', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $resolution = Resolution::factory()->published()->create([
        'submitted_by' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.resolutions.archive', $resolution->id));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('resolutions', [
        'id' => $resolution->id,
        'status' => 'archived',
    ]);
});

// Resolution Scopes Tests
test('published scope filters resolutions correctly', function () {
    Resolution::factory()->published()->count(3)->create();
    Resolution::factory()->draft()->count(2)->create();
    Resolution::factory()->review()->create();

    $publishedResolutions = Resolution::published()->get();

    expect($publishedResolutions)->toHaveCount(3);
    $publishedResolutions->each(function ($resolution) {
        expect($resolution->status)->toBe('published');
    });
});

test('draft scope filters resolutions correctly', function () {
    Resolution::factory()->published()->count(2)->create();
    Resolution::factory()->draft()->count(3)->create();

    $draftResolutions = Resolution::draft()->get();

    expect($draftResolutions)->toHaveCount(3);
    $draftResolutions->each(function ($resolution) {
        expect($resolution->status)->toBe('draft');
    });
});

test('pending scope filters resolutions correctly', function () {
    Resolution::factory()->published()->create();
    Resolution::factory()->review()->count(2)->create();
    Resolution::factory()->draft()->create();

    $pendingResolutions = Resolution::pending()->get();

    expect($pendingResolutions)->toHaveCount(2);
    $pendingResolutions->each(function ($resolution) {
        expect($resolution->status)->toBe('review');
    });
});

test('rejected scope filters resolutions correctly', function () {
    Resolution::factory()->published()->create();
    Resolution::factory()->rejected()->count(2)->create();

    $rejectedResolutions = Resolution::rejected()->get();

    expect($rejectedResolutions)->toHaveCount(2);
    $rejectedResolutions->each(function ($resolution) {
        expect($resolution->status)->toBe('rejected');
    });
});

// Public Resolution Viewing Tests
test('public can view published resolutions', function () {
    Resolution::factory()->published()->count(3)->create();
    Resolution::factory()->draft()->count(2)->create();

    $response = $this->get(route('usg.resolutions.index'));

    $response->assertSuccessful();
});
