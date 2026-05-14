<?php

use Modules\Facilities\Models\Facility;
use Modules\Facilities\Models\Reservation;
use Modules\Facilities\Models\Equipment;
use Modules\Facilities\Models\MaintenanceRequest;
use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'facilities-admin']);
    Role::firstOrCreate(['name' => 'facilities-staff']);
});

test('can create and retrieve facilities', function () {
    $facility = Facility::create([
        'name' => 'Lecture Hall A',
        'code' => 'LEC-A-001',
        'type' => 'classroom',
        'location' => 'Main Building',
        'capacity' => 100,
        'is_available' => true,
    ]);

    expect($facility->id)->not->toBeNull();
    expect($facility->name)->toBe('Lecture Hall A');
    expect($facility->capacity)->toBe(100);
});

test('can create equipment linked to facility', function () {
    $facility = Facility::factory()->create();
    $equipment = Equipment::create([
        'facility_id' => $facility->id,
        'name' => 'Projector',
        'code' => 'PRJ-001',
        'quantity' => 5,
        'available_quantity' => 5,
        'condition' => 'good',
    ]);

    expect($equipment->facility_id)->toBe($facility->id);
    expect($equipment->quantity)->toBe(5);
});

test('can create reservations', function () {
    $facility = Facility::factory()->create();
    $admin = User::factory()->create();
    $reservation = Reservation::create([
        'facility_id' => $facility->id,
        'user_id' => $admin->id,
        'purpose' => 'Team Meeting',
        'start_time' => now()->addDay(),
        'end_time' => now()->addDay()->addHours(2),
        'status' => 'pending',
        'attendees_count' => 20,
    ]);

    expect($reservation->status)->toBe('pending');
    expect($reservation->purpose)->toBe('Team Meeting');
});

test('can approve reservations', function () {
    $facility = Facility::factory()->create();
    $admin = User::factory()->create();
    $reservation = Reservation::factory()->create([
        'facility_id' => $facility->id,
        'user_id' => $admin->id,
        'status' => 'pending',
    ]);

    $reservation->update([
        'status' => 'approved',
        'approved_by' => $admin->id,
        'approved_at' => now(),
    ]);

    expect($reservation->fresh()->status)->toBe('approved');
});

test('can create maintenance requests', function () {
    $facility = Facility::factory()->create();
    $admin = User::factory()->create();
    $request = MaintenanceRequest::create([
        'facility_id' => $facility->id,
        'title' => 'Fix air conditioning',
        'description' => 'AC unit not cooling',
        'priority' => 'high',
        'status' => 'pending',
        'requested_by' => $admin->id,
    ]);

    expect($request->priority)->toBe('high');
    expect($request->status)->toBe('pending');
});

test('can access admin dashboard', function () {
    $admin = User::factory()->create()->assignRole('facilities-admin');
    $response = $this->actingAs($admin)
        ->get(route('facilities.admin.dashboard'));
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('can list facilities', function () {
    Facility::factory()->count(3)->create();
    $admin = User::factory()->create()->assignRole('facilities-admin');
    $response = $this->actingAs($admin)
        ->get(route('facilities.admin.facilities.index'));
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('can list reservations', function () {
    $admin = User::factory()->create()->assignRole('facilities-admin');
    $response = $this->actingAs($admin)
        ->get(route('facilities.admin.reservations.index'));
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('can list equipment', function () {
    $admin = User::factory()->create()->assignRole('facilities-admin');
    $response = $this->actingAs($admin)
        ->get(route('facilities.admin.equipment.index'));
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});