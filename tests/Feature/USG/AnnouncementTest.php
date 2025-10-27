<?php

use App\Models\User;
use App\Modules\USG\Models\Announcement;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

// Announcement Index Tests
test('usg-admin can view announcements index', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.announcements.index'));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/announcements/index')
        ->has('announcements')
        ->has('categories')
    );
});

test('non-usg-admin cannot access announcements index', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $user = User::factory()->create();
    $user->assignRole('student');

    $response = $this->actingAs($user)
        ->get(route('usg.admin.announcements.index'));

    $response->assertForbidden();
});

test('announcements can be filtered by search', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    Announcement::factory()->create([
        'title' => 'Important Update',
        'author_id' => $usgAdmin->id,
    ]);

    Announcement::factory()->create([
        'title' => 'General Notice',
        'author_id' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.announcements.index', ['search' => 'Important']));

    $response->assertSuccessful();
});

test('announcements can be filtered by status', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    Announcement::factory()->create([
        'status' => 'published',
        'author_id' => $usgAdmin->id,
    ]);

    Announcement::factory()->create([
        'status' => 'draft',
        'author_id' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.announcements.index', ['status' => 'published']));

    $response->assertSuccessful();
});

// Announcement Creation Tests
test('usg-admin can view announcement create form', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.announcements.create'));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/announcements/create')
        ->has('categories')
    );
});

test('announcement can be created with valid data', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcementData = [
        'title' => 'New Test Announcement',
        'excerpt' => 'This is a test excerpt',
        'content' => 'This is the full content of the announcement.',
        'category' => 'general',
        'is_published' => '0',  // String '0' for false
        'is_pinned' => '0',     // String '0' for false
        'publish_at' => now()->format('Y-m-d H:i:s'),
    ];

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.announcements.store'), $announcementData);

    $response->assertRedirect(route('usg.admin.announcements.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('usg_announcements', [
        'title' => 'New Test Announcement',
        'author_id' => $usgAdmin->id,
        'status' => 'draft',
    ]);
});

test('announcement creation validates required fields', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.announcements.store'), []);

    $response->assertSessionHasErrors(['title', 'content']);
});

test('announcement can be created with featured image', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    Storage::fake('public');

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcementData = [
        'title' => 'Announcement with Image',
        'excerpt' => 'Test excerpt',
        'content' => 'Test content',
        'category' => 'general',
        'is_published' => '0',  // String '0' for false
        'is_pinned' => '0',     // String '0' for false
        'publish_at' => now()->format('Y-m-d H:i:s'),
        'featured_image' => UploadedFile::fake()->image('announcement.jpg'),
    ];

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.announcements.store'), $announcementData);

    $response->assertRedirect(route('usg.admin.announcements.index'));

    $announcement = Announcement::where('title', 'Announcement with Image')->first();
    expect($announcement->featured_image)->not->toBeNull();
});

// Announcement Viewing Tests
test('usg-admin can view single announcement', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcement = Announcement::factory()->create([
        'author_id' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.announcements.show', $announcement->id));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/announcements/show')
        ->has('announcement')
        ->where('announcement.id', $announcement->id)
        ->where('announcement.title', $announcement->title)
    );
});

test('public can view published announcements', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcement = Announcement::factory()->create([
        'status' => 'published',
        'publish_date' => now()->subDay(),
        'author_id' => $usgAdmin->id,
    ]);

    $response = $this->get(route('usg.announcements.show', $announcement->slug));

    $response->assertSuccessful();
});

test('viewing announcement increments views count', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcement = Announcement::factory()->create([
        'status' => 'published',
        'publish_date' => now()->subDay(),
        'author_id' => $usgAdmin->id,
        'views_count' => 0,
    ]);

    $this->get(route('usg.announcements.show', $announcement->slug));

    $announcement->refresh();
    expect($announcement->views_count)->toBe(1);
});

// Announcement Editing Tests
test('usg-admin can view announcement edit form', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcement = Announcement::factory()->create([
        'author_id' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.announcements.edit', $announcement->id));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/announcements/edit')
        ->has('announcement')
        ->has('categories')
    );
});

test('announcement can be updated with valid data', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcement = Announcement::factory()->create([
        'author_id' => $usgAdmin->id,
        'title' => 'Original Title',
    ]);

    $updateData = [
        'title' => 'Updated Title',
        'excerpt' => 'Updated excerpt',
        'content' => 'Updated content',
        'category' => 'academic',
        'is_published' => '0',  // String '0' for false
        'is_pinned' => '1',     // String '1' for true
        'publish_at' => now()->format('Y-m-d H:i:s'),
    ];

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.announcements.update', $announcement->id), $updateData);

    $response->assertRedirect(route('usg.admin.announcements.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('usg_announcements', [
        'id' => $announcement->id,
        'title' => 'Updated Title',
    ]);
});

test('announcement update validates data', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcement = Announcement::factory()->create([
        'author_id' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.announcements.update', $announcement->id), [
            'title' => '', // Invalid: empty title
        ]);

    $response->assertSessionHasErrors(['title']);
});

// Announcement Deletion Tests
test('usg-admin can delete announcement', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcement = Announcement::factory()->create([
        'author_id' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->delete(route('usg.admin.announcements.destroy', $announcement->id));

    $response->assertRedirect(route('usg.admin.announcements.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseMissing('usg_announcements', [
        'id' => $announcement->id,
    ]);
});

test('non-admin cannot delete announcements', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $user = User::factory()->create();
    $user->assignRole('student');

    $announcement = Announcement::factory()->create([
        'author_id' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($user)
        ->delete(route('usg.admin.announcements.destroy', $announcement->id));

    $response->assertForbidden();

    $this->assertDatabaseHas('usg_announcements', [
        'id' => $announcement->id,
    ]);
});

// Announcement Publishing Tests
test('draft announcement can be published', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcement = Announcement::factory()->create([
        'author_id' => $usgAdmin->id,
        'status' => 'draft',
    ]);

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.announcements.publish', $announcement->id));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('usg_announcements', [
        'id' => $announcement->id,
        'status' => 'published',
    ]);
});

test('published announcement can be unpublished', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcement = Announcement::factory()->create([
        'author_id' => $usgAdmin->id,
        'status' => 'published',
    ]);

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.announcements.unpublish', $announcement->id));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('usg_announcements', [
        'id' => $announcement->id,
        'status' => 'draft',
    ]);
});

// Announcement Scopes Tests
test('published scope filters announcements correctly', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    // Create published announcement
    Announcement::factory()->create([
        'status' => 'published',
        'publish_date' => now()->subDay(),
        'expiry_date' => now()->addDay(),
        'author_id' => $usgAdmin->id,
    ]);

    // Create draft announcement
    Announcement::factory()->create([
        'status' => 'draft',
        'author_id' => $usgAdmin->id,
    ]);

    // Create expired announcement
    Announcement::factory()->create([
        'status' => 'published',
        'publish_date' => now()->subDays(10),
        'expiry_date' => now()->subDay(),
        'author_id' => $usgAdmin->id,
    ]);

    $publishedAnnouncements = Announcement::published()->get();

    expect($publishedAnnouncements)->toHaveCount(1);
});

test('featured scope filters announcements correctly', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    Announcement::factory()->create([
        'priority' => 'high',
        'author_id' => $usgAdmin->id,
    ]);

    Announcement::factory()->create([
        'priority' => 'normal',
        'author_id' => $usgAdmin->id,
    ]);

    $featuredAnnouncements = Announcement::featured()->get();

    expect($featuredAnnouncements)->toHaveCount(1);
});

// Announcement Preview Test
test('admin can preview announcement before publishing', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $announcement = Announcement::factory()->create([
        'status' => 'draft',
        'author_id' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.announcements.preview', $announcement->slug));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/announcements/preview')
        ->has('announcement')
    );
});
