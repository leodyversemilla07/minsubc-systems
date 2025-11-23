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

    Resolution::factory()->count(5)->create();

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
    ]);
    Resolution::factory()->create([
        'title' => 'Academic Policy Resolution',
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
    ]);
    Resolution::factory()->create([
        'category' => 'Finance',
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

    Storage::fake('public');

    $resolutionData = [
        'title' => 'New USG Resolution',
        'resolution_number' => 'RES-2025-001',
        'description' => 'This is a test resolution',
        'category' => 'Academic',
        'date_passed' => now()->format('Y-m-d'),
        'file' => UploadedFile::fake()->create('resolution.pdf', 1000),
    ];

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.resolutions.store'), $resolutionData);

    $response->assertRedirect(route('usg.admin.resolutions.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('resolutions', [
        'title' => 'New USG Resolution',
    ]);
});

test('resolution creation validates required fields', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.resolutions.store'), []);

    $response->assertSessionHasErrors(['title', 'description', 'date_passed', 'file']);
});

test('resolution can be created with file attachment', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    Storage::fake('public');

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $resolutionData = [
        'title' => 'Resolution with File',
        'description' => 'Test description',
        'date_passed' => now()->format('Y-m-d'),
        'file' => UploadedFile::fake()->create('resolution.pdf', 1000),
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

    $resolution = Resolution::factory()->create();

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
        'title' => 'Original Title',
    ]);

    $updateData = [
        'title' => 'Updated Resolution Title',
        'description' => 'Updated description',
        'category' => 'Finance',
        'date_passed' => now()->format('Y-m-d'),
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

    $resolution = Resolution::factory()->create();

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

// Resolution Workflow Tests - REMOVED: Resolutions are uploaded as already approved
// No draft/review workflow needed since resolutions are pre-approved

test('resolution can be archived', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $resolution = Resolution::factory()->published()->create();

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.resolutions.archive', $resolution->id));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('resolutions', [
        'id' => $resolution->id,
        'status' => 'archived',
    ]);
});

// Resolution Scopes Tests - UPDATED: Only published/archived workflow used
test('published scope filters resolutions correctly', function () {
    Resolution::factory()->published()->count(3)->create();
    Resolution::factory()->archived()->count(2)->create();

    $publishedResolutions = Resolution::published()->get();

    expect($publishedResolutions)->toHaveCount(3);
    $publishedResolutions->each(function ($resolution) {
        expect($resolution->status)->toBe('published');
    });
});

test('archived scope filters resolutions correctly', function () {
    Resolution::factory()->published()->count(2)->create();
    Resolution::factory()->archived()->count(3)->create();

    $archivedResolutions = Resolution::archived()->get();

    expect($archivedResolutions)->toHaveCount(3);
    $archivedResolutions->each(function ($resolution) {
        expect($resolution->status)->toBe('archived');
    });
});

// REMOVED: draft, pending, rejected scopes - not used in publish/archive workflow

// Public Resolution Viewing Tests
test('public can view published resolutions', function () {
    Resolution::factory()->published()->count(3)->create();
    Resolution::factory()->draft()->count(2)->create();

    $response = $this->get(route('usg.resolutions.index'));

    $response->assertSuccessful();
});
