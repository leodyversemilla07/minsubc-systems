<?php

use App\Models\User;
use Modules\USG\Models\Announcement;
use Modules\USG\Models\Event;
use Modules\USG\Models\Officer;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'usg-admin']);
    Role::firstOrCreate(['name' => 'usg-officer']);
});

// ─── Announcements ─────────────────────────────────────────────

test('admin can create an announcement', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');

    $response = $this->actingAs($admin)->post(route('usg.admin.announcements.store'), [
        'title' => 'Test Announcement',
        'content' => 'This is a test announcement.',
        'category' => 'general',
        'publish_at' => now()->format('Y-m-d'),
    ]);

    $response->assertSessionHas('success');
    expect(Announcement::where('title', 'Test Announcement')->exists())->toBeTrue();
});

test('admin can view announcements list', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');
    Announcement::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('usg.admin.announcements.index'));

    $response->assertInertia(fn ($page) => $page->component('usg/admin/announcements/index'));
});

test('admin can update an announcement', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');
    $announcement = Announcement::factory()->create(['title' => 'Old Title']);

    $response = $this->actingAs($admin)->put(route('usg.admin.announcements.update', $announcement), [
        'title' => 'Updated Title',
        'content' => 'Updated content.',
        'category' => 'academic',
        'publish_at' => now()->format('Y-m-d'),
    ]);

    $response->assertSessionHas('success');
    expect($announcement->fresh()->title)->toBe('Updated Title');
});

test('admin can delete an announcement', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');
    $announcement = Announcement::factory()->create();

    $response = $this->actingAs($admin)->delete(route('usg.admin.announcements.destroy', $announcement));

    $response->assertSessionHas('success');
    expect(Announcement::find($announcement->id))->toBeNull();
});

test('announcement requires validation', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');

    $this->actingAs($admin)->post(route('usg.admin.announcements.store'), [
        'title' => '',
    ])->assertSessionHasErrors('title');
});

// ─── Events ────────────────────────────────────────────────────

test('admin can create an event', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');

    $response = $this->actingAs($admin)->post(route('usg.admin.events.store'), [
        'title' => 'USG General Assembly',
        'description' => 'Monthly meeting',
        'event_date' => now()->addDays(7)->format('Y-m-d'),
        'event_time' => '10:00',
        'location' => 'Audio Visual Room',
        'category' => 'meeting',
    ]);

    $response->assertSessionHas('success');
    expect(Event::where('title', 'USG General Assembly')->exists())->toBeTrue();
});

test('admin can view events list', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');
    Event::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('usg.admin.events.index'));

    $response->assertInertia(fn ($page) => $page->component('usg/admin/events/index'));
});

test('admin can delete an event', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');
    $event = Event::factory()->create();

    $response = $this->actingAs($admin)->delete(route('usg.admin.events.destroy', $event));

    $response->assertSessionHas('success');
    expect(Event::find($event->id))->toBeNull();
});

// ─── Officers ──────────────────────────────────────────────────

test('admin can create an officer', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');

    $response = $this->actingAs($admin)->post(route('usg.admin.officers.store'), [
        'name' => 'Juan Dela Cruz',
        'position' => 'President',
        'department' => 'Executive',
        'email' => 'juan@example.com',
    ]);

    $response->assertSessionHas('success');
    expect(Officer::where('position', 'President')->exists())->toBeTrue();
});

test('admin can view officers list', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');
    Officer::factory()->count(3)->create();

    $response = $this->actingAs($admin)->get(route('usg.admin.officers.index'));

    $response->assertInertia(fn ($page) => $page->component('usg/admin/officers/index'));
});

// ─── Resolutions ───────────────────────────────────────────────

test('admin can view resolutions list', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');

    $response = $this->actingAs($admin)->get(route('usg.admin.resolutions.index'));

    $response->assertOk();
});

// ─── Transparency Reports ──────────────────────────────────────

test('admin can view transparency reports list', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');

    $response = $this->actingAs($admin)->get(route('usg.admin.transparency.index'));

    $response->assertOk();
});

// ─── Documents ─────────────────────────────────────────────────

test('admin can view documents list', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');

    $response = $this->actingAs($admin)->get(route('usg.admin.documents.index'));

    $response->assertOk();
});

// ─── VMGO ──────────────────────────────────────────────────────

test('admin can edit VMGO entry', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');

    $response = $this->actingAs($admin)->get(route('usg.admin.vmgo.edit'));

    $response->assertInertia(fn ($page) => $page->component('usg/admin/vmgo/edit'));
});

// ─── Authorization ─────────────────────────────────────────────

test('unauthorized user cannot access USG admin', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->get(route('usg.admin.announcements.index'))->assertForbidden();
});

test('guest cannot access USG pages', function () {
    $this->get(route('usg.admin.announcements.index'))->assertRedirect(route('login'));
});

test('usg-officer has read-only access to announcements', function () {
    $officer = User::factory()->create()->assignRole('usg-officer');
    Announcement::factory()->count(2)->create();

    $this->actingAs($officer)->get(route('usg.admin.announcements.index'))
        ->assertInertia(fn ($p) => $p->component('usg/admin/announcements/index'));
});

// ─── USG Dashboard ─────────────────────────────────────────────

test('admin can view dashboard', function () {
    $admin = User::factory()->create()->assignRole('usg-admin');

    $response = $this->actingAs($admin)->get(route('usg.admin.dashboard'));

    $response->assertInertia(fn ($page) => $page->component('usg/admin/dashboard'));
});

// ─── Public Pages ──────────────────────────────────────────────

test('public can view USG main page', function () {
    $response = $this->get(route('usg.index'));
    $response->assertOk();
});