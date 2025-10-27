<?php

use App\Models\User;
use App\Modules\USG\Models\Event;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// Event Listing & Index Tests
test('usg-admin can view events index', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    Event::factory()->count(5)->create(['created_by' => $usgAdmin->id]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.events.index'));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/events/index')
        ->has('events')
        ->has('categories')
    );
});

test('non-usg-admin cannot access events admin index', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $student = User::factory()->create();
    $student->assignRole('student');

    $response = $this->actingAs($student)
        ->get(route('usg.admin.events.index'));

    $response->assertForbidden();
});

test('events can be filtered by search', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    Event::factory()->create([
        'title' => 'Basketball Tournament',
        'created_by' => $usgAdmin->id,
    ]);
    Event::factory()->create([
        'title' => 'Cultural Festival',
        'created_by' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.events.index', ['search' => 'Basketball']));

    $response->assertSuccessful();
});

test('events can be filtered by category', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    Event::factory()->create([
        'category' => 'Sports',
        'created_by' => $usgAdmin->id,
    ]);
    Event::factory()->create([
        'category' => 'Academic',
        'created_by' => $usgAdmin->id,
    ]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.events.index', ['category' => 'Sports']));

    $response->assertSuccessful();
});

test('events can be filtered by status', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    Event::factory()->create([
        'status' => 'published',
        'created_by' => $usgAdmin->id,
    ]);
    Event::factory()->cancelled()->create(['created_by' => $usgAdmin->id]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.events.index', ['status' => 'published']));

    $response->assertSuccessful();
});

// Event Creation Tests
test('usg-admin can view event create form', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.events.create'));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/events/create')
        ->has('categories')
    );
});

test('event can be created with valid data', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $eventData = [
        'title' => 'New Campus Event',
        'description' => 'This is a test event',
        'location' => 'Main Auditorium',
        'start_date' => now()->addDays(7)->format('Y-m-d H:i:s'),
        'end_date' => now()->addDays(7)->addHours(3)->format('Y-m-d H:i:s'),
        'all_day' => false,
        'category' => 'Academic',
        'organizer' => 'USG',
    ];

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.events.store'), $eventData);

    $response->assertRedirect(route('usg.admin.events.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('usg_events', [
        'title' => 'New Campus Event',
        'created_by' => $usgAdmin->id,
    ]);
});

test('event creation validates required fields', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.events.store'), []);

    $response->assertSessionHasErrors(['title', 'start_date']);
});

test('event creation validates end date is after start date', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $eventData = [
        'title' => 'Invalid Event',
        'start_date' => now()->addDays(7)->format('Y-m-d H:i:s'),
        'end_date' => now()->addDays(5)->format('Y-m-d H:i:s'), // Before start date
    ];

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.events.store'), $eventData);

    $response->assertSessionHasErrors(['end_date']);
});

test('event can be created as all-day event', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $eventData = [
        'title' => 'All Day Event',
        'description' => 'This is an all-day event',
        'start_date' => now()->addDays(7)->startOfDay()->format('Y-m-d H:i:s'),
        'end_date' => now()->addDays(7)->endOfDay()->format('Y-m-d H:i:s'),
        'all_day' => true,
    ];

    $response = $this->actingAs($usgAdmin)
        ->post(route('usg.admin.events.store'), $eventData);

    $response->assertRedirect(route('usg.admin.events.index'));

    $event = Event::where('title', 'All Day Event')->first();
    expect($event->all_day)->toBeTrue();
});

// Event Viewing Tests
test('usg-admin can view event edit form', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $event = Event::factory()->create(['created_by' => $usgAdmin->id]);

    $response = $this->actingAs($usgAdmin)
        ->get(route('usg.admin.events.edit', $event->id));

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('usg/admin/events/edit')
        ->has('event')
        ->has('categories')
    );
});

// Event Update Tests
test('event can be updated with valid data', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $event = Event::factory()->create([
        'created_by' => $usgAdmin->id,
        'title' => 'Original Title',
    ]);

    $updateData = [
        'title' => 'Updated Event Title',
        'description' => 'Updated description',
        'location' => 'New Location',
        'start_date' => now()->addDays(10)->format('Y-m-d H:i:s'),
        'end_date' => now()->addDays(10)->addHours(4)->format('Y-m-d H:i:s'),
    ];

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.events.update', $event->id), $updateData);

    $response->assertRedirect(route('usg.admin.events.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('usg_events', [
        'id' => $event->id,
        'title' => 'Updated Event Title',
    ]);
});

// Event Deletion Tests
test('usg-admin can delete event', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $event = Event::factory()->create(['created_by' => $usgAdmin->id]);

    $response = $this->actingAs($usgAdmin)
        ->delete(route('usg.admin.events.destroy', $event->id));

    $response->assertRedirect(route('usg.admin.events.index'));
    $response->assertSessionHas('success');

    $this->assertDatabaseMissing('usg_events', [
        'id' => $event->id,
    ]);
});

test('non-admin cannot delete events', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $student = User::factory()->create();
    $student->assignRole('student');

    $event = Event::factory()->create();

    $response = $this->actingAs($student)
        ->delete(route('usg.admin.events.destroy', $event->id));

    $response->assertForbidden();
});

// Event Status Management Tests
test('event can be published', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $event = Event::factory()->create([
        'created_by' => $usgAdmin->id,
        'status' => 'draft',
    ]);

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.events.publish', $event->id));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('usg_events', [
        'id' => $event->id,
        'status' => 'published',
    ]);
});

test('event can be cancelled', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $event = Event::factory()->create([
        'created_by' => $usgAdmin->id,
        'status' => 'published',
    ]);

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.events.cancel', $event->id));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('usg_events', [
        'id' => $event->id,
        'status' => 'cancelled',
    ]);
});

test('event can be archived', function () {
    $this->seed(RolesAndPermissionsSeeder::class);

    $usgAdmin = User::factory()->create();
    $usgAdmin->assignRole('usg-admin');

    $event = Event::factory()->past()->create(['created_by' => $usgAdmin->id]);

    $response = $this->actingAs($usgAdmin)
        ->patch(route('usg.admin.events.archive', $event->id));

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('usg_events', [
        'id' => $event->id,
        'status' => 'archived',
    ]);
});

// Event Scopes Tests
test('upcoming scope filters events correctly', function () {
    Event::factory()->upcoming()->count(3)->create();
    Event::factory()->past()->count(2)->create();

    $upcomingEvents = Event::upcoming()->get();

    expect($upcomingEvents)->toHaveCount(3);
    expect($upcomingEvents->first()->start_date->isFuture())->toBeTrue();
});

test('past scope filters events correctly', function () {
    Event::factory()->upcoming()->count(3)->create();
    Event::factory()->past()->count(2)->create();

    $pastEvents = Event::past()->get();

    expect($pastEvents)->toHaveCount(2);
    expect($pastEvents->first()->end_date->isPast())->toBeTrue();
});

test('published scope filters events correctly', function () {
    Event::factory()->create(['status' => 'published']);
    Event::factory()->create(['status' => 'draft']);
    Event::factory()->cancelled()->create();

    $publishedEvents = Event::published()->get();

    expect($publishedEvents)->toHaveCount(1);
    expect($publishedEvents->first()->status)->toBe('published');
});

test('cancelled scope filters events correctly', function () {
    Event::factory()->create(['status' => 'published']);
    Event::factory()->cancelled()->count(2)->create();

    $cancelledEvents = Event::cancelled()->get();

    expect($cancelledEvents)->toHaveCount(2);
    $cancelledEvents->each(function ($event) {
        expect($event->status)->toBe('cancelled');
    });
});

// Public Event Viewing Tests
test('public can view published events', function () {
    Event::factory()->create(['status' => 'published']);
    Event::factory()->create(['status' => 'draft']);

    $response = $this->get(route('usg.events.index'));

    $response->assertSuccessful();
});

test('public can view event calendar', function () {
    Event::factory()->count(5)->create(['status' => 'published']);

    $response = $this->get(route('usg.events.calendar'));

    $response->assertSuccessful();
});
