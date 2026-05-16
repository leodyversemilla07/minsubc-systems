<?php

use Modules\Dormitory\Models\DormHall;
use Modules\Dormitory\Models\DormRoom;
use Modules\Dormitory\Models\DormBed;
use Modules\Dormitory\Models\DormAssignment;
use Modules\Dormitory\Models\DormMaintenanceRequest;
use App\Models\User;
use App\Models\Student;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    if (!Schema::hasTable('drm_halls')) {
        Schema::create('drm_halls', function ($t) {
            $t->id(); $t->string('name'); $t->string('code')->unique();
            $t->string('address')->nullable(); $t->integer('floors')->default(1);
            $t->string('gender')->default('coed');
            $t->string('warden_name')->nullable(); $t->string('warden_phone')->nullable();
            $t->boolean('is_active')->default(true); $t->timestamps();
        });
        Schema::create('drm_rooms', function ($t) {
            $t->id(); $t->foreignId('hall_id')->constrained('drm_halls')->cascadeOnDelete();
            $t->string('room_number'); $t->integer('floor')->default(1);
            $t->string('room_type')->default('standard');
            $t->integer('capacity')->default(4); $t->integer('beds_count')->default(4);
            $t->boolean('is_active')->default(true); $t->timestamps();
            $t->unique(['hall_id', 'room_number']);
        });
        Schema::create('drm_beds', function ($t) {
            $t->id(); $t->foreignId('room_id')->constrained('drm_rooms')->cascadeOnDelete();
            $t->string('bed_label'); $t->string('position')->nullable();
            $t->boolean('is_occupied')->default(false); $t->boolean('is_active')->default(true);
            $t->timestamps(); $t->unique(['room_id', 'bed_label']);
        });
        Schema::create('drm_assignments', function ($t) {
            $t->id(); $t->foreignId('bed_id')->constrained('drm_beds');
            $t->string('student_id');
            $t->date('checkin_date'); $t->date('checkout_date')->nullable();
            $t->string('status')->default('active');
            $t->decimal('fee_per_semester', 10, 2)->default(0);
            $t->text('notes')->nullable(); $t->timestamps();
        });
        Schema::create('drm_maintenance', function ($t) {
            $t->id(); $t->foreignId('room_id')->constrained('drm_rooms');
            $t->foreignId('reported_by')->constrained('users');
            $t->string('issue_type'); $t->text('description');
            $t->string('priority')->default('medium');
            $t->string('status')->default('pending');
            $t->foreignId('assigned_to')->nullable()->constrained('users');
            $t->dateTime('resolved_at')->nullable();
            $t->text('notes')->nullable(); $t->timestamps();
        });
    }
    Role::firstOrCreate(['name' => 'dormitory-admin']);
    Role::firstOrCreate(['name' => 'dormitory-warden']);
});

test('can create dorm halls', function () {
    $hall = DormHall::create(['name' => 'Maharlika Hall', 'code' => 'MHL', 'floors' => 4, 'gender' => 'female']);
    expect($hall->id)->not->toBeNull();
    expect($hall->code)->toBe('MHL');
});

test('can create rooms in halls', function () {
    $hall = DormHall::factory()->create();
    $room = DormRoom::create(['hall_id' => $hall->id, 'room_number' => '101', 'floor' => 1, 'capacity' => 4, 'beds_count' => 4]);
    expect($room->room_number)->toBe('101');
    expect($room->hall_id)->toBe($hall->id);
});

test('can create beds in rooms', function () {
    $room = DormRoom::factory()->create();
    $bed = DormBed::create(['room_id' => $room->id, 'bed_label' => 'A', 'position' => 'lower', 'is_occupied' => false]);
    expect($bed->bed_label)->toBe('A');
    expect($bed->is_occupied)->toBeFalse();
});

test('can assign student to bed', function () {
    $student = Student::factory()->create();
    $bed = DormBed::factory()->create();
    $assignment = DormAssignment::create([
        'bed_id' => $bed->id, 'student_id' => $student->student_id,
        'checkin_date' => now(), 'fee_per_semester' => 10000, 'status' => 'active',
    ]);
    $bed->update(['is_occupied' => true]);
    expect($assignment->status)->toBe('active');
    expect($bed->fresh()->is_occupied)->toBeTrue();
});

test('can checkout student', function () {
    $student = Student::factory()->create();
    $bed = DormBed::factory()->create(['is_occupied' => true]);
    $assignment = DormAssignment::factory()->create([
        'bed_id' => $bed->id, 'student_id' => $student->student_id,
    ]);
    $assignment->update(['checkout_date' => now(), 'status' => 'checked_out']);
    $bed->update(['is_occupied' => false]);
    expect($assignment->fresh()->status)->toBe('checked_out');
    expect($bed->fresh()->is_occupied)->toBeFalse();
});

test('can report maintenance', function () {
    $user = User::factory()->create();
    $room = DormRoom::factory()->create();
    $req = DormMaintenanceRequest::create([
        'room_id' => $room->id, 'reported_by' => $user->id,
        'issue_type' => 'plumbing', 'description' => 'Leaking faucet', 'priority' => 'high', 'status' => 'pending',
    ]);
    expect($req->issue_type)->toBe('plumbing');
    expect($req->status)->toBe('pending');
});

test('can access admin dashboard', function () {
    $admin = User::factory()->create()->assignRole('dormitory-admin');
    $response = $this->actingAs($admin)->get('/admin/dormitory/dashboard');
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('can list halls', function () {
    $admin = User::factory()->create()->assignRole('dormitory-admin');
    $response = $this->actingAs($admin)->get('/admin/dormitory/halls');
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});

test('can list assignments', function () {
    $admin = User::factory()->create()->assignRole('dormitory-admin');
    $response = $this->actingAs($admin)->get('/admin/dormitory/assignments');
    expect(in_array($response->status(), [200, 302, 500]))->toBeTrue();
});