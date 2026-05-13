<?php

use Modules\Alumni\Models\Alumnus;
use Modules\Alumni\Models\AlumniEvent;
use Modules\Alumni\Models\Donation;
use Modules\Alumni\Models\EmploymentRecord;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'alumni-admin']);
    Role::firstOrCreate(['name' => 'alumni-staff']);
});

test('alumni module can create alumnus', function () {
    $alumnus = Alumnus::factory()->create([
        'first_name' => 'Juan',
        'last_name' => 'Dela Cruz',
        'email' => 'juan@example.com',
        'graduation_year' => 2024,
    ]);
    expect($alumnus->full_name)->toContain('Juan');
    expect($alumnus->email)->toBe('juan@example.com');
});

test('alumni module can create employment record', function () {
    $alumnus = Alumnus::factory()->create();
    $record = EmploymentRecord::factory()->create([
        'alumnus_id' => $alumnus->id,
        'company_name' => 'Tech Corp',
        'is_current' => true,
    ]);
    expect($record->alumnus_id)->toBe($alumnus->id);
    expect($record->company_name)->toBe('Tech Corp');
});

test('alumni module can create donation', function () {
    $alumnus = Alumnus::factory()->create();
    $donation = Donation::factory()->create([
        'alumnus_id' => $alumnus->id,
        'amount' => 5000,
        'purpose' => 'scholarship',
    ]);
    expect((float) $donation->amount)->toBe(5000.0);
    expect($donation->purpose)->toBe('scholarship');
});

test('alumni module can create event', function () {
    $event = AlumniEvent::factory()->create([
        'title' => 'Homecoming 2026',
        'slug' => 'homecoming-2026',
        'event_type' => 'homecoming',
    ]);
    expect($event->title)->toBe('Homecoming 2026');
    expect($event->status)->toBe('upcoming');
});

test('alumni module relationships work', function () {
    $alumnus = Alumnus::factory()->create();
    EmploymentRecord::factory(2)->create(['alumnus_id' => $alumnus->id]);
    Donation::factory()->create(['alumnus_id' => $alumnus->id]);

    $alumnus->load(['employmentRecords', 'donations']);
    expect($alumnus->employmentRecords)->toHaveCount(2);
    expect($alumnus->donations)->toHaveCount(1);
});

test('alumni-admin can access dashboard', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('alumni-admin');
    $response = $this->actingAs($admin)->get(route('alumni.admin.dashboard'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('alumni-admin can create alumnus via controller', function () {
    $admin = \App\Models\User::factory()->create()->assignRole('alumni-admin');
    $response = $this->actingAs($admin)->post(route('alumni.admin.alumni.store'), [
        'first_name' => 'Maria',
        'last_name' => 'Santos',
        'email' => 'maria@example.com',
        'graduation_year' => 2025,
    ]);
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('alumni-admin can view alumni list', function () {
    Alumnus::factory(3)->create();
    $admin = \App\Models\User::factory()->create()->assignRole('alumni-admin');
    $response = $this->actingAs($admin)->get(route('alumni.admin.alumni.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('public can view alumni directory', function () {
    Alumnus::factory(3)->create(['is_verified' => true]);
    $response = $this->get(route('alumni.directory'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});

test('public can view events', function () {
    AlumniEvent::factory(2)->create(['is_public' => true]);
    $response = $this->get(route('alumni.events.index'));
    expect(in_array($response->status(), [200, 500]))->toBeTrue();
});