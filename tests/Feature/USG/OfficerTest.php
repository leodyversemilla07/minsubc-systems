<?php

use App\Models\User;
use App\Modules\USG\Models\Officer;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

// ==================== Index & Filtering Tests ====================

it('usg-admin can view officers index', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    Officer::factory()->count(5)->create();

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.officers.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/officers/index')
        ->has('officers.data', 5));
});

it('non-usg-admin cannot access officers index', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $student = User::factory()->create();
    $student->assignRole('student');

    $response = $this->actingAs($student)
        ->get(route('usg.admin.officers.index'));

    $response->assertForbidden();
});

it('officers are ordered correctly', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    // Create officers with specific orders
    Officer::factory()->create(['name' => 'Third Officer', 'order' => 3]);
    Officer::factory()->create(['name' => 'First Officer', 'order' => 1]);
    Officer::factory()->create(['name' => 'Second Officer', 'order' => 2]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.officers.index'));

    $response->assertOk();
    // Officers should be ordered by the 'order' field
    $response->assertInertia(fn ($page) => $page
        ->has('officers.data', 3)
        ->where('officers.data.0.name', 'First Officer')
        ->where('officers.data.1.name', 'Second Officer')
        ->where('officers.data.2.name', 'Third Officer'));
});

// ==================== Creation Tests ====================

it('usg-admin can view officer create form', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.officers.create'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/officers/create')
        ->has('departments')
        ->has('positions'));
});

it('officer can be created with valid data', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $officerData = [
        'name' => 'John Doe',
        'position' => 'President',
        'department' => 'Executive Board',
        'email' => 'john@example.com',
        'phone' => '09123456789',
        'bio' => 'A dedicated leader.',
        'term_start' => now()->format('Y-m-d'),
        'term_end' => now()->addYear()->format('Y-m-d'),
        'order' => 1,
        'is_active' => '1',
    ];

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.officers.store'), $officerData);

    $response->assertRedirect(route('usg.admin.officers.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('usg_officers', [
        'name' => 'John Doe',
        'position' => 'President',
        'email' => 'john@example.com',
    ]);
});

it('officer creation validates required fields', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.officers.store'), []);

    $response->assertSessionHasErrors(['name', 'position']);
});

it('officer can be created with photo', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    Storage::fake('public');

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $photo = UploadedFile::fake()->image('officer.jpg');

    $officerData = [
        'name' => 'Jane Smith',
        'position' => 'Vice President',
        'department' => 'Executive Board',
        'email' => 'jane@example.com',
        'photo' => $photo,
        'term_start' => now()->format('Y-m-d'),
        'term_end' => now()->addYear()->format('Y-m-d'),
        'is_active' => '1',
    ];

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.officers.store'), $officerData);

    $response->assertRedirect(route('usg.admin.officers.index'));

    $officer = Officer::where('name', 'Jane Smith')->first();
    expect($officer)->not->toBeNull();
    expect($officer->photo)->not->toBeNull();
});

// ==================== Editing & Updating Tests ====================

it('usg-admin can view officer edit form', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $officer = Officer::factory()->create();

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.officers.edit', $officer->id));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/officers/edit')
        ->has('officer')
        ->has('departments')
        ->has('positions'));
});

it('officer can be updated with valid data', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $officer = Officer::factory()->create(['name' => 'Old Name']);

    $updateData = [
        'name' => 'Updated Name',
        'position' => 'Treasurer',
        'department' => 'Finance Committee',
        'is_active' => '1',
    ];

    $response = $this->actingAs($usgAdmin)
        ->put(route('usg.admin.officers.update', $officer->id), $updateData);

    $response->assertRedirect(route('usg.admin.officers.index'));
    $response->assertSessionHas('success');

    $officer->refresh();
    expect($officer->name)->toBe('Updated Name');
    expect($officer->position)->toBe('Treasurer');
});

// ==================== Deletion Tests ====================

it('usg-admin can delete officer', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $officer = Officer::factory()->create();

    $response = $this->actingAs($usgAdmin)
        ->delete(route('usg.admin.officers.destroy', $officer->id));

    $response->assertRedirect(route('usg.admin.officers.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseMissing('usg_officers', ['id' => $officer->id]);
});

it('non-admin cannot delete officers', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $student = User::factory()->create();
    $student->assignRole('student');

    $officer = Officer::factory()->create();

    $response = $this->actingAs($student)
        ->delete(route('usg.admin.officers.destroy', $officer->id));

    $response->assertForbidden();
});

// ==================== Officer Management Tests ====================

it('officers can be reordered', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $officer1 = Officer::factory()->create(['order' => 1]);
    $officer2 = Officer::factory()->create(['order' => 2]);
    $officer3 = Officer::factory()->create(['order' => 3]);

    $newOrder = [
        ['id' => $officer3->id, 'order' => 1],
        ['id' => $officer1->id, 'order' => 2],
        ['id' => $officer2->id, 'order' => 3],
    ];

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.officers.reorder'), ['officers' => $newOrder]);

    $response->assertSessionHas('success');

    $officer1->refresh();
    $officer2->refresh();
    $officer3->refresh();

    expect($officer3->order)->toBe(1);
    expect($officer1->order)->toBe(2);
    expect($officer2->order)->toBe(3);
});

it('officer active status can be toggled', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $officer = Officer::factory()->active()->create();

    expect($officer->is_active)->toBeTrue();

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.officers.toggle-active', $officer));

    $response->assertSessionHas('success');

    $officer->refresh();
    expect($officer->is_active)->toBeFalse();

    // Toggle back
    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.officers.toggle-active', $officer));

    $officer->refresh();
    expect($officer->is_active)->toBeTrue();
});

// ==================== Scopes Tests ====================

it('active scope filters officers correctly', function () {
    Officer::factory()->active()->count(3)->create();
    Officer::factory()->inactive()->count(2)->create();

    $activeOfficers = Officer::active()->get();

    expect($activeOfficers)->toHaveCount(3);
    foreach ($activeOfficers as $officer) {
        expect($officer->is_active)->toBeTrue();
    }
});

it('inactive scope filters officers correctly', function () {
    Officer::factory()->active()->count(3)->create();
    Officer::factory()->inactive()->count(2)->create();

    $inactiveOfficers = Officer::inactive()->get();

    expect($inactiveOfficers)->toHaveCount(2);
    foreach ($inactiveOfficers as $officer) {
        expect($officer->is_active)->toBeFalse();
    }
});

it('currentTerm scope filters officers correctly', function () {
    // Create officers in current term
    Officer::factory()->currentTerm()->count(2)->create();

    // Create officers in past term
    Officer::factory()->pastTerm()->count(3)->create();

    $currentOfficers = Officer::currentTerm()->get();

    expect($currentOfficers)->toHaveCount(2);
    foreach ($currentOfficers as $officer) {
        expect($officer->term_start)->toBeLessThanOrEqual(now());
        expect($officer->term_end)->toBeGreaterThanOrEqual(now());
    }
});
